import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import { IExercise } from "../../@types/exercise";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
    exercises: IExercise[];
};

export default function ExerciseTable({ exercises }: Props) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "100%" }}>Name</TableCell>
                        <TableCell>Completed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercises.map((e) => (
                        <TableRow key={`row-${e.id}`}>
                            <TableCell>
                                <Link style={{ color: "black" }} to={`/exercise/${e.id}`}>
                                    {e.name}
                                </Link>
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>{e.isCompleted ? <CheckIcon sx={{ color: "green" }} /> : <CloseIcon sx={{ color: "red" }} />}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
