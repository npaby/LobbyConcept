import {useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card.tsx";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,} from "../components/ui/context-menu.tsx";

import {Button} from "../components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog.tsx";
import {useEffect, useState} from "react";
import {ScrollArea} from "../components/ui/scroll-area.tsx";
import {Textarea} from "../components/ui/textarea.tsx"
import {useLocation} from "react-router-dom";
import io from "socket.io-client";
import {useCookies} from "react-cookie";
export default function LobbyPage() {
    const {lobbyId} = useParams();
    const [cookies] = useCookies();
    const location = useLocation();
    const [lobby, setLobby] = useState(location.pathname.split('/')[2]);
    console.log(lobby);
    const socket = io("ws://localhost:3000", {
        auth: {
            token: cookies.accessToken
        },
        transports: ["websocket"],
        upgrade: false,
    });
    socket.emit("lobby:getLobby", lobbyId);
    useEffect(()=>{

        return ()=>{
            socket.off("lobby:updateLobby");
        }
    },[])
    const handleLeaveLobby = () => {
        socket.emit("lobby:leaveLobby", lobbyId);
    }
    return (
        <div className="flex grid-rows-1 gap-3 p-0 m-0">
            <div className="bg-amber-300 w-1/4 h-dvh">

                <div className="h-[15dvh] bg-cyan-300 m-4 rounded-3xl">
                    <div>
                        {lobbyId}
                    </div>
                    <div>
                        <Button> Report Lobby </Button>
                        <Button>Leave Lobby</Button>
                    </div>

                </div>
                <div className="h-[15dvh] bg-black m-4 rounded-3xl">

                </div>
                <div className="h-[15dvh] bg-black m-4 rounded-3xl">

                </div>
                <div className="h-[15dvh] bg-black m-4 rounded-3xl">

                </div>
                <div className="h-[15dvh] bg-black m-4 rounded-3xl">

                </div>
                <div className="h-[15dvh] bg-black m-4 rounded-3xl">

                </div>

            </div>
        </div>
    );
}
