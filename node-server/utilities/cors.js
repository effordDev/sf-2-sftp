const buildWhiteList = (vars) => {
     let whiteList = []
     Object.keys(vars).forEach(key => {
          if (key.toLocaleLowerCase().includes('allowed')) {
               whiteList.push(vars[key])
          }
     })
     return whiteList
}

const opts = (whitelist) => {
     return corsOptions = {
          origin: function (origin, callback) {
               if (whitelist.indexOf(origin) !== -1) {
                    callback(null, true)
               } else {
                    console.log(`origin`, origin)
                    callback(new Error('Not allowed by CORS'))
               }
          }
     }
}

module.exports = {
     buildWhiteList,
     opts
}