"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/context/UserContext";

import { useContext, useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");

    const { register } = useContext(UserContext);

    const handlesubmit = () => {
        register({ email, password, first_name, last_name });
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Register</h1>

            <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    handlesubmit();
                }}
            >
                <Input
                    type="text"
                    placeholder="First Name"
                    value={first_name}
                    required
                    onChange={(e) => setFirst_name(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={last_name}
                    required
                    onChange={(e) => setLast_name(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
}
