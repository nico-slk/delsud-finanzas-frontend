import RechartsArea from '@/components/RechartsArea';
import { VentasService, type FiltroType } from '@/services/ventas.service';
import { useEffect, useState, type ChangeEvent } from 'react';

const Dashboard = () => {
  const [ventas, setVentas] = useState([]);
  const [filtro, setFiltro] = useState<FiltroType>('' as FiltroType);
  const [loading, setLoading] = useState(false);

  const fetchVentas = async () => {
    setLoading(true);
    try {
      const response = await VentasService.getVentas(filtro);
      console.log('Ventas obtenidas:', response);
      setVentas(response);
    } catch (error) {
      console.error("Error al cargar ventas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, [filtro]);

  const handleFiltroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFiltro(e.target.value as FiltroType);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Filtrar por: </label>
        <select onChange={handleFiltroChange} value={filtro}>
          <option value=''>Todos</option>
          <option value='hoy'>Hoy</option>
          <option value='semana'>Esta Semana</option>
          <option value='mes'>Este Mes</option>
          <option value='anio'>Este Año</option>
        </select>

        <button onClick={fetchVentas} disabled={loading}>
          {loading ? 'Cargando...' : 'Refrescar'}
        </button>
      </div>

      <div style={{ height: '400px', width: '400px' }}>
        <h2>Ventas</h2>
        {ventas && ventas.length > 0 ? (
          <RechartsArea data={ventas} />
        ) : (
          <p>No hay datos disponibles para este periodo.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
