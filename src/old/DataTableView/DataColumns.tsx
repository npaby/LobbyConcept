import {ColumnDef} from "@tanstack/react-table";
import {Lobby} from "./DataRows.tsx";
import {Button} from "../../components/ui/button.tsx";
import {ArrowUpDown} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../components/ui/dialog.tsx";
import {useNavigate} from "react-router-dom";

export const dataColumns: ColumnDef<Lobby>[] = [
    {
        accessorKey: "Lobby_Id",
        header: ({column}) => {
            return (
                <div className="w-16 bg-white"> {/* Set a fixed width or use a smaller width value */}
                    <Button className={"text-lg bg-white hover:bg-white text-black hover:text-black"}
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Lobby_Id
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            );
        },
        cell: ({row}) => (
            <div className="w-24 text-lg"> {/* Apply the same width to the cell content */}
                {row.getValue("Lobby_Id")}
            </div>
        ),
    },

    {
        accessorKey: "Lobby_Name",
        header: ({column}) => {
            return (
                <Button className={"text-lg bg-white hover:bg-white text-black hover:text-black"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Lobby Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => (
            <div className="text-lg text-left">
                {row.getValue("Lobby_Name")}
            </div>
        ),
    },
    {
        accessorKey: "Rank",
        header: ({column}) => {
            return (
                <Button className={"text-lg bg-white hover:bg-white text-black hover:text-black"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rank
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: ({row}) => {
            return <div className={"text-lg text-left"}>{row.getValue("Rank")}</div>
        },
        filterFn: (row, columnId, value) => {
            return row.getValue(columnId).toString().toLowerCase().includes(value.toLowerCase());
        },
    },
    {
        accessorKey: "Host",
        header: ({column}) => {
            return (
                <div className="text-lg"> Host</div>
            )
        },
        cell: ({row}) => {
            const members = row.original.Members;
            const owner = members.find((member: Member) => member.user_owner);
            return (
                <div className="text-lg text-center">
                    <div>{owner ? owner.user_id : "None"}</div>
                    <div>{owner?.user_role}</div>
                </div>
            )
        },
    },
    {
        accessorKey: "Rank/Members",
        header: ({column}) => {
            return (
                <div className="text-lg text-center">Rank/Members</div>
            )
        },
        cell: ({row}) => {
            const members = row.original.Members;
            const owner = members.find((member: Member) => member.user_owner);
            return (
                <div className={"text-center"}>
                    <div className={"text-lg"}>{row.getValue("Rank")}</div>
                    <div className={"text-lg"} key={"empty"}>{members.length}/5</div>
                </div>
            )
        },
    },
    {
        accessorKey: "Members",
        header: ({column}) => {
            return (
                <Button className={"text-lg bg-white hover:bg-white text-black hover:text-black"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Members
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => {
            const members = row.original.Members;
            return (
                <ul className={"text-left text-blue-900"}>
                    {<li className={"text-lg text-center"} key={"empty"}>{members.length}/5</li>}
                    {/*{members.map((member, index) => (*/}
                    {/*    <li key={index}>*/}
                    {/*        {member.user_role} {member.user_owner ? <b>({member.user_id})</b> : `(${member.user_id})`}*/}
                    {/*    </li>*/}
                    {/*))}*/}
                </ul>
            );
        },
        filterFn: (row, columnId, value) => {
            return !row.getValue(columnId).some((member: Member) => member.user_role === value);
        },
    },
    {
        id: "Join",
        enableHiding: false,
        header: () => {
            return (
                <div className={"text-lg text-center"}>
                    Join Lobby
                </div>
            )
        },
        cell: ({row}) => {
            const navigate = useNavigate();
            return (
                <div className={"text-center p-0"}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className={"border-2 border-blue-950 text-lg w-36 h-12 bg-blue-500 p-2 m-0 radius-3xl"}>
                                Join Lobby
                            </Button>
                        </DialogTrigger>
                        <DialogContent className={"bg-white w-64"}>
                            <DialogHeader className={"pb-2"}>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                You are about to join the lobby {row.original.Lobby_Id}.
                            </DialogDescription>
                            <DialogFooter className="justify-between">
                                <Button variant="outline" className="bg-blue-400" onClick={() =>
                                    navigate(`/lobby/${row.original.Lobby_Id}`)
                                    // <Link to={`/lobby/${row.original.Lobby_Id}`}/>
                                }>
                                    Continue
                                </Button>
                                <Button variant="secondary" className="bg-amber-300">
                                    Cancel
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            );
        },
    },
];
