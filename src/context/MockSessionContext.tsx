import React, { createContext, useContext, useMemo, useState } from "react";
import {
  MOCK_USERS,
  MockUser,
  getUserByRole,
} from "../mocks/appData";
import type { AppRole } from "../mocks/appData";

type SessionContextValue = {
  currentUser: MockUser;
  setCurrentUserByRole: (role: AppRole) => void;
  setCurrentUserByEmail: (email: string) => void;
  signOut: () => void;
};

const MockSessionContext = createContext<SessionContextValue | null>(null);

export const MockSessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<MockUser>(
    getUserByRole("student") ?? MOCK_USERS[0]
  );

  const value = useMemo<SessionContextValue>(
    () => ({
      currentUser,
      setCurrentUserByRole: (role) => {
        const nextUser = getUserByRole(role);
        if (nextUser) setCurrentUser(nextUser);
      },
      setCurrentUserByEmail: (email) => {
        const nextUser = MOCK_USERS.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );
        if (nextUser) setCurrentUser(nextUser);
      },
      signOut: () => {
        const fallbackUser = getUserByRole("student") ?? MOCK_USERS[0];
        setCurrentUser(fallbackUser);
      },
    }),
    [currentUser]
  );

  return (
    <MockSessionContext.Provider value={value}>
      {children}
    </MockSessionContext.Provider>
  );
};

export const useMockSession = () => {
  const context = useContext(MockSessionContext);
  if (!context) {
    throw new Error("useMockSession must be used inside MockSessionProvider");
  }
  return context;
};
