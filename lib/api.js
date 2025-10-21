// utils/api.js

/**
 * Función utilitaria para peticiones API
 * @param {string} route - Ruta de la API
 * @param {Object} data - Datos para POST/PUT
 * @param {string} method - Método HTTP
 * @returns {Promise} - Datos del server para GET, status para POST
 */
export async function apiRequest(route, data = {}, method = 'GET') {
  // Obtener token
  const token = localStorage.getItem('token') || getCookie('token');
  
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method: method,
    headers: headers,
  };

  // Solo agregar body para métodos que envían datos
  if (['POST', 'PUT', 'PATCH'].includes(method) && Object.keys(data).length > 0) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`http://localhost:8080${route}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}`);
    }

    // Para GET: devolver los datos del server
    if (method === 'GET') {
      const responseData = await response.json();
      return {
        success: true,
        data: responseData,
        status: response.status
      };
    }
    
    // Para POST/PUT/DELETE: devolver solo el status (y mensaje si existe)
    const result = {
      success: true,
      status: response.status
    };

    // Intentar obtener mensaje de éxito si viene en el response
    try {
      const responseData = await response.json();
      if (responseData.message) {
        result.message = responseData.message;
      }
    } catch {
      // Si no hay JSON, está bien
    }

    return result;

  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
}

// Helper function para cookies
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

/**
 * Métodos específicos para mejor experiencia de desarrollo
 */
export const api = {
  get: (route) => apiRequest(route, {}, 'GET'),
  post: (route, data) => apiRequest(route, data, 'POST'),
  put: (route, data) => apiRequest(route, data, 'PUT'),
  delete: (route) => apiRequest(route, {}, 'DELETE')
};