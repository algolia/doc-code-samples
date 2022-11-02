/* global bootstrap instantsearch */

export const createResponsiveFiltersWidgets = () => {
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

  const { connectCurrentRefinements } = instantsearch.connectors;
  const customCurrentRefinements = connectCurrentRefinements(({ items }) => {
    document.getElementById('nb-filters').innerText =
      items.length > 0 ? `Filters (${items.length})` : 'Filters';
  });

  return [
    customCurrentRefinements(),
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
};
