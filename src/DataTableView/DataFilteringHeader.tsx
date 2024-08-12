import { Label } from "../components/ui/label.tsx";
import { Input } from "../components/ui/input.tsx";
import { Button } from "../components/ui/button.tsx";
import { RefreshCw } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select.tsx";
import * as React from "react";
import { useLobbies } from "../LobbyContext.tsx";

export default function DataFilteringHeader({ table }) {
    const [isFilterDialogOpen, setIsFilterDialogOpen] = React.useState(false);
    const [isCreateLobbyDialogOpen, setIsCreateLobbyDialogOpen] = React.useState(false);
    const { lobbies, addLobby } = useLobbies();
    const [selectedRank, setSelectedRank] = React.useState<string>('');
    const [selectedRole, setSelectedRole] = React.useState<string>('');
    const [createLobbyName, setCreateLobbyName] = React.useState('');

    const handleCreateLobby = () => {
        const newLobby = {
            Lobby_Id: lobbies.length + 1,
            Lobby_Name: createLobbyName,
            Rank: selectedRank,
            Members: [
                {
                    user_id: Date.now(),
                    user_role: "Carry",
                    user_owner: true,
                },
            ],
        };

        addLobby(newLobby);
        closeCreateLobbyDialog();
    };

    const openCreateLobbyDialog = () => {
        setIsFilterDialogOpen(false); // Ensure the other dialog is closed
        setIsCreateLobbyDialogOpen(true);
    };

    const closeCreateLobbyDialog = () => setIsCreateLobbyDialogOpen(false);

    const openFilterDialog = () => {
        setIsCreateLobbyDialogOpen(false); // Ensure the other dialog is closed
        setIsFilterDialogOpen(true);
        setSelectedRank('');
        setSelectedRole('');
    };

    const closeFilterDialog = () => setIsFilterDialogOpen(false);

    const handleApplyFilter = () => {
        table.setColumnFilters([
            { id: 'Rank', value: selectedRank },
            { id: 'Members', value: selectedRole }
        ]);
        console.log("Filtering now");
        const filteredRows = table.getFilteredRowModel().rows.map(row => row.original);
        console.log(filteredRows);
        closeFilterDialog();
    };

    const numberOfRows = table.getFilteredRowModel().rows.length;
    const totalNumberofRows = table.getCoreRowModel().rows.length;

    return (
        <div className="text-left text-lg m-2">
            {/*--Container--*/}
            <div className={"flex flex-row"}>
                {/*--Filtering through lobby name--*/}
                <div className={"flex flex-row space-x-4 w-1/2"}>
                    <Input
                        className="flex-1 w-24"
                        type="text"
                        value={(table.getColumn("Lobby_Name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("Lobby_Name")?.setFilterValue(event.target.value)
                        }
                        placeholder="Enter Lobby Name"
                    />
                    <Button className="flex-none">Search</Button>
                </div>
                {/*--Organize buttons--*/}
                <div className="flex flex-row space-x-4 justify-end ml-auto">
                    {/*--//TODO:For refresing the database--*/}
                    <Button className="flex-none">
                        <RefreshCw className="flex-none" size={18} />
                    </Button>
                    {/*--This is for filtering the table using preferences--*/}
                    {/*--//TODO: Filter not returning to empty state after closing the dialog with no selected rank/role--*/}
                    <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex-none" onClick={openFilterDialog}>
                                Filter
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Filter Options</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 justify-center">
                                {/*--Selecting Player Rank--*/}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="lobbyRank" className="text-right">
                                        Rank
                                    </Label>
                                    <Select onValueChange={(value) => setSelectedRank(value)}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Select a rank" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Ranks</SelectLabel>
                                                <SelectItem value="Herald">Herald</SelectItem>
                                                <SelectItem value="Guardian">Guardian</SelectItem>
                                                <SelectItem value="Crusader">Crusader</SelectItem>
                                                <SelectItem value="Archon">Archon</SelectItem>
                                                <SelectItem value="Legend">Legend</SelectItem>
                                                <SelectItem value="Ancient">Ancient</SelectItem>
                                                <SelectItem value="Divine">Divine</SelectItem>
                                                <SelectItem value="Immortal">Immortal</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/*--Selecting Player Role--*/}
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rankName" className="text-right">
                                        Player Roles
                                    </Label>
                                    <Select onValueChange={(value) => setSelectedRole(value)}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                <SelectItem value="Carry">Carry</SelectItem>
                                                <SelectItem value="Midlaner">Midlaner</SelectItem>
                                                <SelectItem value="Offlaner">Offlaner</SelectItem>
                                                <SelectItem value="Soft Support">Soft Support</SelectItem>
                                                <SelectItem value="Hard Support">Hard Support</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button onClick={handleApplyFilter}>Apply</Button>
                                <Button onClick={closeFilterDialog}>Cancel</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    {/*--This is for Creating a Lobby--*/}
                    <Dialog open={isCreateLobbyDialogOpen} onOpenChange={setIsCreateLobbyDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex-none" onClick={openCreateLobbyDialog}>
                                Create Lobby
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white">
                            <DialogHeader>
                                <DialogTitle>Create Lobby</DialogTitle>
                                <DialogDescription>
                                    In order to create a new lobby, please fill out the form below.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="lobbyName" className="text-right">
                                        Lobby Name
                                    </Label>
                                    <Input
                                        id="lobbyName"
                                        value={createLobbyName}
                                        onChange={(e) => setCreateLobbyName(e.target.value)}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rankName" className="text-right">
                                        Rank
                                    </Label>
                                    <Select onValueChange={(value) => setSelectedRank(value)}>
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Select a rank" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Ranks</SelectLabel>
                                                <SelectItem value="Herald">Herald</SelectItem>
                                                <SelectItem value="Guardian">Guardian</SelectItem>
                                                <SelectItem value="Crusader">Crusader</SelectItem>
                                                <SelectItem value="Archon">Archon</SelectItem>
                                                <SelectItem value="Legend">Legend</SelectItem>
                                                <SelectItem value="Ancient">Ancient</SelectItem>
                                                <SelectItem value="Divine">Divine</SelectItem>
                                                <SelectItem value="Immortal">Immortal</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleCreateLobby} className={"bg-black text-white"}>
                                    Create
                                </Button>
                                <Button onClick={closeCreateLobbyDialog}>Close</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            {/*Show number of rows*/}
            <div className={"text-zinc-500 mb-1 text-center justify-center mt-4 text-sm"}>
                {(() => {
                    const text = `${numberOfRows} of ${totalNumberofRows} lobbies found`;

                    if (selectedRank === '' && selectedRole === '') {
                        return text;
                    } else if (selectedRank !== '' && selectedRole === '') {
                        return `${text} for the rank ${selectedRank}`;
                    } else if (selectedRank === '' && selectedRole !== '') {
                        return `${text} with the role of ${selectedRole}`;
                    } else {
                        return `${text} for the rank ${selectedRank}, with the role of ${selectedRole}`;
                    }
                })()}
            </div>
        </div>
    );
}
