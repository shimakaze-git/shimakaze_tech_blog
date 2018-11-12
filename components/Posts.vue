<template>
<section class="section container">
    <div class="container">
        
        <h1 class="title has-text-centered">
            Recent Posts.
        </h1>

        <div class="columns is-multiline">
            <div class="column is-half" v-for="post in posts" :key="post.sys.id">
                <div class="card">
                    
                    <header class="card-header">
                        <p class="card-header-title">
                            <!--{{ post.title }}-->
                            {{ post.fields.title }}
                        </p>
                    </header>
                    
                    <div class="card-content">
                        <div class="content">

                            <div class="notification is-primary">
                                {{ post.fields.description }}
                            </div>

                            <br>
                            <small>{{ ( new Date(post.fields.publishDate)).toDateString() }}</small>
                        </div>
                        <div class="content">
                            <div class="content tags">
                                <span class="tag" v-for="tag in post.fields.tags" :key="tag">{{ tag }}</span>
                            </div>
                            <!--test-->
                        </div>
                    </div>
                    
                    <footer class="card-footer">
                        <nuxt-link :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}" class="card-footer-item">
                            記事を読む
                        </nuxt-link>
                    </footer>

                </div>

            </div>
        </div>
        
    </div>
</section>
</template>

<script>
// import posts from '~/posts.json'
// export default {
//     name: 'posts',
//     data () {
//         console.log(posts);
//         return { posts }
//     }
// }
// console.log(this.posts)

export default {
    props: ['posts']
}
</script>