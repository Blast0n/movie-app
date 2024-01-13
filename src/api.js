const getData = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error('Страница не найдена');
  }
  const body = await res.json();
  return body;
};

export default getData;
