export const formatoLegible = (fecha: Date | string): string =>
  new Date(fecha)
    .toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
