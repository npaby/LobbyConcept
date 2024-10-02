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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/ui/dialog.tsx";
import {useEffect} from "react";
export default function LobbyPage() {
    // const [socket, setSocket] = React.useState(null);

    const [cookies] = useCookies();
    const [lobbies, setLobbies] = React.useState([]);

    const socket = io("ws://localhost:3000", {
        auth: {
            token: cookies.accessToken
        },
        transports: ["websocket"],
        upgrade: false,
    });

    useEffect(() => {

        const socket = io("ws://localhost:3000", {
            auth: {
                token: cookies.accessToken,
            },
            transports: ["websocket"],
            upgrade: false,
        });
        socket.on("connect", () => {
            console.log("Connected to the server");
            socket.emit("lobby:getLobbies");
        });
        socket.on("lobby:getLobbies", (msg) => {
            console.log("Received lobbies:", msg);
            setLobbies(
                msg.map((lobby) => ({
                    roomName: lobby.roomName,
                    lobbyId: lobby._id,
                    lobbyRank: lobby.rank,
                    members: lobby.members,
                }))
            );
        });

        return () => {
            socket.off("connect");
            socket.off("lobby:getLobbies");
            socket.off("lobby:createLobby");

        };
    }, []);
    useEffect(() => {
        socket.on("lobby:createLobby", (msg) => {
            console.log("Lobby created:", msg);
            setLobbies((prevLobbies) => [
                ...prevLobbies,
                {
                    roomName: msg.roomName,
                    lobbyId: msg._id,
                    lobbyRank: msg.rank,
                    members: msg.members,
                },
            ]);
        });

    },[lobbies])

    // {lobbyName: 'Test Lobby'}
    // socket.emit('createLobby', {lobbyName: 'Test Lobby'});
    return (
        <div>
            <div className="mb-5">
                <Label className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Lobbies Management
                </Label>
            </div>
            {/*// Header*/}
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
                {/*<Button>*/}
                {/*    Create New Lobby*/}
                {/*</Button>*/}

                <Dialog>
                    <DialogTrigger>
                        <Button> Create New Lobby</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <h1>Create Lobby</h1>
                            <DialogDescription>
                                Please fill out the form below to create a new lobby.
                            </DialogDescription>
                        </DialogHeader>

                        <div>
                            <div className="mb-4">
                                <Label className="mb-10">Lobby Name</Label>
                                <input className="w-full h-12" type="text" placeholder="Enter lobby name"/>
                            </div>

                            <div className="mb-4">
                                <Label>Rank</Label>
                                {/*<Select>*/}
                                {/*    <SelectTrigger className="w-full mt-2  h-12">*/}
                                {/*        <SelectValue placeholder="Select a view" />*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent>*/}
                                {/*        <SelectGroup>*/}
                                {/*            <SelectLabel>Select view for data</SelectLabel>*/}
                                {/*            <SelectItem value="DataView">Data View</SelectItem>*/}
                                {/*            <SelectItem value="CardView">Card View</SelectItem>*/}
                                {/*        </SelectGroup>*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}
                                <input className="w-full mt-2  h-12" type="text" placeholder="Enter Your Rank"/>
                            </div>
                            {/* Todo: Add realtime inviting friends in create lobby - member section.*/}
                            <div className="mb-4">
                                <Label>Members</Label>
                                <input className="w-full mt-2  h-12" type="text" placeholder="Enter members"/>
                            </div>
                            <div className="mb-4">
                                <Label>Role (Yours)</Label>
                                {/*<Select>*/}
                                {/*    <SelectTrigger className="w-full mt-2  h-12">*/}
                                {/*        <SelectValue placeholder="Select a view" />*/}
                                {/*    </SelectTrigger>*/}
                                {/*    <SelectContent>*/}
                                {/*        <SelectGroup>*/}
                                {/*            <SelectLabel>Select view for data</SelectLabel>*/}
                                {/*            <SelectItem value="DataView">Data View</SelectItem>*/}
                                {/*            <SelectItem value="CardView">Card View</SelectItem>*/}
                                {/*        </SelectGroup>*/}
                                {/*    </SelectContent>*/}
                                {/*</Select>*/}
                                <input className="w-full mt-2  h-12" type="text" placeholder="Enter Your Role"/>
                            </div>

                            <Button className="w-full  h-12 text-white bg-blue-500 hover:bg-blue-600"
                            onClick = {() => {
                                socket.emit('lobby:createLobby', {roomName: 'Test Lobby'})
                            }}>
                                Create Lobby
                            </Button>
                        </div>

                    </DialogContent>
                </Dialog>
            </div>
            {/*// Content*/}
            <div>
                <ScrollArea className="overflow-auto w-dvh h-[70lvh] bg-amber-300 p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {/*<Card className="shadow-md h-96">*/}
                        {/*    <CardHeader>*/}
                        {/*        <CardTitle className={"mt-4"}>LobbyName</CardTitle>*/}
                        {/*        <div className="text-sm m-2 text-gray-500">LobbyId</div>*/}
                        {/*    </CardHeader>*/}
                        {/*    <CardContent>*/}
                        {/*        <div className="text-3xl text font-black">*/}
                        {/*            LobbyRank*/}
                        {/*        </div>*/}
                        {/*        <div className={"mt-4 mb-4"}>*/}
                        {/*            RenderMembers*/}
                        {/*        </div>*/}
                        {/*        <Button className="w-full text-white bg-blue-500 hover:bg-"*/}
                        {/*            // onClick={() =>*/}
                        {/*            // navigate(`/lobby/${row.original.Lobby_Id}`)}*/}
                        {/*        >*/}
                        {/*            Join Lobby*/}
                        {/*        </Button>*/}
                        {/*    </CardContent>*/}
                        {/*</Card>*/}
                        {
                            lobbies.map((lobby) =>
                                <Card className="shadow-md h-96" id={lobby.lobbyId}>
                                    <CardHeader>
                                        <CardTitle className="mt-4">
                                            {lobby?.roomName || 'Lobby Name'}
                                        </CardTitle>
                                        <div className="text-sm m-2 text-gray-500" >
                                            {lobby.lobbyId || 'Lobby Id'  }
                                        </div>
                                        <div className="text-sm m-2 text-gray-500">
                                            {lobby.lobbyRank || 'Lobby Rank'}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {/*<div className="text-3xl text font-black">*/}
                                        {/*    {lobby.role || 'Role'}*/}
                                        {/*</div>*/}
                                        <div className={"mt-4 mb-4"}>
                                            {/*RenderMembers*/}
                                        </div>
                                        <Button className="w-full text-white bg-blue-500 hover:bg-"
                                            // onClick={() =>
                                            // navigate(`/lobby/${row.original.Lobby_Id}`)}
                                        >
                                            Join Lobby
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
