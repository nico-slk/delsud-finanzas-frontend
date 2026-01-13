const API_URL = "http://localhost:3001/api";

export type FiltroType = "dia" | "semana" | "mes" | "anio" | "";

export class GastosService {
  static async getGastos(filtro: FiltroType) {
    const gastos = await fetch(`${API_URL}/gasto?filtro=${filtro}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const isOk = gastos.ok;
    if (!isOk) {
      throw new Error("Error al obtener los gastos");
    }
    const data = await gastos.json();
    return data;
  }
}
