import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

export async function ensureUserProfile(user) {
    if (!user) return;

    const userRef = doc(db, 'usuarios', user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        // USUARIO NUEVO
        await setDoc(userRef, {
            uid: user.uid,                     
            nombre: user.displayName || '',
            email: user.email || '',
            foto: user.photoURL || '',
            rol: 'cliente',                     
            fechaRegistro: serverTimestamp(),
            ultimoAcceso: serverTimestamp(),
        });
        console.log(`[Firestore] Perfil creado para el nuevo usuario: ${user.email}`);
    } else {
        // USUARIO EXISTENTE
        // Usamos updateDoc que es más óptimo y seguro que setDoc con merge para actualizar un solo campo
        await updateDoc(userRef, { 
            ultimoAcceso: serverTimestamp() 
        });
        console.log(`[Firestore] Último acceso actualizado para: ${user.email}`);
    }
}