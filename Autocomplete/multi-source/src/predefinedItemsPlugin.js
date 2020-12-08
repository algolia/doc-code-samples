import { linkIcon } from './icons';

export const predefinedItemsPlugin = {
  getSources() {
    return [
      {
        getItems({ query }) {
          return [
            {
              label: 'Documentation',
              url: 'https://autocomplete.algolia.com/',
            },
            {
              label: 'GitHub',
              url: 'https://github.com/algolia/autocomplete.js/tree/next',
            },
          ].filter(
            (item) =>
              !query || item.label.toLowerCase().includes(query.toLowerCase())
          );
        },
        getItemUrl({ item }) {
          return item.url;
        },
        templates: {
          item({ item, root }) {
            const content = document.createElement('a');
            content.href = item.url;
            content.className = 'aa-ItemContent aa-ItemLink aa-PredefinedItem';
            const icon = document.createElement('div');
            icon.className = 'aa-ItemSourceIcon';
            icon.innerHTML = linkIcon;
            const title = document.createElement('div');
            title.innerText = item.label;
            title.className = 'aa-ItemTitle';
            content.appendChild(icon);
            content.appendChild(title);
            root.appendChild(content);
          },
        },
      },
    ];
  },
};
