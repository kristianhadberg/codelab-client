import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardActions, Collapse, IconButton, IconButtonProps, LinearProgress, LinearProgressProps, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from "@mui/material";
import { ITopic } from "../@types/topic";
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

    const getProgressValue = () => {
        let completedExercises = 0;
        const totalExercises = topic.exercises.length;

        for (let i = 0; i < topic.exercises.length; i++) {
            if (topic.exercises[i].isCompleted) {
                completedExercises++;
            }
        }

        const result = (completedExercises / totalExercises) * 100;
        if (isNaN(result)) {
            return 0;
        } else {
            return result;
        }
    };

    return (
        <Card sx={{ backgroundColor: "#34444D", padding: "30px", minWidth: 800 }}>
            <div style={{ textAlign: "center" }}>
                <Typography sx={{ fontWeight: "200" }} variant="h6" color={"white"}>
                    Current topic
                </Typography>
                <Typography variant="h4" color={"white"}>
                    {topic.name}
                </Typography>

                {getProgressValue() === 100 && (
                    <Typography variant="h5" color={"limegreen"}>
                        Completed
                    </Typography>
                )}
            </div>

            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                <LinearProgressWithLabel value={getProgressValue()} />
            </div>

            <CardActions>
                <ExpandMore sx={{ margin: "0 auto" }} expand={expanded} onClick={handleClick}>
                    <ExpandMoreIcon sx={{ fontSize: 40 }} />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography sx={{ color: "white" }} variant="h6">
                    Exercises
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: "100%" }}>Name</TableCell>
                                <TableCell>Completed</TableCell>
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
            </Collapse>
        </Card>
    );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="white">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
