<template>
  <div>
    <div class="ais-hits--item">
      <article>
        <div class="post-img">
          <a :href="result.permalink">
            <img :src="result.image">
          </a>
        </div>
        <div class="post-content">
          <div class="post-date">{{ result.post_date_formatted }}</div>
          <h2 class="entry-title">
            <a :href="result.permalink" rel="bookmark">
              <ais-highlight :result="result" attribute-name="post_title"/>
            </a>
          </h2>
          <div class="post-excerpt">
            <ais-snippet :result="result" attribute-name="content"/>
          </div>
          <div class="entry-meta clear">
            <div class="author-gravatar">
              <img :src="result.author_image_url" width="40" height="40">
            </div>
            <div class="entry-author-content">
              <div class="author-name">
                <ais-highlight :result="result" attribute-name="author_name"/>
              </div>
              <div class="post-meta-info">
                {{ result.time_to_read }} min read in
                <span :key="item.id" v-for="(item, index) in result._highlightResult.categories" v-html="`${item.value}${index !== result._highlightResult.categories.length - 1 ? ', ' : ''}`"></span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    <h2>
      <a :href="result.url">
        {{ result.title }}
      </a>
    </h2>
    <p>{{ result.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    result: Object
  }
}
</script>
