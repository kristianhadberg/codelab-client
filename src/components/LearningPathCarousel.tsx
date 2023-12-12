import { useEffect, useState } from "react";
import { ITopic } from "../@types/topic";
import { Box, IconButton, Slide, Stack, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import LearningPathTopicCard from "./LearningPathTopicCard";

type Props = {
    topics: ITopic[];
};

export default function Carousel({ topics }: Props) {
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

    // function to get the topic which is next in the path
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
                <Box sx={{ position: "relative", height: "200px", width: "200px", backgroundColor: "#34444D", visibility: currentPage === 0 ? "hidden" : "block" }}>
                    <Typography sx={{ textAlign: "center", padding: "70px 0;" }} variant="h6">
                        {topics[currentPage - 1]?.name || ""}
                    </Typography>
                </Box>
                <IconButton onClick={handlePrevPage} sx={{ margin: 5 }} disabled={currentPage === 0} color="primary">
                    <NavigateBefore sx={{ fontSize: 40 }} />
                </IconButton>
                <Box sx={{ width: "600px", height: "100%" }}>
                    {topics.map((topic, index) => (
                        <Box key={`box-${index}`} sx={{ width: "100%", height: "100%", display: currentPage === index ? "block" : "none" }}>
                            <Slide direction={slideDirection} in={currentPage === index}>
                                <Stack spacing={2} direction="row" alignContent="center" justifyContent="center">
                                    {topics.slice(index * cardsPerPage, index * cardsPerPage + cardsPerPage).map((subTopic, subIndex) => (
                                        <LearningPathTopicCard key={`topic-card-${subIndex}`} topic={subTopic} />
                                    ))}
                                </Stack>
                            </Slide>
                        </Box>
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
                <Box sx={{ position: "relative", height: "200px", width: "200px", backgroundColor: "#34444D", visibility: currentPage === topics.length - 1 ? "hidden" : "" }}>
                    <Typography sx={{ textAlign: "center", padding: "70px 0;" }} variant="h6">
                        {topics[currentPage + 1]?.name || ""}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
