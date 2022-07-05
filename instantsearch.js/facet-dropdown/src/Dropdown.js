/* global instantsearch */

import {
  hasClassName,
  addClassName,
  removeClassName,
  capitalize,
} from './util';

const CLASS_OPENED = 'ais-Dropdown--opened';
const CLASS_BUTTON = 'ais-Dropdown-button';
const CLASS_CLOSE_BUTTON = 'ais-Dropdown-close';

const cx = (...args) => args.filter(Boolean).join(' ');

export function createDropdown(
  baseWidget,
  {
    cssClasses: userCssClasses = {},
    buttonText,
    buttonClassName,
    closeOnChange,
  } = {}
) {
  // Merge class names with the default ones and the ones from user
  const cssClasses = {
    root: cx('ais-Dropdown', userCssClasses.root),
    button: cx(CLASS_BUTTON, userCssClasses.button),
    buttonRefined: cx(
      'ais-Dropdown-button--refined',
      userCssClasses.buttonRefined
    ),
    closeButton: cx(CLASS_CLOSE_BUTTON, userCssClasses.closeButton),
  };
  const makeWidget = instantsearch.widgets.panel({
    cssClasses,
    templates: {
      header: (options) => {
        const { widgetParams } = options;

        let text;
        if (typeof buttonText === 'string') {
          text = buttonText;
        } else if (typeof buttonText === 'function') {
          text = buttonText(options);
        } else {
          // See if the widget has `attribute`
          const attribute =
            widgetParams && widgetParams.attribute
              ? capitalize(widgetParams.attribute)
              : '';
          // Get the number of refinements if the widget has `items`
          const nbRefinements = (options.items || []).filter(
            (item) => item.isRefined
          ).length;
          // Format the button text
          text =
            nbRefinements > 0 ? `${attribute} (${nbRefinements})` : attribute;
        }

        const classNames = [cssClasses.button];
        if (typeof buttonClassName === 'string') {
          classNames.push(buttonClassName);
        } else if (typeof buttonClassName === 'function') {
          classNames.push(buttonClassName(options));
        } else if ((options.items || []).find((item) => item.isRefined)) {
          classNames.push(cssClasses.buttonRefined);
        }

        return `
          <button type="button" class="${cx(...classNames)}">
            ${text}
          </button>
        `;
      },
      footer: `<button type="button" class="${cssClasses.closeButton}">Apply</button>`,
    },
  })(baseWidget);

  return (widgetParams) => {
    const widget = makeWidget(widgetParams);
    let cleanUp;
    let state = {};

    // Return a modified version of the widget
    return {
      ...widget,
      init: (options) => {
        const rootElem = document
          .querySelector(widgetParams.container)
          .querySelector('.ais-Panel');
        const headerElem = rootElem.querySelector('.ais-Panel-header');
        const closeButtonElem = rootElem.querySelector(
          '.' + CLASS_CLOSE_BUTTON
        );

        const open = () => {
          addClassName(rootElem, CLASS_OPENED);
          // This 'click' event is still being propagated,
          // so we add this event listener in the next tick.
          // Otherwise, it will immediately close the panel again.
          setTimeout(() => {
            state.windowClickListener = (event) => {
              // Close if the outside is clicked
              if (!rootElem.contains(event.target)) {
                close();
              }
            };
            // Add an event listener when the panel is opened
            window.addEventListener('click', state.windowClickListener);
          }, 0);
        };
        const close = () => {
          removeClassName(rootElem, CLASS_OPENED);
          // Remove the event listener when the panel is closed
          window.removeEventListener('click', state.windowClickListener);
          delete state.windowClickListener;
        };
        const isOpened = () => hasClassName(rootElem, CLASS_OPENED);
        const toggle = () => {
          if (isOpened()) {
            close();
          } else {
            open();
          }
        };

        // Add a click listener to the header (button)
        const buttonListener = (event) => {
          if (!event.target.matches('.' + CLASS_BUTTON)) {
            return;
          }
          toggle();
        };
        headerElem.addEventListener('click', buttonListener);

        closeButtonElem.addEventListener('click', close);

        // Setup a clean-up function, which will be called in `dispose`.
        cleanUp = () => {
          headerElem.removeEventListener('click', buttonListener);
          if (state.windowClickListener) {
            window.removeEventListener('click', state.windowClickListener);
          }
        };

        // Whenever uiState changes, it closes the panel.
        options.instantSearchInstance.use(() => ({
          subscribe() {},
          unsubscribe() {},
          onStateChange() {
            if (
              isOpened() &&
              (closeOnChange === true ||
                (typeof closeOnChange === 'function' &&
                  closeOnChange() === true))
            ) {
              close();
            }
          },
        }));
        return widget.init.call(widget, options);
      },
      dispose: (options) => {
        if (typeof cleanUp === 'function') {
          cleanUp();
        }
        return widget.dispose.call(widget, options);
      },
    };
  };
}
