import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth, db } from "../Firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "52222974480-qs529n4efq385qur5joj4pafqqoqvor7.apps.googleusercontent.com",
    expoClientId:
      "52222974480-nj9mk5hhfkb9sdl8dudkrs595s09g6ve.apps.googleusercontent.com",
    androidClientId:
      "52222974480-46lee6fe27tlecgqt32t99clnf4ph06o.apps.googleusercontent.com",
    iosClientId:
      "52222974480-drl1f7t596e1hj8cla8r1hb608a6jdbb.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    useProxy: true,
    permissions: ["public_profile", "email", "gender", "location"],
  });

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    await promptAsync()
      .then(async () => {
        if (response?.type === "success") {
          const accessToken = response.authentication.accessToken;
          const idToken = response.authentication.idToken;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({ user, loading, error, signInWithGoogle, logout }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
