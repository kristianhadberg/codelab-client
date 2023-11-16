import { useEffect } from "react";
import { getTopics } from "../redux/slices/topics";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Typography } from "@mui/material";

export default function TopicsPage() {
    const dispatch = useAppDispatch();

    const { topics, isLoading } = useAppSelector((state) => state.topics);

    useEffect(() => {
        dispatch(getTopics());
    }, [dispatch]);

    return (
        <>
            <div>
                <Typography variant="h2">Topics</Typography>
                <Typography variant="h6">Select a topic you want to learn about.</Typography>
                {/* {topics.map((t) => (
                    <span key={t.id}>{t.name}</span>
                ))} */}
                {topics.map((t) => (
                    <div style={{ display: "flex" }}>
                        <Typography variant="h4">{t.name} -</Typography>
                        <Typography variant="h5">learn more about arrays and collections</Typography>
                    </div>
                ))}
            </div>
        </>
    );
}
