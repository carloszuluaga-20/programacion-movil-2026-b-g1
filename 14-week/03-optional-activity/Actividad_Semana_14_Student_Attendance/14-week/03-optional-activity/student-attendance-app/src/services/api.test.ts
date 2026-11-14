
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ApiError,
  getAttendance,
  getStudents,
  login,
} from './api';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('Student Attendance API', () => {
  it('sends login credentials and receives a JWT', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        token: 'test-jwt-token',
        tokenType: 'Bearer',
        expiresIn: 3600,
        user: {
          email: 'teacher@example.com',
          role: 'TEACHER',
        },
      }),
    });

    vi.stubGlobal('fetch', mockFetch);

    const result = await login(
      'teacher@example.com',
      'test-password'
    );

    expect(result.token).toBe('test-jwt-token');
    expect(result.user.role).toBe('TEACHER');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/login'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'teacher@example.com',
          password: 'test-password',
        }),
      })
    );
  });

  it('sends the JWT when requesting students', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [
        {
          id: 1,
          name: 'Ana Martinez',
          email: 'ana@example.com',
          program: 'Systems Engineering',
        },
      ],
    });

    vi.stubGlobal('fetch', mockFetch);

    const students = await getStudents('valid-token');

    expect(students).toHaveLength(1);
    expect(students[0].name).toBe('Ana Martinez');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/students'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer valid-token',
        }),
      })
    );
  });

  it('handles expired or invalid tokens with HTTP 401', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
      })
    );

    await expect(
      getStudents('expired-token')
    ).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
      message: expect.stringContaining('log in again'),
    });
  });

  it('handles network or offline errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(
        new TypeError('Failed to fetch')
      )
    );

    await expect(
      getStudents('valid-token')
    ).rejects.toThrow(
      'Unable to connect to the server'
    );
  });

  it('retrieves attendance records with authentication', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [
        {
          id: 1,
          studentId: 1,
          date: '2026-11-07',
          status: 'PRESENT',
        },
      ],
    });

    vi.stubGlobal('fetch', mockFetch);

    const attendance = await getAttendance('valid-token');

    expect(attendance).toHaveLength(1);
    expect(attendance[0].status).toBe('PRESENT');

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/attendance'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer valid-token',
        }),
      })
    );
  });

  it('returns an ApiError for other HTTP failures', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    try {
      await getStudents('valid-token');
      throw new Error('Expected the request to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error).toMatchObject({
        status: 500,
        message: 'Request failed with HTTP 500',
      });
    }
  });
});
