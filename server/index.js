const express = require('express')
const logger = require('morgan')
const path = require('path')
const cors = require('cors')
const fsPromise = require('fs').promises
const fsa = require('fs-extra')

const app = express()
const port = 5000
app.set('port', port)

app.use(logger('dev'))
app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))

/* App Routes */

// Upload Image
app.post('/upload', async (req, res, next) => {
    // Get sent data, if exists
    const { file, fileName, fileSize } = req.body
    if (!file) {
        return res.status(400).json({ message: 'Must have file to upload!' })
    }

    if (fileSize > 2000000) {
        return res.status(400).json({ message: 'Invalid File Size' })
    }

    // Extract rawData & extension
    const matches = file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    // Check image extension
    const imgType = matches[1]
    if (!/\/(jpe?g|png|gif)$/.test(imgType)) {
        return res.status(400).json({ message: 'Invalid image extension' })
    }

    // Create Buffer from file-data
    const buff = Buffer.from(matches[2], 'base64')

    // Set upload path
    const uploadDir = path.resolve(__dirname, '../client/public/uploads')
    const filepath = path.join(`${uploadDir}`, '\\', `${fileName}`)

    // Save file
    try {
        await fsa.outputFile(filepath, buff)
        console.log('File saved')
        return res.json({ fileName: fileName, filePath: `/uploads/${fileName}` })
    } catch (err) {
        console.error('Error: ', err)
        return res.status(500).json({ message: 'Error saving file. Try again!' })
    }
})

// Read all files in dir
app.get('/file-list', async (req, res, next) => {
    const storagePath = path.resolve(__dirname, '../client/public/uploads')
    const imgDir = '/uploads'
    try {
        let files = await fsPromise.readdir(storagePath)
        files = files.map(file => `${imgDir}/${file}`)
        return res.json({ files })
    } catch (err) {
        if (err.code === 'ENOENT') {
            return res.json({ files: [] })
        }
        return res.status(500).json({ message: 'Error reading directory' })
    }
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Service Unavailable' })
})

app.listen(port, () => console.log('Server started listen for requests. http://localhost:' + port))
