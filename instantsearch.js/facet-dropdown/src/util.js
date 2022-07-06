export function hasClassName(elem, className) {
  return elem.className.split(' ').indexOf(className) >= 0;
}

export function addClassName(elem, className) {
  elem.className = [...elem.className.split(' '), className].join(' ');
}

export function removeClassName(elem, className) {
  elem.className = elem.className
    .split(' ')
    .filter((name) => name !== className)
    .join(' ');
}

export function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
