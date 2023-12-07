import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardActions, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTopicsByLearningPathId } from "../redux/slices/topics";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getLearningPath } from "../redux/slices/learningPaths";
import { ExpandMore } from "@mui/icons-material";
import LearningPathTopicCard from "../components/LearningPathTopicCard";

const LearningPathDetailPage = () => {
    const { learningPathId } = useParams<{ learningPathId: string }>();
    const dispatch = useAppDispatch();
    const { topics, isLoading } = useAppSelector((state) => state.topics);
    const { learningPath } = useAppSelector((state) => state.learningPaths);

    useEffect(() => {
        if (learningPathId) {
            dispatch(getTopicsByLearningPathId(learningPathId));
            dispatch(getLearningPath(learningPathId));
        }
    }, [dispatch, learningPathId]);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <div className="header">
                        <Typography variant="h3">{learningPath?.name}</Typography>
                    </div>
                    <div style={{ display: "flex" }}>
                        {learningPath?.topics.map((t, index) => (
                            <div key={t.id} style={{ display: "flex", alignItems: "flex-start", marginTop: "50px" }}>
                                {index === 0 ? <LearningPathTopicCard firstElement={true} topic={t}></LearningPathTopicCard> : <LearningPathTopicCard topic={t}></LearningPathTopicCard>}
                                {index < topics.length - 1 && <ArrowForwardIcon sx={{ margin: "20px" }} />}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LearningPathDetailPage;
