import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/', { replace: true });
  }, [auth.isAuthenticated, navigate]);

  const handleLogin = async () => {
    auth.login(email, password);
  };

  return (
    <div>
      <div>
        <label htmlFor="">email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="">password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin} >Login</button>
      <Link to="/auth/register">Go to Register</Link>
    </div>
  );
};

export default Login;
