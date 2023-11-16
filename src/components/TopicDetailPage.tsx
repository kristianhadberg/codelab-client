import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
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
                    <Typography variant="h2">{topic?.name}</Typography>
                    <Typography variant="h4">Topic ID: {topicId}</Typography>
                    <div className="exercises">
                        <Typography variant="h4">Exercises</Typography>
                    </div>
                </>
            )}
        </div>
    );
};

export default TopicDetailPage;
