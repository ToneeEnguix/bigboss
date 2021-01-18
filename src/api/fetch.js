import { API_URL } from "./API_URL";
import { getToken } from "./token";

const getHeaders = async (call) => {
  const token = await getToken();
  let headers = new Headers();

  if (call.post === true) {
    headers.append("Content-Type", "application/x-www-form-urlencoded");
  }

  if (token) {
    headers.append("access-token", token);
  }

  return headers;
};

export const post = async (destination, body) => {
  const headers = await getHeaders({ post: true });
  const urlencoded = new URLSearchParams();
  urlencoded.append("data", JSON.stringify(body));
  const result = await fetch(`${API_URL}${destination}`, {
    method: "POST",
    headers,
    body: urlencoded,
    redirect: "follow",
  });
  const formattedResult = await formatResult(result);
  return formattedResult;
};

export const get = async (destination) => {
  const headers = await getHeaders({ post: false });

  const result = await fetch(`${API_URL}${destination}`, {
    method: "GET",
    headers,
  });

  const formattedResult = await formatResult(result);
  return formattedResult;
};

const formatResult = async (result) => {
  const formatted = {
    status: result.status,
    ok: result.ok,
  };

  if (result.ok) {
    formatted.data = await result.json();
  }

  return formatted;
};
