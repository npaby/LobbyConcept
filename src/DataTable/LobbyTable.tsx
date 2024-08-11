import * as React from "react";
import {useState} from "react";
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {Button} from "../components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "../components/ui/table.tsx";
import {dummyLobbies as data} from "./data.tsx";
import {columns} from "./columns.tsx";
import {ScrollArea} from "../components/ui/scroll-area.tsx";
import {Label} from "../components/ui/label.tsx";
import {Input} from "../components/ui/input.tsx";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/ui/dialog.tsx";

export default function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
    const [isCreateLobbyDialogOpen, setIsCreateLobbyDialogOpen] = useState(false);
    const openFilterDialog = () => {
        setIsCreateLobbyDialogOpen(false); // Ensure the other dialog is closed
        setIsFilterDialogOpen(true);
    };
    const closeFilterDialog = () => setIsFilterDialogOpen(false);
    const openCreateLobbyDialog = () => {
        setIsFilterDialogOpen(false); // Ensure the other dialog is closed
        setIsCreateLobbyDialogOpen(true);
    };
    const closeCreateLobbyDialog = () => setIsCreateLobbyDialogOpen(false);
    const [selectedRank, setSelectedRank] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const handleApplyFilter = () => {
        setColumnFilters([
            {id: 'Rank', value: selectedRank},
            {id: 'Members', value: selectedRole}
        ]);
        closeFilterDialog();
    };
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 20
            },
        }
    });


    // Get the number of rows
    const totalNumberofRows = data.length;
    const numberOfRows = table.getFilteredRowModel().rows.length;
    return (
        <div>
            {/*<div className="text-left text-lg m-10">*/}
            {/*    <Label className="text-xl font-bold mb-4">Lobby*/}
            {/*        Overview</Label> /!* Added margin-bottom to separate the title from the form *!/*/}
            {/*    <div className="flex flex-col space-y-4">*/}
            {/*        <Input className={"flex-1"} type="text" placeholder="Email"*/}
            {/*               className="w-full"/> /!* Ensures the input takes full width *!/*/}
            {/*        <Button className="flex-2 w-full mt-2">Search</Button> /!* Ensures the button takes full width *!/*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="text-left text-lg m-2">
                <div className="mb-5">
                    <Label className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Lobbies
                    </Label>
                    {/*<Label className="text-xl font-bold ">*/}
                    {/*    Lobby Overview*/}
                    {/*</Label>*/}
                </div>
                <div className={"flex flex-row"}>
                    {/*--Filtering through lobby name--*/}
                    <div
                        className={"flex flex-row space-x-4 w-1/2"}>
                        <Input className="flex-1 w-24" type="text"
                               value={(table.getColumn("Lobby_Name")?.getFilterValue() as string) ?? ""}
                               onChange={(event) =>
                                   table.getColumn("Lobby_Name")?.setFilterValue(event.target.value)
                               }
                               placeholder="Enter Lobby Name"/>
                        <Button className="flex-none">Search</Button>
                    </div>

                    {/*--This is for filtering the table using preferences--*/}
                    <div className="flex flex-row space-x-4 justify-end ml-auto">

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
                                <DialogDescription>
                                    <div></div>
                                    <div className="grid gap-4 py-4 justify-center">
                                        {/*--Selecting Player Rank--*/}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="lobbyName" className="text-right">
                                                Rank
                                            </Label>
                                            <Select onValueChange={(value) => setSelectedRank(value)}>
                                                <SelectTrigger className="w-[280px]">
                                                    <SelectValue placeholder="Select a rank"/>
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
                                            <Select onValueChange={(value => setSelectedRole(value))}>
                                                <SelectTrigger className="w-[280px]">
                                                    <SelectValue placeholder="Select a role"/>
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
                                </DialogDescription>
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
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="rankName" className="text-right">
                                            Rank
                                        </Label>
                                        <Input
                                            id="rankName"
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={closeCreateLobbyDialog}
                                            className={"bg-black text-white"}>Create</Button>
                                    <Button onClick={closeCreateLobbyDialog}
                                            className={"bg-red-700 text-white"}>Cancel</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                </div>
                <div className={"text-zinc-500 mb-1 text-center justify-center mt-4 text-sm"}>
                    {(() => {
                        const text = `${numberOfRows} of ${totalNumberofRows} rows`;

                        if (selectedRank === '' && selectedRole === '') {
                            return text;
                        } else if (selectedRank !== '' && selectedRole === '') {
                            return `${text} for the rank ${selectedRank}`;
                        } else if (selectedRank === '' && selectedRole !== '') {
                            return `${text} for the role ${selectedRole}`;
                        } else {
                            return `${text} for the rank ${selectedRank} and role ${selectedRole}`;
                        }
                    })()}
                </div>
            </div>

            {/*--Render the table--*/}
            <div className={"text-black"}>
                <ScrollArea className={"h-192"}>
                    <div>
                    <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                className="text-blue-600 text-left" // Changed text alignment to left
                                                key={header.id}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </ScrollArea>
            </div>
            {/*--Pagination // Change this to pagination component--*/}
            <div className={"flex items-center justify-end space-x-2 py-4"}>
                <div className={"space-x-2"}>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        className="bg-blue-600 text-black hover:bg-blue-800 hover:text-white"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
