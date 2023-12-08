import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTopic } from "../redux/slices/topics";
import { getExercisesByTopicId, getExercisesByTopicIdAndUserId } from "../redux/slices/exercises";
import TopicTable from "../components/TopicTable";

const TopicDetailPage = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const dispatch = useAppDispatch();
    const { topic, isLoading } = useAppSelector((state) => state.topics);
    const { exercises } = useAppSelector((state) => state.exercises);
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (topicId && user) {
            dispatch(getTopic(topicId));
            // dispatch(getExercisesByTopicId(topicId));
            dispatch(getExercisesByTopicIdAndUserId(topicId, user.id));
        }
    }, [dispatch, topicId, user]);

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
                        <TopicTable exercises={exercises}></TopicTable>
                    </div>
                </>
            )}
        </div>
    );
};

export default TopicDetailPage;
