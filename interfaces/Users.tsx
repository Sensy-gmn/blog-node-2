export interface User {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    id: string;
    age: number;
}

export interface Login {
    email: string;
    password: string;
}

export interface Register {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}
