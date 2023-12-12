import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardActions, CircularProgress, Slide, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTopicsByLearningPathId } from "../redux/slices/topics";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getLearningPathByIdAndUserId } from "../redux/slices/learningPaths";
import { ExpandMore, NavigateBefore, NavigateNext } from "@mui/icons-material";
import LearningPathTopicCard from "../components/LearningPathTopicCard";

import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import { ITopic } from "../@types/topic";

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
                    <div style={{ marginTop: "100px" }}>
                        <Carousel topics={learningPath?.topics || []} />
                    </div>
                </>
            )}
        </div>
    );
};

export default LearningPathDetailPage;

type Props = {
    topics: ITopic[];
};

function Carousel({ topics }: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDirection, setSlideDirecetion] = useState<"right" | "left" | undefined>("left");

    const cardsPerPage = 1;

    const handleNextPage = () => {
        setSlideDirecetion("left");
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setSlideDirecetion("right");
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const getCurrentTopic = () => {
        let topicStatus = [];

        for (let i = 0; i < topics.length; i++) {
            let isCompleted = false;

            for (let n = 0; n < topics[i].exercises.length; n++) {
                isCompleted = topics[i].exercises[n].isCompleted ? true : false;
            }
            topicStatus.push({ index: isCompleted });
        }
        const firstIncompleteTopicIndex = topicStatus.findIndex((t) => !t.index);
        return firstIncompleteTopicIndex;
    };

    useEffect(() => {
        setCurrentPage(getCurrentTopic());
    }, [topics]);

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "center", height: "400px" }}>
                <IconButton onClick={handlePrevPage} sx={{ margin: 5 }} disabled={currentPage === 0} color="primary">
                    <NavigateBefore sx={{ fontSize: 40 }} />
                </IconButton>
                <Box sx={{ width: "800px", height: "100%" }}>
                    {topics.map((topic, index) => (
                        <>
                            <Box key={`box-${index}`} sx={{ width: "100%", height: "100%", display: currentPage === index ? "block" : "none" }}>
                                <Slide direction={slideDirection} in={currentPage === index}>
                                    <Stack spacing={2} direction="row" alignContent="center" justifyContent="center">
                                        {topics.slice(index * cardsPerPage, index * cardsPerPage + cardsPerPage).map((subTopic, subIndex) => (
                                            <LearningPathTopicCard key={topic.id} topic={subTopic} />
                                        ))}
                                    </Stack>
                                </Slide>
                            </Box>
                        </>
                    ))}
                </Box>
                <IconButton
                    onClick={handleNextPage}
                    sx={{
                        margin: 5,
                    }}
                    disabled={currentPage >= Math.ceil((topics.length || 0) / cardsPerPage) - 1}
                    color="primary"
                >
                    <NavigateNext sx={{ fontSize: 40 }} />
                </IconButton>
            </Box>
        </>
    );
}
