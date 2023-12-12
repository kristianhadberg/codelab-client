import { Link } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { IExercise, Difficulty } from "../@types/exercise";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
    exercises: IExercise[];
};

const TopicTable = ({ exercises }: Props) => {
    return (
        <TableContainer component={Paper} sx={{ width: "80%" }}>
            <Table sx={{ minWidth: 300 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "60%" }}>NAME</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>DIFFICULTY</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>TOTAL SUBMISSIONS</TableCell>
                        <TableCell sx={{ textAlign: "center" }}>COMPLETED?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercises
                        .filter((e) => !e.isLearningPathExercise)
                        .map((e) => (
                            <TableRow key={e.id}>
                                <TableCell>
                                    <Link style={{ color: "black" }} to={`/exercise/${e.id}`}>
                                        {e.name}
                                    </Link>
                                </TableCell>
                                <ExerciseDifficulty difficulty={e.difficulty} />
                                <TableCell sx={{ textAlign: "center" }}>{e.submissionCount}</TableCell>
                                <TableCell sx={{ textAlign: "center" }}>{e.isCompleted ? <CheckIcon sx={{ color: "green" }} /> : <CloseIcon sx={{ color: "red" }} />}</TableCell>
                            </TableRow>
                        ))}
                    {exercises.length === 0 && (
                        <TableRow>
                            <TableCell sx={{ width: "100%" }}>No exercises found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TopicTable;

type DifficultyProps = {
    difficulty: Difficulty;
};
const ExerciseDifficulty = ({ difficulty }: DifficultyProps) => {
    const color = {
        Beginner: "green",
        Intermediate: "#ffdc3b",
        Advanced: "red",
    };
    const borderColor = color[difficulty];

    return (
        <TableCell sx={{ textAlign: "center" }}>
            <Typography sx={{ border: `2px solid ${borderColor}`, borderRadius: 1 }} variant="body2">
                {difficulty}
            </Typography>
        </TableCell>
    );
};
