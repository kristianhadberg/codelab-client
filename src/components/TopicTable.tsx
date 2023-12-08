import { Link } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { IExercise } from "../@types/exercise";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
    exercises: IExercise[];
};

const TopicTable = ({ exercises }: Props) => {
    return (
        <TableContainer component={Paper} sx={{ width: "60%" }}>
            <Table sx={{ minWidth: 300 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "100%" }}>Name</TableCell>
                        <TableCell>Difficulty</TableCell>
                        <TableCell>Submissions</TableCell>
                        <TableCell>Completed?</TableCell>
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
                                <TableCell>temp</TableCell>
                                <TableCell>{e.submissionCount}</TableCell>
                                <TableCell>{e.isCompleted ? <CheckIcon sx={{ color: "green" }} /> : <CloseIcon sx={{ color: "red" }} />}</TableCell>
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
