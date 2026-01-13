import type { VentaInterface } from "@/interfaces/ventas.interface";
import { formatoLegible } from "./dateFormat";

export const transformarParaGrafico = (array: VentaInterface[]) => {
  const agrupado = array.reduce((acc, item) => {
    const fechaClave = formatoLegible(new Date(item.fecha));

    if (!acc[fechaClave]) {
      acc[fechaClave] = {
        name: fechaClave,
        monto: 0,
        cantidad: 0,
      };
    }

    acc[fechaClave].monto += parseFloat(item.monto);
    acc[fechaClave].cantidad += 1;

    return acc;
  }, {} as Record<string, { name: string; monto: number; cantidad: number }>);

  return Object.values(agrupado).sort((a, b) => {
    return new Date(a.name).getTime() - new Date(b.name).getTime();
  });
};
