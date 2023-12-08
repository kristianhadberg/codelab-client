import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Collapse, IconButton, IconButtonProps, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { ITopic } from "../@types/topic";
// import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
    firstElement?: boolean;
    topic: ITopic;
};

// from MUI
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

// from MUI
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function LearningPathTopicCard({ firstElement, topic }: Props) {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (firstElement !== undefined && firstElement) {
            setExpanded(true);
        }
    }, [firstElement]);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ backgroundColor: "#34444D", padding: "30px" }}>
            <Typography variant="h5" color={"white"}>
                {topic.name}
            </Typography>
            <CardActions>
                <ExpandMore expand={expanded} onClick={handleClick}>
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ backgroundColor: "#7692a1", borderRadius: "5px" }}>
                    <Typography sx={{ marginBottom: "20px" }} variant="h6">
                        Exercises
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: "100%" }}>Name</TableCell>
                                    <TableCell>Completed?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {topic.exercises.map((e) => (
                                    <TableRow key={e.id}>
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
                    {/* {topic.exercises.map((e) => (
                        <Link key={e.id} style={{ color: "black" }} to={`/exercise/${e.id}`}>
                            <Typography color={"white"} variant="h6">
                                {e.name}
                            </Typography>
                        </Link>
                    ))} */}
                </CardContent>
            </Collapse>
        </Card>
    );
}
