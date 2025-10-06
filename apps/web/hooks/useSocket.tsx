import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YTg2NWY2Ny0wOTBkLTRjZjEtOGIzNy0yN2UzMTYzY2ZjNjIiLCJpYXQiOjE3NTkzMzgzMjV9.fDpGy_2Vkjfs81Z7YWwhxkYfXPSS2uQzcW3gIrIKtqI`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    },[]);

    return {
        socket,
        loading
    }
}