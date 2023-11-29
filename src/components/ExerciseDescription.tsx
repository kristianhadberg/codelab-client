import { Typography } from "@mui/material";
import { IExercise } from "../@types/exercise";
import TestCases from "./TestCases";

type Props = {
    exercise: IExercise;
};

const ExerciseDescription = ({ exercise }: Props) => {
    return (
        <>
            <Typography variant="h4">{exercise?.name}</Typography>
            <Typography variant="body2">{exercise?.description}</Typography>
            {exercise?.expectedOutput !== "Success" && (
                <>
                    <Typography variant="h4" style={{ marginTop: "50px" }}>
                        Expected output:
                    </Typography>
                    <code style={{ padding: "10px", display: "block", backgroundColor: "#3c4d57", borderRadius: "5px" }}>{exercise?.expectedOutput}</code>
                </>
            )}
            {exercise?.testCases ? <TestCases testCases={exercise?.testCases}></TestCases> : <></>}
        </>
    );
};

export default ExerciseDescription;
