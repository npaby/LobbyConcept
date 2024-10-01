import * as React from "react";
import {Label} from "../components/ui/label.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "../components/ui/select.tsx";
import { Button } from "../components/ui/button.tsx";
import {ScrollArea} from "../components/ui/scroll-area.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "../components/ui/card.tsx";
import io from "socket.io-client";
import {useCookies} from "react-cookie";
export default function LobbyPage() {
    // const [socket, setSocket] = React.useState(null);

    const [cookies] = useCookies();

    const socket = io("ws://localhost:3000",{
        auth: {
            token: cookies.accessToken
        },
        transports: ["websocket"],
        upgrade: false,
        // reconnectionAttempts: Infinity,
        // reconnectionDelay: 1000,
        // rejectUnauthorized: true
    });
    socket.on("connect", () => {
        console.log("Connected to the server");
    })
    socket.emit('message', 'Hello from client');
    socket.on('message', (msg) => {
        console.log('Received message from server:', msg);
    })
    return (
        <div className="">
            <div className="mb-5">
                <Label className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Lobbies Management
                </Label>
            </div>
            <div className="flex-col-2 flex justify-items-end">
                <Select >
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a view" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select view for data</SelectLabel>
                        <SelectItem value="DataView">Data View</SelectItem>
                        <SelectItem value="CardView">Card View</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
                <Button>
                    Create New Lobby
                </Button>
            </div>
            <div>
                <ScrollArea className="overflow-auto w-dvh h-[70lvh] bg-amber-300 p-5" >
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <Card className="shadow-md h-96">
                            <CardHeader>
                                <CardTitle className={"mt-4"}>LobbyName</CardTitle>
                                <div className="text-sm m-2 text-gray-500">LobbyId</div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl text font-black">
                                    LobbyRank
                                </div>
                                <div className={"mt-4 mb-4"}>
                                    RenderMembers
                                </div>
                                <Button className="w-full text-white bg-blue-500 hover:bg-"
                                    // onClick={() =>
                                    // navigate(`/lobby/${row.original.Lobby_Id}`)}
                                >
                                    Join Lobby
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
