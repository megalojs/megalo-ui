export function view(path) {
  return function(resolve) {
    return import(`@/${path}.vue`).then((s) => {
      resolve(s.default);
    });
  };
}