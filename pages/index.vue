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

    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <h5>Tags</h5>
        <div class="container">
          <div class="content tags">
            <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Posts from '~/components/Posts.vue'
import {createClient} from '~/plugins/contentful.js'

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
      tags: [],
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

      /*
        tags
      */
      var array_tags = []
      entries.items.forEach(function( item ) {
        var tags = item.fields.tags

        if(tags){
          for(var i=0; i < tags.length; i++){
            array_tags.push(tags[i])
          }
        }
      });

      return {
        posts: entries.items,
        tags: Array.from(new Set(array_tags))
      }
    }).catch(console.error)
  },
}
</script>
