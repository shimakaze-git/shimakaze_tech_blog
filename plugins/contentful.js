const contentful = require('contentful')
// const contentful = require("contentful/dist/contentful.node.min.js")

const contentful_config = require('../.contentful.json')

console.log(process.env)
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
    space: process.env.CTF_SPACE_ID,
    // space: contentful_config.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
    // accessToken: contentful_config.CTF_CDA_ACCESS_TOKEN
}

// export `createClient` to use it in page components
module.exports = {
    createClient () {
        return contentful.createClient(config)
    }
}