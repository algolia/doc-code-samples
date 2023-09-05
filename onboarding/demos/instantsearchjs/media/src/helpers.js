export function hitTemplate(hit, { html, components }) {
  return html` <div>
    <article>
      <div class="post-img">
        <a href="${hit.permalink}">
          <img
            src="${hit.image}"
            onError=${(event) =>
              (event.target.src =
                'https://fakeimg.pl/400x200?text=Preview&font=noto')}
          />
        </a>
      </div>
      <div class="post-content">
        <div class="post-date">${hit.post_date_formatted}</div>
        <h2 class="entry-title">
          <a href="${hit.permalink}" rel="bookmark">
            ${components.Highlight({ attribute: 'post_title', hit })}
          </a>
        </h2>
        <div class="post-excerpt">
          ${components.Snippet({ attribute: 'content', hit })}
        </div>
        <div class="entry-meta clear">
          <div class="author-gravatar">
            <img src="${hit.author_image_url}" width="40" height="40" />
          </div>
          <div class="entry-author-content">
            <div class="author-name">
              ${components.Highlight({ attribute: 'author_name', hit })}
            </div>
            <div class="post-meta-info">
              ${hit.time_to_read} min read in ${' '}
              ${components.Highlight({
                attribute: 'categories.0',
                hit,
              })}
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>`
}
