const BASE_URL = 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com';

export default {
  get: async (path, params) => {
    try {
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
    } catch (err) {
      throw new Error(err);
    }
  },
  post: async (path, data) => {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
  },
  put: async (path, data) => {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
  },
  delete: async (path) => {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method: 'DELETE',
      });
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
  },
};
