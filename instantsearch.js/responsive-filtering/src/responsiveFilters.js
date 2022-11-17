/* global bootstrap instantsearch */

const { connectCurrentRefinements } = instantsearch.connectors;

function filtersCount({ container }) {
  const createCurrentRefinements = connectCurrentRefinements(({ items }) => {
    document.querySelector(container).innerText =
      items.length > 0 ? `Filters (${items.length})` : 'Filters';
  });

  return {
    ...createCurrentRefinements(),
    $$widgetType: 'custom.filtersCount',
  };
}

export function createResponsiveFiltersWidgets() {
  const filtersModal = new bootstrap.Modal('#filters-modal');
  const modalBody = document.getElementById('modal-body');
  const filtersDesktop = document.getElementById('filters-desktop');

  document.getElementById('open-filters').addEventListener('click', () => {
    filtersModal.show();
    modalBody.append(...filtersDesktop.childNodes);
  });

  document.getElementById('apply-filters').addEventListener('click', () => {
    filtersModal.hide();
    filtersDesktop.append(...modalBody.childNodes);
  });

  document
    .getElementById('filters-modal')
    .addEventListener('hidden.bs.modal', () => {
      filtersDesktop.append(...modalBody.childNodes);
    });

  return [
    filtersCount({ container: '#filters-count' }),
    instantsearch.widgets.clearRefinements({
      container: '#clear-refinements',
      templates: { resetLabel: 'Reset filters' },
    }),
    instantsearch.widgets.stats({
      container: '#nb-hits',
      templates: {
        text({ nbHits }) {
          return `See ${nbHits.toLocaleString()} results`;
        },
      },
    }),
  ];
}
