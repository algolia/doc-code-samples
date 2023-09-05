export function hitTemplate(hit, { html, components }) {
  return html`
    <div class="hit">
      <div class="hit-image">
        <img src="${hit.image}" />
      </div>
      <div class="hit-content">
        <div class="hit-name">
          ${components.Highlight({ attribute: 'name', hit })}
        </div>
        <div class="hit-description">
          ${components.Snippet({ attribute: 'description', hit })}
        </div>
        <div class="hit-price">$${hit.price}</div>
      </div>
    </div>
  `
}
