export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [month, day, year].join('/');
}

export function currentDate() {
  const date = new Date(Date.now());
  return formatDate(date);
}

export function removeCookies(cookieAccess, cookieArr = []) {
  cookieArr.forEach((cookie) => cookieAccess.remove(cookie));
}

export function adjustIntValuesonAnObject(obj, cv, multiplier) {
  const factor = multiplier / cv;
  Object.keys(obj).map((key) => {
    typeof obj[key] === 'number' && key !== 'quantity'
      ? (obj[key] = Math.round(obj[key] * factor))
      : (obj[key] = obj[key]);
  });
  return obj;
}

export function chunkArr(array, size) {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
}

export function sumProperty(arr, prop) {
  let total = 0;
  arr.map((el) => {
    total = total += el[prop];
  });
  return total;
}

export function isExcludedFromThesePages(routerHook, pageArr) {
  return pageArr.map((pageStr) => routerHook.asPath === pageStr).includes(true);
}

export function currentRecords(data) {
  return data.filter(record => record.date === currentDate())
}

export function previousRecords(data) {
  return data.filter(record => record.date !== currentDate())
}

export function favoriteFoods(data) {
  return data.filter(record => record.favoprite == true)
}