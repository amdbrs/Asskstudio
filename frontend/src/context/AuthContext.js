import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('assk-token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/admin/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          if (response.ok) {
            const data = await response.json();
            setAdmin(data);
          } else {
            logout();
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/admin/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    setToken(data.token);
    setAdmin(data.admin);
    localStorage.setItem('assk-token', data.token);
    return data;
  };

  const register = async (name, email, password) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/admin/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    const data = await response.json();
    setToken(data.token);
    setAdmin(data.admin);
    localStorage.setItem('assk-token', data.token);
    return data;
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('assk-token');
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!admin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
