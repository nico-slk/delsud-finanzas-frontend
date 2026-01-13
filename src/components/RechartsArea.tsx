import type { VentaInterface } from '@/interfaces/ventas.interface';
import { transformarParaGrafico } from '@/utils/transformarParaGrafico';
import { useMemo } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const RechartsArea = ({ data }: { data: VentaInterface[]; }) => {
  const dataFormateada = useMemo(() => transformarParaGrafico(data), [data]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={600} height={400} data={dataFormateada}>
        <Area
          type="monotone"
          dataKey="monto"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <XAxis dataKey="cantidad" />
        <YAxis />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RechartsArea;
