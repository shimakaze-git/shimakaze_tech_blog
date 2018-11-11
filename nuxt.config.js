const contentful = require('contentful')
// const contentful = require("contentful/dist/contentful.node.min.js")

const config = require('./.contentful.json')
const client = contentful.createClient({
  
  // space: config.CTF_SPACE_ID,
  space: process.env.CTF_SPACE_ID,
  // accessToken: config.CTF_CDA_ACCESS_TOKEN
  accessToken: process.env.CTF_CDA_ACCESS_TOKEN
})


module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | Awesome JS SSR Blog',
    // ...
    link: [
      // ...
      { 
        rel: 'stylesheet', 
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.2/css/bulma.min.css' 
      }
    ]
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'shimakaze_tech_blog',
    titleTemplate: '%s | Shimakaze tech blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'shimakaze tech blog' }
    ],
    link: [
      { 
        rel: 'icon',
        type: 'image/x-icon', 
        href: '/favicon.ico' 
      },
      { 
        rel: 'stylesheet', 
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.2/css/bulma.min.css' 
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  
  /*
  ** plugins
  */
  plugins: ['./plugins/contentful.js'],
  
  
  /*
  ** Generate configuration
  */
  generate: {
    routes () {
      return client.getEntries({
        // 'content_type': config.CTF_BLOG_POST_TYPE_ID
        'content_type': process.env.CTF_BLOG_POST_TYPE_ID
      }).then((entries) => {
        return [...entries.items.map(entry => `posts/${entry.fields.slug}`)]
      })
    }
  },
  // generate: {
  //   routes(callback) {
  //     const posts = require('./posts.json')
  //     let routes = posts.map(post => `/post/${post.id}`)
  //     callback(null, routes)
  //   }
  // }  


  /*
  ** Values that will be available via process.env
  */
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: process.env.CTF_PERSON_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID
    // CTF_SPACE_ID: config.CTF_SPACE_ID,
    // CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    // CTF_PERSON_ID: config.CTF_PERSON_ID,
    // CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID,
  }


}
