import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTopicsByLearningPathId } from "../../redux/slices/topics";
import { getLearningPathByIdAndUserId, getLearningPathProgressByIdAndUserId } from "../../redux/slices/learningPaths";
import LearningPathOverview from "../../components/learningpath/LearningPathOverview";
import LearningPathProgress from "../../components/learningpath/LearningPathProgress";

const LearningPathDetailPage = () => {
    const { learningPathId } = useParams<{ learningPathId: string }>();
    const dispatch = useAppDispatch();
    const { learningPath, isLoading } = useAppSelector((state) => state.learningPaths);
    const { learningPathProgress } = useAppSelector((state) => state.learningPaths);
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (learningPathId && user) {
            dispatch(getTopicsByLearningPathId(learningPathId));
            dispatch(getLearningPathByIdAndUserId(learningPathId, user.id));
            dispatch(getLearningPathProgressByIdAndUserId(learningPathId, user.id));
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
                        <LearningPathProgress learningPathProgress={learningPathProgress} />
                    </div>
                    <div style={{ marginTop: "100px" }}>
                        <LearningPathOverview topics={learningPath?.topics || []} />
                    </div>
                </>
            )}
        </div>
    );
};

export default LearningPathDetailPage;
