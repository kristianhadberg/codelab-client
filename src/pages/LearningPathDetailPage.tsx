import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardActions, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTopicsByLearningPathId } from "../redux/slices/topics";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getLearningPathByIdAndUserId } from "../redux/slices/learningPaths";
import { ExpandMore } from "@mui/icons-material";
import LearningPathTopicCard from "../components/LearningPathTopicCard";

const LearningPathDetailPage = () => {
    const { learningPathId } = useParams<{ learningPathId: string }>();
    const dispatch = useAppDispatch();
    const { topics, isLoading } = useAppSelector((state) => state.topics);
    const { learningPath } = useAppSelector((state) => state.learningPaths);
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (learningPathId && user) {
            dispatch(getTopicsByLearningPathId(learningPathId));
            dispatch(getLearningPathByIdAndUserId(learningPathId, user.id));
        }
    }, [dispatch, learningPathId, user]);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <div className="header">
                        <Typography variant="h3">{learningPath?.name}</Typography>
                    </div>
                    <div>
                        <Typography sx={{ marginTop: "20px" }} variant="h5">
                            Your progress
                        </Typography>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <Typography variant="h5">Topics</Typography>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {learningPath?.topics.map((t, index) => (
                                <div key={t.id} style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
                                    {/* only adds the arrow if it's not the last topic in the list */}
                                    {index === 0 ? <LearningPathTopicCard firstElement={true} topic={t}></LearningPathTopicCard> : <LearningPathTopicCard topic={t}></LearningPathTopicCard>}
                                    {index < topics.length - 1 && <ArrowForwardIcon sx={{ margin: "20px" }} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LearningPathDetailPage;
