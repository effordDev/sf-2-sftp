const crypto = require('crypto');
const { ENC_KEY, IV } = process.env

const decrypt = ((encrypted) => {
     const decipher = crypto.createDecipheriv('aes-128-cbc', ENC_KEY, IV);
     const  decrypted = decipher.update(encrypted, 'base64', 'utf8');
     return (decrypted + decipher.final('utf8'));
});

module.exports = {
     decrypt
}