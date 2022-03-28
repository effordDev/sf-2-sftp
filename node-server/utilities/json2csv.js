const { Parser } = require('json2csv')

const json2csvParser = new Parser();

const toCsv = (data) => json2csvParser.parse(data)

module.exports = {
     toCsv
}