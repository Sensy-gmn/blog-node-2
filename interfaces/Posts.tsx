export interface Comment {
    id: number;
    content: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: {
        first_name: string;
        last_name: string;
        email: string;
        age: number;
        id: number;
    };
    comments: Comment[];
}
