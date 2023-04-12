export const getData = (element?: HTMLElement | null) => {
  if (!element) return;
  const inputs = (Array.from(element.querySelectorAll('input')));
  const values = inputs.filter((input) => input.name)
    .map((input) => [input.name, input.value]);
  return Object.fromEntries(values);
};
