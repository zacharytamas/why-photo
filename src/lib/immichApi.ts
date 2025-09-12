export const immichFetch = (path: `/${string}`, init: RequestInit = {}) =>
  fetch(`${import.meta.env.VITE_IMMICH_HOST}/api${path}`, {
    method: init.method || 'GET',
    headers: {
      'x-api-key': import.meta.env.VITE_IMMICH_API_KEY || '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...init.headers,
    },
    body: init.body || undefined,
  })
