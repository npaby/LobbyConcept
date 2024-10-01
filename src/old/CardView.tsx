import * as React from 'react';
import {Card, CardContent, CardHeader, CardTitle,} from "../components/ui/card.tsx";
import {Button} from "../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {ScrollArea} from "../components/ui/scroll-area.tsx";
import {Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogTrigger, DialogHeader} from "../components/ui/dialog.tsx";
const CardView = ({table}) => {
    const filteredRows = table.getPaginationRowModel().rows;
    const navigate = useNavigate();
    const cmosh = "CMOSH".split("");

    const renderMembers = (members) => {
        const [selectedMember, setSelectedMember] = React.useState(null);

        const handleClickOpen = (member) => {
            setSelectedMember(member);
        };
        const handleOnClose = () => {
            setSelectedMember(null);
        };
        return (
            <div className="flex flex-row justify-center">
                {cmosh.map((char, index) => {
                    const matchingMember = members.find(
                        (member) => member.user_role.slice(0, 1).toUpperCase() === char.toUpperCase()
                    );
                    return (
                        <Dialog key={`${char}-${index}`}>
                            <DialogTrigger asChild>
                                <div
                                    className={`inline-block border-solid w-12 h-12 border-2 rounded-full align-middle flex items-center justify-center ${matchingMember ? 'bg-red-500' : 'bg-blue-500'} text-white cursor-pointer`}
                                    onClick={() => matchingMember && handleClickOpen(matchingMember) && selectedMember !== null}
                                >
                                    {char}
                                </div>
                            </DialogTrigger>
                            <DialogContent className={"bg-white w-64"}>
                                <DialogHeader>
                                    <DialogTitle>Member Information</DialogTitle>

                                </DialogHeader>
                                <div>
                                    User ID: {selectedMember?.user_id}
                                </div>
                                <div>
                                    User Role: {selectedMember?.user_role}
                                </div>
                                <Button className={"mt-4"}>Add Friend</Button>
                                <DialogClose asChild>
                                    <Button className={" w-full"} onClick={() => handleOnClose()}>Close</Button>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    );
                })}
            </div>
        );
    };
    {
        /*
                    <div className="flex flex-row justify-center">
                        {cmosh.map((char, index) => {
                            const matchingMember = members.find(member =>
                                member.user_role.slice(0, 1).toUpperCase() === char.toUpperCase()
                            );
                            return matchingMember ? (
                                <div key={`${char}-${matchingMember.user_role}`}
                                     className="inline-block border-solid bg-blue-500 w-12 h-12 border-2 rounded-full align-middle flex items-center justify-center bg-blue-900 text-white">
                                    {char}
                                </div>
                            ) : (
                                <div key={`${char}-nonexistent`}
                                     className="inline-block border-solid bg-blue-500 w-12 h-12 border-2 rounded-full align-middle flex items-center justify-center bg-red-500 text-black">
                                    {char}
                                </div>
                            );
                        })}
                    </div>
       */
    }
    return (
        <ScrollArea className="h-[70lvh] p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredRows.map((row) => {
                    const lobby = row.original;
                    return (
                        <Card key={lobby.Lobby_Id} className="shadow-md">
                            <CardHeader>
                                <CardTitle className={"mt-4"}>{lobby.Lobby_Name}</CardTitle>
                                <div className="text-sm m-2 text-gray-500">{lobby.Lobby_Id}</div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl text font-black">
                                    {lobby.Rank}
                                </div>
                                <div className={"mt-4 mb-4"}>
                                    {renderMembers(lobby.Members)}
                                </div>
                                <Button className="w-full text-white bg-blue-500 hover:bg-"
                                        onClick={() =>
                                            navigate(`/lobby/${row.original.Lobby_Id}`)
                                        }>
                                    Join Lobby
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </ScrollArea>
    );
};

export default CardView;
