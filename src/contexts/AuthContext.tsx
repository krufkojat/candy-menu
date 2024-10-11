import React, { createContext, Dispatch, useContext, useReducer } from "react";

interface User {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
}

interface LoginAction {
  type: "LOGIN";
}

interface LogoutAction {
  type: "LOGOUT";
}

type AuthAction = LoginAction | LogoutAction;

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      throw new Error("Invalid action type");
  }
};

const AuthContext = createContext<AuthState | null>(null);
const AuthDispatchContext = createContext<Dispatch<AuthAction> | null>(null);

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

const useAuthDispatch = () => {
  const authDispatchContext = useContext(AuthDispatchContext);

  if (!authDispatchContext) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }

  return authDispatchContext;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: {
      username: "admin",
      password: "admin",
    },
  });

  return (
    <AuthContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export { useAuth, useAuthDispatch };
