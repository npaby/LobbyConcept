import * as React from "react";
import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {dataColumns} from "./DataTableView/DataColumns.tsx";
import {useLobbies} from "./LobbyContext.tsx";
import DataFilteringHeader from "./DataTableView/DataFilteringHeader.tsx";
import DataTablePagination from "./DataTableView/DataTablePagination.tsx";
import DataTable from "./DataTableView/DataTable.tsx";
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
import CardView from "./CardView.tsx";
export default function DataTableDemo() {
    // Managing the state of the table
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const {lobbies} = useLobbies();
    const [selectedView, setSelectedView] = React.useState('CardView');
    let paginationSize = 20;
    const table = useReactTable({
        data: lobbies, // Use the lobbies from the context
        columns: dataColumns,
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
                pageSize: paginationSize,
            },
        }
    });
    const renderView = () => {
        switch (selectedView) {
            case 'DataView':
                return (
                    <>
                        <DataTable table={table} />
                    </>
                );
                break;
            case'CardView':
                return(
                    <>
                        <CardView table={table} />
                    </>
                );
                break;
            default:
                return (
                    <>
                        <div className="text-center">
                            <h2>No data available</h2>
                        </div>
                    </>
                );
                break;
        }
    };
    return (
        <div>
            <div className="mb-5">
                <Label className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Lobbies
                </Label>
            </div>
            <Select onValueChange={(value) => setSelectedView(value)}>
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
            <DataFilteringHeader table={table} />
            {renderView()}
            <DataTablePagination table={table} />
        </div>
    );
}
