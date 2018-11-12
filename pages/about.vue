<template>
  <article class="section">

    <section class="container">
      <h2 class="title has-text-centered">About Me</h2>
      <div class="media">
        <figure class="media-left">
          <img :src="person.image.fields.file.url" :alt="person.image.fields.title">
        </figure>
      </div>
  
      <div class="media">
        <div class="media-content">
          <ul>
            <li>Name : {{person.name}}</li>
            <li>Job : {{person.title}}</li>
            <li>
              Twitter : <a href="https://twitter.com/shimakaze_soft">@{{person.twitter}}</a>
            </li>
            <li>
              GitHub : 
              <a href="https://github.com/shimakaze-git">{{person.github}}</a>
            </li>
            <li>
              Qiita : 
              <a href="https://qiita.com/shimakaze_soft">{{person.twitter}}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="media">
        <div class="media-content">
          <p v-for="str in shortBio" :key="str">
            {{str}}
          </p>
          本ブログは<a href="https://github.com/hisako135/nuxt_blog">こちら</a>を参考にしました。
        </div>
      </div>

    </section>

  </article>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import {createClient} from '~/plugins/contentful.js'
const client = createClient()


export default {
  head: {
    title: 'About'
  },
  data () {
    return {
      person: [],
      shortBio: []
    }
  },
  components: {
    VueMarkdown
  },
  asyncData ({ env }) {
    return client.getEntries({
      'content_type': env.CTF_PERSON_TYPE_ID
    }).then(entries => {
      var shortBio = entries.items[0].fields.shortBio
      
      return {
        person: entries.items[0].fields,
        shortBio: shortBio.split(/\n/)
      }
    }).catch(console.error)
  },
  // mounted: function () {
  //   console.log(this.person)
  // }
}
</script>

<style scoped>
.container {
  margin-bottom: 3rem;
}
</style>