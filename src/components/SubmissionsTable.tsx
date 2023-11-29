import { DataGrid, GridColDef, GridEventListener, GridValueGetterParams } from "@mui/x-data-grid";
import { ISubmission } from "../@types/submission";

type Props = {
    submissions: ISubmission[];
    handleClick: GridEventListener<"rowClick">;
};

const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 200, disableColumnMenu: true },
    { field: "submissionDate", headerName: "Date", disableColumnMenu: true, width: 200, valueGetter: (params: GridValueGetterParams) => (params.row.submissionDate ? new Date(params.row.submissionDate).toLocaleDateString() : "") },
];
const SubmissionsTable = ({ submissions, handleClick }: Props) => {
    return (
        <>
            <DataGrid
                onRowClick={handleClick}
                style={{ backgroundColor: "white", height: "auto" }}
                rows={submissions}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick={true}
            />
        </>
    );
};

export default SubmissionsTable;
