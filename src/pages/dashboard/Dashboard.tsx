import RechartsArea from '@/components/RechartsArea';
import { GastosService } from '@/services/gastos.service';
import { VentasService, type FiltroType } from '@/services/ventas.service';
import { useEffect, useState, type ChangeEvent } from 'react';
import styles from './dashboard.module.scss';

const Dashboard = () => {
  const [ventas, setVentas] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [ventasFiltro, setVentasFiltro] = useState<FiltroType>('' as FiltroType);
  const [gastosFiltro, setGastosFiltro] = useState<FiltroType>('' as FiltroType);
  const [loading, setLoading] = useState(false);

  const fetchVentas = async () => {
    setLoading(true);
    try {
      const response = await VentasService.getVentas(ventasFiltro);
      console.log('Ventas obtenidas:', response);
      setVentas(response);
    } catch (error) {
      console.error("Error al cargar ventas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGastos = async () => {
    setLoading(true);
    try {
      const response = await GastosService.getGastos(gastosFiltro);
      console.log('Gastos obtenidos:', response);
      setGastos(response);
    } catch (error) {
      console.error("Error al cargar gastos:", error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchVentas();
    fetchGastos();
  }, [ventasFiltro, gastosFiltro]);

  const handleVentasFiltroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setVentasFiltro(e.target.value as FiltroType);
  };

  const handleGastosFiltroChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGastosFiltro(e.target.value as FiltroType);
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div className={styles.chartsContainer}>
        <h2>Ventas</h2>

        <div style={{ marginBottom: '20px' }}>
          <label>Filtrar por: </label>
          <select onChange={handleVentasFiltroChange} value={ventasFiltro}>
            <option value=''>Todos</option>
            <option value='dia'>Hoy</option>
            <option value='semana'>Esta Semana</option>
            <option value='mes'>Este Mes</option>
            <option value='anio'>Este Año</option>
          </select>

          <button onClick={fetchVentas} disabled={loading}>
            {loading ? 'Cargando...' : 'Refrescar'}
          </button>
        </div>

        <div style={{ height: '400px', width: '400px' }}>
          {ventas && ventas.length > 0 ? (
            <RechartsArea data={ventas} />
          ) : (
            <p>No hay datos disponibles para este periodo.</p>
          )}
        </div>

      </div>

      <div className={styles.chartsContainer}>

        <h2>Gastos</h2>
        <div style={{ marginBottom: '20px' }}>
          <label>Filtrar por: </label>
          <select onChange={handleGastosFiltroChange} value={gastosFiltro}>
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
          {gastos && gastos.length > 0 ? (
            <RechartsArea data={gastos} />
          ) : (
            <p>No hay datos disponibles para este periodo.</p>
          )}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
