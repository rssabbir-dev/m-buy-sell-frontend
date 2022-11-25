import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../../firebase/firebase.config';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userLoading, setUserLoading] = useState(true);

	const createUser = (email, password) => {
		setUserLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const updateUserProfileOnFirebase = (profileData) => {
		setUserLoading(true);
		return updateProfile(auth.currentUser, profileData);
	};

	const loginUser = (email, password) => {
		setUserLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};
	const providerLogin = (provider) => {
		setUserLoading(true);
		return signInWithPopup(auth, provider);
	};

	const logOut = () => {
		setUserLoading(true)
		return signOut(auth);
	};
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setUserLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	const authInfo = {
		user,
		userLoading,
		createUser,
		updateUserProfileOnFirebase,
		loginUser,
		providerLogin,
		logOut,
	};
	return (
		<>
			<AuthContext.Provider value={authInfo}>
				{children}
			</AuthContext.Provider>
		</>
	);
};

export default AuthProvider;
