<template>
  <div>
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <img src="">
          <h1 class="title">
            {{ title }}
          </h1>
          <h2 class="subtitle">
            {{ subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <posts :posts="posts"></posts>
  </div>
</template>

<script>
import Posts from '~/components/Posts.vue'
import {createClient} from '~/plugins/contentful.js'

const contentful_config = require('../.contentful.json')
const config = require('../config.json')

const client = createClient()
export default {
  head: {
    title: 'Home'
  },
  components: {
    // AppLogo,
    Posts
  },
  data () {
    return {
      posts: [],
      title: config.title,
      subtitle: config.subtitle
    }
  },
  async asyncData ({ env }) {
    return client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate',
      'limit': 8
    }).then(entries => {
      // console.log(entries);
      return {
        posts: entries.items
      }
    }).catch(console.error)
  }
}
</script>
