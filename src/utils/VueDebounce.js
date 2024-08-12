export default function debounce(initFunction, delay) {
  let debounceTimer;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => initFunction.apply(context, args), delay);
  };
}
