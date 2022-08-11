import { Children, isValidElement, ReactNode } from 'react';

export function cx(
  ...classNames: Array<string | number | boolean | undefined | null>
) {
  return classNames.filter(Boolean).join(' ');
}

export function capitalize(value: string) {
  if (typeof value !== 'string') return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getFirstChildPropValue(
  children: ReactNode,
  propNameCb: (props: any) => string
): string | string[] | undefined {
  let propValue = undefined;

  Children.forEach(children, (element) => {
    if (!isValidElement(element)) return;
    const propName = propNameCb(element.props);
    if (propName in element.props) {
      propValue = element.props[propName];
      return;
    }
  });

  return propValue;
}
