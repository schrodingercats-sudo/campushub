import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, DocumentSnapshot } from 'firebase/firestore';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            // Fast path: if no user, definitely not admin, stop loading
            if (!currentUser || !currentUser.email) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            // Super Admin Bypass - Explicitly allow this email immediately
            if (currentUser.email === 'pratham.solanki30@gmail.com') {
                setIsAdmin(true);
                setLoading(false);

                // Background: Ensure they exist in DB (don't await)
                const adminRef = doc(db, 'admins', currentUser.email);
                getDoc(adminRef).then((snap: DocumentSnapshot) => {
                    if (!snap.exists()) {
                        setDoc(adminRef, {
                            email: currentUser.email!,
                            addedAt: new Date().toISOString(),
                            role: 'super_admin'
                        });
                    }
                });
                return;
            }

            // Normal Admin Check with Timeout
            try {
                const checkAdminStatus = async () => {
                    const adminRef = doc(db, 'admins', currentUser.email!);
                    const adminSnap = await getDoc(adminRef);
                    return adminSnap.exists();
                };

                const timeoutPromise = new Promise<boolean>((_, reject) =>
                    setTimeout(() => reject(new Error("Request timed out")), 5000)
                );

                const isAdminUser = await Promise.race([checkAdminStatus(), timeoutPromise]);
                setIsAdmin(isAdminUser);

            } catch (error) {
                console.error("Error/Timeout checking admin status:", error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
