const API_URL = process.env.REACT_APP_API_URL;

export async function apiRequest(path, method = 'GET', body, token) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
