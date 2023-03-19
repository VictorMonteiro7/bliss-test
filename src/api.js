const BASE_URL = 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com';

export default {
  get: async (path, params) => {
    if (params) {
      const paramsString = Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');
      const newPath = `${path}?${paramsString}`;
      const response = await fetch(`${BASE_URL}${newPath}`);
      return response.json();
    };
    const response = await fetch(`${BASE_URL}${path}`);
    return response.json();
  },
  post: async (path, data) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  put: async (path, data) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (path) => {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};
