import { useEffect, useState } from "react";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthContext } from "./AuthContext"; // Importamos el canal que creamos recién

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
});
return () => unsubscribe();
}, []);

const logout = () => signOut(auth);

return (
<AuthContext.Provider value={{ user, logout, loading }}>
    {!loading && children}
</AuthContext.Provider>
);
};