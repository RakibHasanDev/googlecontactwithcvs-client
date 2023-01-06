import React, { createContext } from 'react';
import {getAuth,signInWithPopup,  } from 'firebase/auth';
import app from '../firebase.config.js/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({ children }) => {

    const providerLogin = (provider) => {
    
        return signInWithPopup(auth, provider);

    };
    const authInfo = {
       
        providerLogin
        
    }
    return (
        <div>
            {/* <AuthProvider.Provider value={authInfo}>
                {children}
            </AuthProvider.Provider> */}
            <AuthContext.Provider value={authInfo}>
                {children}
           </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;