/* global instantsearch algoliasearch */

const { connectAutocomplete } = instantsearch.connectors;

const searchClient = algoliasearch(
  'latency',
  '6be0576ff61c053d5f9a3225e2a90f76'
);

const search = instantsearch({
  indexName: 'autocomplete_twitter_accounts',
  searchClient,
});

const textarea = document.querySelector('#compose');
const panel = document.querySelector('#mentions-panel');

let activeToken = null;
let refine = () => {};

// The word under the caret, with its [start, end] range in the text.
function getActiveToken(input, cursor) {
  const re = /\S+/g;
  let match;

  while ((match = re.exec(input))) {
    const start = match.index;
    const end = start + match[0].length;

    if (start <= cursor && cursor <= end) {
      return { word: match[0], range: [start, end] };
    }
  }

  return null;
}

// A mention is "@" followed by 1–15 word characters.
const isMention = (word) => /^@\w{1,15}$/.test(word);

function hidePanel() {
  panel.hidden = true;
  panel.replaceChildren();
}

// Build the suggestion rows with DOM APIs so that account data (handle, image)
// is set through safe assignments instead of interpolated into an HTML string.
function renderHits(hits) {
  const items = hits.map((hit) => {
    const item = document.createElement('li');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'account-item';
    button.dataset.handle = hit.handle;

    const image = document.createElement('img');
    image.src = hit.image;
    image.alt = '';

    const text = document.createElement('span');

    const name = document.createElement('span');
    name.className = 'account-name';
    // `_highlightResult.value` is HTML-escaped by Algolia with only the
    // highlighting tags added, so it's safe to render as markup here—this is
    // what the `Highlight` component does internally.
    name.innerHTML = hit._highlightResult.name.value;

    const handle = document.createElement('span');
    handle.className = 'account-handle';
    handle.textContent = `@${hit.handle}`;

    text.append(name, handle);
    button.append(image, text);
    item.append(button);
    return item;
  });

  panel.replaceChildren(...items);
}

// Measure the caret's pixel position inside the textarea by rendering a hidden
// mirror element with the same styles and text up to the caret. The docs use
// the `textarea-caret` npm package for this; it's inlined here so the example
// stays a single CDN page with no bundled dependencies.
function getCaretCoordinates(element, position) {
  const computed = window.getComputedStyle(element);
  const mirror = document.createElement('div');
  const props = [
    'boxSizing', 'width', 'overflowX', 'overflowY',
    'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
    'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize',
    'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent',
    'letterSpacing', 'wordSpacing', 'tabSize',
  ];
  mirror.style.position = 'absolute';
  mirror.style.visibility = 'hidden';
  mirror.style.whiteSpace = 'pre-wrap';
  mirror.style.wordWrap = 'break-word';
  mirror.style.overflow = 'hidden';
  props.forEach((prop) => {
    mirror.style[prop] = computed[prop];
  });

  mirror.textContent = element.value.slice(0, position);
  const marker = document.createElement('span');
  marker.textContent = element.value.slice(position) || '.';
  mirror.appendChild(marker);
  document.body.appendChild(mirror);

  const lineHeight =
    parseInt(computed.lineHeight, 10) ||
    Math.round(parseInt(computed.fontSize, 10) * 1.5);
  const coordinates = {
    top: marker.offsetTop,
    left: marker.offsetLeft,
    height: lineHeight,
  };
  document.body.removeChild(mirror);
  return coordinates;
}

// Move the panel directly below the "@" of the active mention.
function positionPanel() {
  const caret = getCaretCoordinates(textarea, activeToken.range[0]);
  panel.style.top =
    textarea.offsetTop + caret.top + caret.height - textarea.scrollTop + 'px';
  panel.style.left = textarea.offsetLeft + caret.left + 'px';
}

// Only search when the caret sits inside a mention.
function onInput() {
  activeToken = getActiveToken(textarea.value, textarea.selectionEnd);

  if (activeToken && isMention(activeToken.word)) {
    refine(activeToken.word.slice(1));
  } else {
    hidePanel();
  }
}

// Replace the active mention with the chosen handle. Use `mousedown` (with
// `preventDefault`) rather than `click` so the textarea keeps focus.
panel.addEventListener('mousedown', (event) => {
  const button = event.target.closest('.account-item');
  if (!button || !activeToken) return;
  event.preventDefault();

  const [start, end] = activeToken.range;
  const replacement = `@${button.dataset.handle} `;
  textarea.value =
    textarea.value.slice(0, start) + replacement + textarea.value.slice(end);
  const caret = start + replacement.length;
  textarea.setSelectionRange(caret, caret);
  textarea.focus();
  hidePanel();
});

// connectAutocomplete: you own the rendering; it gives you hits and refine.
const customAutocomplete = connectAutocomplete(
  (renderOptions, isFirstRender) => {
    refine = renderOptions.refine;

    if (isFirstRender) {
      textarea.addEventListener('input', onInput);
      textarea.addEventListener('click', onInput);
      textarea.addEventListener('keyup', onInput);
      return;
    }

    // Show a loading row while a mention search is stalled.
    if (
      activeToken &&
      isMention(activeToken.word) &&
      search.status === 'stalled'
    ) {
      positionPanel();
      panel.hidden = false;
      const loading = document.createElement('li');
      loading.className = 'account-loading';
      loading.textContent = 'Searching…';
      panel.replaceChildren(loading);
      return;
    }

    const index = renderOptions.indices[0];
    const hits = (index && index.hits) || [];

    if (!activeToken || !isMention(activeToken.word) || hits.length === 0) {
      hidePanel();
      return;
    }

    positionPanel();
    panel.hidden = false;
    renderHits(hits);
  }
);

search.addWidgets([customAutocomplete({})]);
search.start();
