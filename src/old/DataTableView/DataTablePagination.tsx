import { Button } from "../../components/ui/button.tsx";

export default function DataTablePagination({ table }) {
    return (
        <div className={"flex items-center justify-end space-x-2 py-4"}>
            {/*--Pagination // Change this to pagination component--*/}
            <div className={"space-x-2"}>
                <Button
                    className="bg-black text-white hover:bg-blue-800"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    className="bg-black text-white hover:bg-blue-600 hover:text-white"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
