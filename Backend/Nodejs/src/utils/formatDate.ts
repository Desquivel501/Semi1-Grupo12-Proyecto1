export function formatDate(data: string) {
  const date = data.split("/");
  return date[2] + "-" + date[0] + "-" + date[1];
}
