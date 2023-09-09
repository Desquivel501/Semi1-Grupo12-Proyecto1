const API = import.meta.env.VITE_API;

export function registrar(data) {
  return fetch(`${API}/api/users/newUser`, {
    method: "POST",
    body: data,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export function inicioSesion(data) {
  console.log(data);
  return fetch(`${API}/api/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}