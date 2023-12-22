import { useEffect } from "react";
import { getTopics } from "../../redux/slices/topics";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CircularProgress, Typography } from "@mui/material";
import TopicCard from "../../components/topic/TopicCard";

export default function TopicsPage() {
    const dispatch = useAppDispatch();

    const { topics, isLoading } = useAppSelector((state) => state.topics);

    useEffect(() => {
        dispatch(getTopics());
    }, [dispatch]);

    return (
        <>
            <Typography variant="h3">Topics</Typography>
            <Typography variant="h6">Select a topic you want to learn about.</Typography>
            {isLoading ? (
                <CircularProgress sx={{ marginTop: 10 }} />
            ) : (
                <>
                    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "50px" }}>
                        {topics.map((t) => (
                            <TopicCard key={t.name} topic={t} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
