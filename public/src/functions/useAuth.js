import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuth = (initialUser) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      axios.get('http://localhost:4444/user', { withCredentials: true })
        .then(response => {
          if (response.data.user) {
            setUser(response.data.user);
          } else {
            navigate("/login");
          }
        })
        .catch(() => navigate("/login"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  return { user, loading, setUser };
};

export default useAuth;
