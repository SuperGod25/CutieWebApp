import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return navigate('/admin');

  const { data, error } = await supabase
    .from('admins')
    .select('id')
    .eq('id', user.id)
    .limit(1)
    .maybeSingle();

  if (data && !error) {
    setAuthorized(true);
  } else {
    console.warn('User is not in admins table');
    navigate('/unauthorized');
  }
};


    checkAdmin();
  }, [navigate]);

  if (authorized === null) return <div>Verificare...</div>;
  return authorized ? children : null;
};

export default ProtectedRoute;
