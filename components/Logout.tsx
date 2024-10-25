import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Logout() {
    const { logout } = useContext(UserContext);
    const router = useRouter();

    const handleLogout = () => {
        logout();

        router.push("/");
    };

    return <Button onClick={handleLogout}>Logout</Button>;
}

//--------------TODO--------------//
//rediriger dans XXX secondes...
