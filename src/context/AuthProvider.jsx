import { useEffect, useState } from 'react';
import { auth } from '../services/firebaseConfig';
import { getRedirectResult, onAuthStateChanged, signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { ensureUserProfile } from '../utils/ensureUserProfile';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRedirectResult(auth)
            .then(async (result) => {
                if (result?.user) await ensureUserProfile(result.user);
            })
            .catch((err) => {
                console.error('Error tras redirect de Google:', err);
            });
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    await ensureUserProfile(currentUser);
                } catch (err) {
                    // ESTA LÍNEA ES CLAVE: Te va a decir si Firebase te rechaza por permisos o reglas
                    console.error('¡ATENCIÓN! Error real de Firestore al sincronizar perfil:', err);
                }
            }
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
