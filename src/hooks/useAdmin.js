import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { useAuth } from './useAuth';

const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email && email !== 'tucorreo@admin.com');

export function isAdminUser(user) {
    if (!user?.email) return false;
    if (adminEmails.length > 0) {
        return adminEmails.includes(user.email.toLowerCase());
    }
    return false;
}

export function useAdmin() {
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            setIsAdmin(false);
            setChecking(false);
            return;
        }

        if (isAdminUser(user)) {
            setIsAdmin(true);
            setChecking(false);
            return;
        }

        let cancelled = false;

        (async () => {
            try {
                const snap = await getDoc(doc(db, 'usuarios', user.uid));
                if (!cancelled) {
                    setIsAdmin(snap.exists() && snap.data()?.rol === 'admin');
                }
            } catch {
                if (!cancelled) setIsAdmin(false);
            } finally {
                if (!cancelled) setChecking(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [user, authLoading]);

    const canAccessAdmin =
        isAdmin || (import.meta.env.DEV && Boolean(user));

    return {
        user,
        loading: authLoading || checking,
        isAdmin: canAccessAdmin,
    };
}
