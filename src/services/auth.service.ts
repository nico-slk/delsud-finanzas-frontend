const API_URL = "http://localhost:3000";

export interface LoginResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    nombre: string;
    rol: string;
    fechaCreacion: string;
    token: string;
  };
}

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const isOk = res.ok;
    const data = await res.json();

    if (!isOk) {
      throw new Error(data.error || "Registration failed");
    }
    return data;
  }

  static async register(
    email: string,
    password: string,
    nombre: string,
    rol: string
  ) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, nombre, rol }),
    });

    const isOk = res.ok;
    const data = await res.json();

    if (!isOk) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  }
}
