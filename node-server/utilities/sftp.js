const Client = require('ssh2-sftp-client');
const SFTP = {}

const { 
     FTP_USER,
     FTP_PASSWORD, 
     FTP_HOST,
     FTP_DIR,
} = process.env

async function connect_basic() {
	
	const client = new Client('client');

	await client.connect({ 
		host: FTP_HOST, 
		port: '22',
		username: FTP_USER, 
		password: FTP_PASSWORD,
	})

	return client
}

async function uploadFile(fileName, data) {

     try {
          SFTP.client = await connect_basic()

          const remotePath = `${FTP_DIR}/${fileName}`
          
          console.log('sending to')
		console.log(remotePath)

          const options = {
			flags: 'w',  // w - write and a - append
			encoding: null, // use null for binary files
			//mode: 0o666, // mode to use for created file (rwx)
			autoClose: true // automatically close the write stream when finished
		}

          const buff = Buffer.from(data, 'utf8')

          return SFTP.client.put(buff, remotePath, options) 
     } catch (error) {
          console.error(error)
          return error
     }
}

module.exports = {
     uploadFile
}
