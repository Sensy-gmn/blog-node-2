"use client";

import PostCreate from "@/components/PostCreate";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UserContext } from "@/context/UserContext";
import { Post } from "@/interfaces/Posts";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState<Post[]>([]);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/posts");
                setData(res.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, []);
    console.log("data:", userData);

    return (
        <main className="flex flex-col justify-between">
            {userData ? <PostCreate /> : null}
            {data.map((item: Post) => (
                <Card key={item.id} className="max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex justify-between">
                            {item.title}

                            {userData?.role === "admin" && (
                                <Button variant="destructive">
                                    Supprimer le post
                                </Button>
                            )}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>contenu :{item.body}</div>
                        <div className="text-sm text-gray-500">
                            posté par {item.userId.first_name}{" "}
                            {item.userId.last_name}
                        </div>
                    </CardContent>
                    <CardFooter className="gap-2 flex flex-col">
                        <div>{item.comments.length} commentaires :</div>
                        <div className="flex flex-col gap-2">
                            {item.comments.map((comment, index) => (
                                <p key={index}>{comment.content}</p>
                            ))}
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </main>
    );
}
