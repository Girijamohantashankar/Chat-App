import { useState, useEffect } from 'react';

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      setTimeout(() => {
        setAuthenticated(false); 
        setLoading(false);
      }, 1000);
    };

    checkAuthentication();
  }, []);

  return { loading, authenticated };
}
