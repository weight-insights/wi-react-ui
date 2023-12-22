function getAllHellos() {
  const url = 'hello';
  const baseUrl = 'https://weight-insights.cyclic.app';
  const options = {};
  return fetch(`${baseUrl}/${url}`, options);
}

export {
  getAllHellos
};
