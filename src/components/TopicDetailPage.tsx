import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTopic } from "../redux/slices/topics";
import { getExercisesByTopicId } from "../redux/slices/exercises";

const TopicDetailPage = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const dispatch = useAppDispatch();
    const { topic, isLoading } = useAppSelector((state) => state.topics);
    const { exercises } = useAppSelector((state) => state.exercises);

    console.log(topic);
    console.log(exercises);

    useEffect(() => {
        if (topicId) {
            dispatch(getTopic(topicId));
            dispatch(getExercisesByTopicId(topicId));
        }
    }, [dispatch, topicId]);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <div className="header">
                        <Typography variant="h2">{topic?.name}</Typography>
                    </div>
                    <div className="exercises" style={{ marginTop: "50px" }}>
                        <Typography variant="h4">Exercises</Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: "100%" }}>Name</TableCell>
                                        <TableCell>Difficulty</TableCell>
                                        <TableCell>Submissions</TableCell>
                                        <TableCell>Completed?</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {exercises.map((e) => (
                                        <TableRow key={e.id}>
                                            <Link to={`/exercise/${e.id}`}>
                                                <TableCell>{e.name}</TableCell>
                                            </Link>
                                            <TableCell>temp</TableCell>
                                            <TableCell>temp</TableCell>
                                            <TableCell>temp</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </>
            )}
        </div>
    );
};

export default TopicDetailPage;
