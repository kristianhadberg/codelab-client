import { Typography } from "@mui/material";
import { ISubmission } from "../../@types/submission";
import SubmissionsTable from "../submission/SubmissionsTable";
import { GridEventListener } from "@mui/x-data-grid";

type Props = {
    submissions: ISubmission[];
    handleClick: GridEventListener<"rowClick">;
};

const ExerciseDescription = ({ submissions, handleClick }: Props) => {
    return (
        <>
            <Typography variant="h4">Submissions</Typography>
            <SubmissionsTable submissions={submissions} handleClick={handleClick} />
        </>
    );
};

export default ExerciseDescription;
