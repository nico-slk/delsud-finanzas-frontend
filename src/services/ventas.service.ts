const API_URL = "http://localhost:3001/api";

export type FiltroType = "hoy" | "semana" | "mes" | "anio" | "";

export class VentasService {
  static async getVentas(filtro: FiltroType) {
    const ventas = await fetch(`${API_URL}/venta?filtro=${filtro}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const isOk = ventas.ok;
    if (!isOk) {
      throw new Error("Error al obtener las ventas");
    }
    const data = await ventas.json();
    return data;
  }
}
