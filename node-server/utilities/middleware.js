const { decrypt } = require('./crypto')
const { SECRET } = process.env

const valid = (req, res, next) => {
     if (req.headers.sffromapex) {
          const decryptedData = decrypt(req.headers.sffromapex)

          const decryptedJson = JSON.parse(decryptedData)

          const { code, timestamp } = decryptedJson
          
          if (code !== SECRET) {
               console.log('Invalid key returning 400')
               return res.status(401).send('Invalid key');
          }

          const reqTime = new Date(timestamp).getTime()
          const utc = (new Date(new Date().toUTCString())).getTime()

          if (Math.abs(utc - reqTime) > 30000) {
               console.log('Invalid time returning 400')
               return res.status(401).send('Invalid Time');
          }

          // console.log({timestamp})
          // console.log({utc: new Date(new Date().toUTCString())})
          // console.log({reqTime})
          // console.log({utc})
          // console.log(Math.abs(utc - reqTime))
          
          next();
     } else {
          console.log('Invalid Format returning 400')
          res.status(401).send('Invalid Format');
     }
}

module.exports = {
     valid
}