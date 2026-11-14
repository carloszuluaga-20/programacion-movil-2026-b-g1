
import { clearToken, getToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Student {
  id: number;
  name: string;
  email: string;
  program: string;
}

export interface AttendanceRecord {
  id: number;
  studentId: number;
  date: string;
  status: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  expiresIn: number;
  user: {
    email: string;
    role: string;
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        ...((token || getToken())
          ? { Authorization: `Bearer ${token || getToken()}` }
          : {}),
      },
    });
  } catch {
    throw new ApiError(
      'Unable to connect to the server. Check your internet connection.'
    );
  }

  if (response.status === 401) {
    // A failed login must not clear an existing session; protected calls must.
    if (endpoint !== '/api/auth/login') clearToken();
    throw new ApiError(
      'Your session is invalid or has expired. Please log in again.',
      401
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with HTTP ${response.status}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

export function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  return request<LoginResponse>(
    '/api/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }
  );
}

export function getStudents(
  token: string
): Promise<Student[]> {
  return request<Student[]>(
    '/api/students',
    {},
    token
  );
}

export function getAttendance(
  token: string
): Promise<AttendanceRecord[]> {
  return request<AttendanceRecord[]>(
    '/api/attendance',
    {},
    token
  );
}
