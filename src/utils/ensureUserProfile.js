import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export async function ensureUserProfile(user) {
    if (!user) return;

    const userRef = doc(db, 'usuarios', user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await setDoc(userRef, {
            nombre: user.displayName || '',
            email: user.email || '',
            foto: user.photoURL || '',
            role: 'client',
            fechaRegistro: serverTimestamp(),
            ultimoAcceso: serverTimestamp(),
        });
    } else {
        await setDoc(userRef, { ultimoAcceso: serverTimestamp() }, { merge: true });
    }
}
