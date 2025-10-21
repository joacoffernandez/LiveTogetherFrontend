// utils/api.js

/**
 * Función utilitaria para peticiones API (con cookies HTTP-only)
 * @param {string} route - Ruta de la API (ej: '/auth/login', '/tasks')
 * @param {Object} data - Datos para POST/PUT/PATCH
 * @param {string} method - Método HTTP
 * @returns {Promise} - Respuesta del servidor
 */
export async function apiRequest(route, data = {}, method = 'GET') {
  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method,
    headers,
    credentials: 'include', // envia las cookies
  };


  if (['POST', 'PUT', 'PATCH'].includes(method) && Object.keys(data).length > 0) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`http://localhost:8080${route}`, config);


    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }

    if (!response.ok) {
      throw new Error(responseData?.message || `Error ${response.status}`);
    }

    return {
      success: true,
      data: responseData,
      status: response.status,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error.message,
      status: 500,
    };
  }
}


export const api = {
  get: (route) => apiRequest(route, {}, 'GET'),
  post: (route, data) => apiRequest(route, data, 'POST'),
  put: (route, data) => apiRequest(route, data, 'PUT'),
  patch: (route, data) => apiRequest(route, data, 'PATCH'),
  delete: (route) => apiRequest(route, {}, 'DELETE'),
};
