export interface JwtRequest {
  username: string;
  password: string;
}

export interface JwtResponse {
  jwttoken: string;
}

export interface TokenPayload {
  sub: string;
  nombre: string;
  role: string;
  iat: number;
  exp: number;
}