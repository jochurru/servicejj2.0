import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useAuth } from './useAuth';

export function useAdmin() {
    const { user, loading: authLoading } = useAuth();
    const [role, setRole] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setRole(null);
            setChecking(false);
            return;
        }

        let cancelled = false;

        (async () => {
            try {
                const snap = await getDoc(doc(db, 'usuarios', user.uid));
                if (!cancelled) {
                    const data = snap.data();
                    const isAdminUser =
                        data?.role === 'admin' || data?.rol === 'admin';
                    setRole(isAdminUser ? 'admin' : data?.role ?? data?.rol ?? 'client');
                }
            } catch {
                if (!cancelled) setRole('client');
            } finally {
                if (!cancelled) setChecking(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [user, authLoading]);

    const isAdmin = role === 'admin';

    return {
        user,
        role,
        loading: authLoading || checking,
        isAdmin,
    };
}
