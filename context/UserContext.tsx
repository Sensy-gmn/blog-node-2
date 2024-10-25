"use client";
import { Login, Register, User } from "@/interfaces/Users";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<{
    userData: User | null;
    login: (userData: Login) => Promise<void>;
    logout: () => Promise<void>;
    register: (userData: Register) => Promise<void>;
} | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [userData, setUserData] = useState<User | null>(null);

    useEffect(() => {
        let storedToken = null;
        storedToken = localStorage.getItem("token");
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            fetchUser(storedToken, decodedToken);
        } else {
            // setLoading(false);
        }
    }, []);

    const fetchUser = async (token: string, decodedToken: object) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/users/${decodedToken.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return setUserData(response.data);
        } catch (err) {
            return console.log(err);
        }
    };

    const login = async (userData: Login) => {
        try {
            const loggedInUser = await axios.post(
                `http://localhost:5000/auth/login`,
                userData
            );

            localStorage.setItem("token", loggedInUser.data.token);
            return router.push("/");
        } catch (err) {
            return err;
        }
    };

    const register = async (userData: Register) => {
        try {
            const registeredUser = await axios.post(
                `http://localhost:5000/auth/register`,
                userData
            );

            if (registeredUser.status !== 201) {
                return console.log("error");
            }

            if (registeredUser.status === 201) {
                return router.push("/login");
            }
        } catch (err) {
            return err;
        }
    };

    const logout = async () => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
            setUserData(null);
            return router.push("/");
        } else {
            alert("not logged in");
        }
    };

    return (
        <UserContext.Provider value={{ userData, login, logout, register }}>
            {children}
        </UserContext.Provider>
    );
};
