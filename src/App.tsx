import { Link, Outlet } from 'react-router-dom';
import './App.css';
import { useAuth } from './hooks/useAuth';
import viteLogo from '/vite.svg';

function App() {
  const auth = useAuth();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button onClick={auth.logout}>Cerrar sesion</button>
      <div className="card">
        <ul>
          <li><Link to="/intereses">Intereses</Link></li>
          <li><Link to="/print">Print</Link></li>
          <li><Link to="/calcular-distancia-wt">Calcular Distancia WT</Link></li>
          <li><Link to="/contador-letras">Contador Letras</Link></li>
        </ul>
        <Outlet />
      </div>
    </>
  );
}

export default App;
