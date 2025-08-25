import React, { createContext, useState, useEffect, type ReactNode} from "react";
import { jwtDecode } from 'jwt-decode';
import type { AuthContextType } from "../../types/auth/AuthContext";
import type { AuthUser } from "../../types/auth/AuthUser";
import { ObrišiVrijednostPoKljuču, PročitajVrijednostPoKljuču, SačuvajVrijednostPoKljuču } from "../../helpers/local_storage";
import type { JwtTokenClaims } from "../../types/auth/JwtTokenClaims";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeJwt = (token: string): JwtTokenClaims | null => {
    try {
        const decoded = jwtDecode<JwtTokenClaims>(token);

        if(decoded.user_id && decoded.username && decoded.uloga) {
            return {
                user_id: decoded.user_id,
                username: decoded.username,
                uloga: decoded.uloga
            };
        }

        return null;
    } catch (error) {
        console.error('Greska pri dekodiranju tokena');
        return null;
    }
};

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp ? decoded.exp < currentTime : false;
    } catch {
        return true;
    }
};

export const AuthProvider: React.FC< {children: ReactNode }> = ( { children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedToken = PročitajVrijednostPoKljuču("authToken");

        if(savedToken) {
            if(isTokenExpired(savedToken)){
                ObrišiVrijednostPoKljuču("authToken");
                setIsLoading(false);
                return;
            }

            const claims = decodeJwt(savedToken);
            if(claims) {
                setToken(savedToken);
                setUser({
                    user_id: claims.user_id,
                    username: claims.username,
                    uloga: claims.uloga,
                });
            }
        }

        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        const claims = decodeJwt(token);

        if(claims && !isTokenExpired(token)) {
            setToken(token);
            setUser({
                user_id: claims.user_id,
                username: claims.username,
                uloga: claims.uloga,
            });

            SačuvajVrijednostPoKljuču("authToken", token);
        } else {
            console.error('Nevazeci ili istekao token');
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        ObrišiVrijednostPoKljuču("authToken");
    };

    const isAuthenticated = !!user && !!token;

    const value: AuthContextType = {
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isLoading
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;