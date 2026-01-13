import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate('/', { replace: true });
  }, [auth.isAuthenticated, navigate]);

  const handleRegister = async () => {
    auth.register(email, password, name, "user");
  };

  return (
    <div>
      <div>
        <div>
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <label htmlFor="email">email</label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister} >Register</button>
      <Link to="/auth/login">Go to Login</Link>
    </div>
  );
};

export default Register;
