import {ScrollArea} from "../../components/ui/scroll-area.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table.tsx";
import {flexRender} from "@tanstack/react-table";
import {dataColumns} from "./DataColumns.tsx";
import * as React from "react";

export default function DataTable({table: table}) {
    {/*--Data table is responsive--*/}
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {

                table.setColumnVisibility({
                    Lobby_Id: false,
                    Host: false,
                    Rank: false,
                    Members:false,
                    Test:true,
                });
            } else {
                table.setColumnVisibility({
                    Test:false,
                });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className={"text-black"}>
            <ScrollArea className={"h-192 w-full"}>
                <div>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            className="text-black" // Changed text alignment to left
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
                                    <TableRow className={"hover:bg-blue-500"} key={row.id}>
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
                                        colSpan={dataColumns.length}
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
    );
}