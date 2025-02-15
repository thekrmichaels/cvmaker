/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { AuthContext } from "../hooks/useContexts";
import { Supabase } from "../../env.js";
import useLicense from "../hooks/useLicense";

const supabase = createClient(Supabase.supabaseUrl, Supabase.supabaseKey);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const lastUserRef = useRef(null);
  const license = useLicense(user?.email);

  const clearUser = useCallback(() => {
    lastUserRef.current = null;

    setUser(null);
  }, []);

  const refreshUser = useCallback(async (userData) => {
    if (JSON.stringify(lastUserRef.current) !== JSON.stringify(userData)) {
      lastUserRef.current = { ...userData };

      setUser(lastUserRef.current);
    }
  }, []);

  const userSession = useCallback(() => {
    return supabase.auth.getSession().then(({ data, error }) => {
      if (error) throw new Error(`${error.name}: ${error.message}`);

      refreshUser({
        ...data.session.user,
        userAccessToken: data.session.provider_token,
      });
    });
  }, [refreshUser]);

  const initializeAuth = useCallback(async () => {
    await userSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") await refreshUser(session.user);
        if (event === "SIGNED_OUT") clearUser();
      },
    );

    return () => authListener.subscription.unsubscribe();
  }, [clearUser, refreshUser, userSession]);

  const logout = useCallback(() => {
    supabase.auth
      .signOut()
      .then(clearUser)
      .catch((error) => console.error(`${error.name}: ${error.message}`));
  }, [clearUser]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const contextValues = useMemo(
    () => ({
      user: { ...user, license },
      isAuthenticated: !!user,
      loginWithRedirect,
      logout,
    }),
    [license, logout, user],
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

function loginWithRedirect() {
  return supabase.auth
    .signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/cvmaker`,
        scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
      },
    })
    .catch((error) => console.error(`${error.name}: ${error.message}`));
}
