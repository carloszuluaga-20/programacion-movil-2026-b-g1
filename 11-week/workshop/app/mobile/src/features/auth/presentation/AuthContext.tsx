
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { container } from "../../../core/di/container";
import { registerUnauthorizedHandler } from "../../../core/network/apiFetch";
import { AuthError, NetworkError } from "../../../core/errors";
import { strings } from "./strings";

type AuthState = {
  status: "idle" | "loading" | "authenticated" | "error";
  errorMessage?: string;
};

type AuthContextValue = {
  state: AuthState;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const demoMode = process.env.EXPO_PUBLIC_DEMO_MODE === "true";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    status: "idle",
  });

  const logout = useCallback(async () => {
    if (demoMode) {
      setState({ status: "idle" });
      return;
    }

    await container.auth.logout.execute();
    setState({ status: "idle" });
  }, []);

  useEffect(() => {
    if (demoMode) {
      setState({ status: "authenticated" });
      return;
    }

    (async () => {
      const token =
        await container.auth.repository.getStoredToken();

      setState({
        status: token ? "authenticated" : "idle",
      });
    })();
  }, []);

  useEffect(() => {
    registerUnauthorizedHandler(() => {
      if (!demoMode) {
        setState({ status: "idle" });
      }
    });
  }, []);

  const login = useCallback(
    async (username: string, password: string) => {
      if (demoMode) {
        setState({ status: "authenticated" });
        return;
      }

      setState({ status: "loading" });

      try {
        await container.auth.login.execute(
          username,
          password
        );

        setState({ status: "authenticated" });
      } catch (err) {
        const message =
          err instanceof AuthError
            ? strings.errors.invalidCredentials
            : err instanceof NetworkError
              ? strings.errors.generic
              : strings.errors.generic;

        setState({
          status: "error",
          errorMessage: message,
        });
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        state,
        isAuthenticated: state.status === "authenticated",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return ctx;
}
