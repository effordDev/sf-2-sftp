if (process.env.NODE_ENV !== 'production') {
     require('dotenv').config();
}

const { toCsv } = require('./utilities/json2csv')
const { valid } = require('./utilities/middleware')
const { uploadFile } = require('./utilities/sftp')
const { decrypt } = require('./utilities/crypto')

const { 
     buildWhiteList,
     opts 
} = require('./utilities/cors')


const express = require('express')
const cors = require('cors')
const app = express()

const port = process.env.PORT || 3000

const whitelist = buildWhiteList(process.env)

app.use(cors(opts(whitelist)))
app.use(express.json())

app.post('/init', valid, async (req, res) => {

     const { data } = req.body

     const decryptData = JSON.parse(decrypt(data))

     if (!data.length) {
          console.log('no data returning 400')
          return res.status(400).send('No data')
     }
     
     const csvData = toCsv(decryptData)

     const fileName = (`${new Date().toLocaleDateString()}.csv`).replace(/\//g, '-')

     try {
          await uploadFile(fileName, csvData)
     } catch (error) {
          return res.status(400).send(error)
     }
})

app.listen(port, () => {
     console.log(`Server started on port ${port} 📡📡`)
})