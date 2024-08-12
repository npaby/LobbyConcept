import React from 'react';
import {Card, CardDescription, CardContent, CardHeader, CardTitle,} from "./components/ui/card";
import {Badge} from "./components/ui/badge";
import {Button} from "./components/ui/button";
import {useNavigate} from "react-router-dom";
import {ScrollArea} from "./components/ui/scroll-area";
const CardView = ({table}) => {
    const filteredRows = table.getPaginationRowModel().rows;
    const navigate = useNavigate();
    const renderMembers = (members) => {
        return members.map((member) => (
            <div key={member.user_id} className="mb-2">
                <div className="grid grid-cols-[minmax(50px,auto)_1fr]">
                    <div className={"text-right"}>
                        {member.user_id && member.user_owner ? (
                            <b>{member.user_id}</b>
                        ) : (
                            <span>{member.user_id}</span>
                        )}
                    </div>
                    <Badge className="ml-2">{member.user_role}</Badge>
                </div>
            </div>

        ));
    };

    return (
        <ScrollArea className="h-[70lvh] p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {filteredRows.map((row) => {
                    const lobby = row.original;
                    return (
                        <Card key={lobby.Lobby_Id} className="shadow-md">
                            <CardHeader>
                            <CardTitle className={"mt-4"}>{lobby.Lobby_Name}</CardTitle>
                                <div className="text-sm m-2 text-gray-500">{lobby.Lobby_Id}</div>
                            </CardHeader>
                            <CardContent>
                                {/*
                                <CardDescription>
                                    <div className="text-3xl text font-black">
                                        {lobby.Lobby_Id}
                                    </div>
                                    <div className={"mt-8 h-44 "}>
                                        {renderMembers(lobby.Members)}
                                    </div>
                                </CardDescription>
                                */}
                                <div className="text-3xl text font-black">
                                    {lobby.Rank}
                                </div>
                                <div className={"mt-8 h-44 "}>
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
