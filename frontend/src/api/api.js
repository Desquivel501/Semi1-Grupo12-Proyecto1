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

export function sendFormData({ endpoint, data }) {
  return fetch(`${API}${endpoint}`, {
    method: "POST",
    body: data,
    headers: {
      "Access-Control-Allow-Origin_Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export function sendJsonData({ endpoint, data }) {
  return fetch(`${API}${endpoint}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Access-Control-Allow-Origin_Origin": "*",
      "Content-Type": "application/json",
    },
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}


export function getData({ endpoint }) {
  return fetch(`${API}${endpoint}`)
    .then((res) => res.json())
    .catch((er) => console.log(er));
}

export function getDataAuth({ endpoint }) {
  return fetch(`${API}${endpoint}`, {
    headers: {
      "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .catch((er) => console.log(er));
}

export function patchData({ endpoint, data }) {
    return fetch(`${API}${endpoint}`, {
      method: "PATCH",
      body: data,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

export function deleteData({ endpoint }) {
  return fetch(`${API}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}