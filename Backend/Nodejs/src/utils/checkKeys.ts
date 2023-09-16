export function checkKeys(object: any, noCheck: [string]) {
  const data = Object.entries(object);
  for (const [key, value] of data) {
    if (noCheck.includes(key)) {
      continue;
    }
    if (!object[key]) {
      return false;
    }
  }
  return true;
}
