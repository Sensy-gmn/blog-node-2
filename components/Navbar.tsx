"use client";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useContext } from "react";
import Logout from "./Logout";

export default function Navbar() {
    const { userData } = useContext(UserContext);
    return (
        <nav>
            <ul className="flex flex-row gap-2">
                {userData ? (
                    <>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
