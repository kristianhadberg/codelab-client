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
                        <Typography variant="h3">{topic?.name}</Typography>
                        <Typography variant="body2" sx={{ width: "60%" }}>
                            {topic?.description}
                        </Typography>
                    </div>
                    <div className="exercises" style={{ marginTop: "50px" }}>
                        <Typography variant="h5">Exercises</Typography>
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
                                    {exercises.map((e) => (
                                        <TableRow key={e.id}>
                                            <TableCell>
                                                <Link style={{ color: "black" }} to={`/exercise/${e.id}`}>
                                                    {e.name}
                                                </Link>
                                            </TableCell>
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
