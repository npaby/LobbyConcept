import {useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./components/ui/card";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,} from "./components/ui/context-menu";

import {Button} from "./components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./components/ui/dialog";
import {useState} from "react";
import {ScrollArea} from "./components/ui/scroll-area";
import {Textarea} from "./components/ui/textarea"
import {useLobbies} from "./LobbyContext";

export default function LobbyPage() {
    const {lobbyId} = useParams();
    const {lobbies} = useLobbies();
    const lobby = lobbies.find(
        lobby => lobby.Lobby_Id === Number(lobbyId)
    );

    if (!lobby) {
        return <div>Lobby not found</div>;
    }
    const members = [...lobby.Members];
    while (members.length < 5) {
        members.push({user_id: null, user_owner: false});
    }

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <div className="flex grid-rows-1 gap-3 p-0 m-0">
            <Card className="w-1/3">
                <CardHeader>
                    <CardTitle>Lobby {lobby.Lobby_Id}</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-1 gap-4">
                    {members.map((member, index) => (
                        <ContextMenu key={index}>
                            <ContextMenuTrigger>
                                <Card className={`h-28 m-2 ${member.user_id ? "bg-white" : "bg-gray-100"}`}>
                                    <CardHeader>
                                        <CardTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                            {member.user_id || "Free Slot"}
                                        </CardTitle>
                                        {member.user_id && (
                                            <CardDescription className="text-blue-400 font-bold">
                                                {member.user_role}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                </Card>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        if (!member.user_id) {
                                            setDialogIsOpen(true);
                                        }
                                    }}
                                >
                                    {/*--//TODO: If current user is owner, allow user to kick--*/}
                                    {member.user_id ? "Kick" : "Invite"}
                                </ContextMenuItem>

                                {member.user_id && (
                                    <>
                                        <ContextMenuItem>{member.user_id}</ContextMenuItem>
                                        <ContextMenuItem>Add Friend</ContextMenuItem>
                                        <ContextMenuItem>Report</ContextMenuItem>
                                    </>
                                )}
                            </ContextMenuContent>
                        </ContextMenu>
                    ))}
                </div>
            </Card>
            <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                <DialogContent className="bg-white w-64">
                    <DialogHeader className="pb-2">
                        <DialogTitle>Invite User</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        You are about to invite a user to the lobby.
                    </DialogDescription>
                    <DialogFooter className="justify-between">
                        <Button variant="outline" className="bg-blue-400" onClick={() => setDialogIsOpen(false)}>
                            Confirm
                        </Button>
                        <Button variant="secondary" className="bg-amber-300" onClick={() => setDialogIsOpen(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/*<Card className="w-full bg-black p-0">*/}
            {/*        <CardHeader>*/}
            {/*            /!*<CardTitle>Chatroom</CardTitle>*!/*/}
            {/*        </CardHeader>*/}
            {/*        <CardContent className={"bg-amber-400"}>*/}
            {/*            <ScrollArea className={"h-96 p-5"}>*/}
            {/*                lolorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,  rem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,*/}
            {/*            </ScrollArea>*/}
            {/*            <Textarea className={" text-black mt-6 h-2"} placeholder="Type your message here." />*/}
            {/*            <Button className="mt-4 w-full bg-blue-400 text-white">Send</Button>*/}
            {/*        </CardContent>*/}
            {/*</Card>*/}

            <Card className="w-2/3  flex flex-col">
                <CardHeader className="p-5 m-0">
                    <CardTitle>Chatroom</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-5">
                    <ScrollArea className="h-128">
                        <div>
                            {Array(20).fill("lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis, lectus sed posuere tincidunt,").map((text, index) => (
                                <p key={index}>{text}</p>
                            ))}
                        </div>
                    </ScrollArea>
                    <Textarea className="mt-4 h-12 text-black" placeholder="Type your message here."/>
                    <Button className="mt-2 w-full bg-blue-400 text-white">Send</Button>
                </CardContent>
            </Card>
        </div>
    );
}
