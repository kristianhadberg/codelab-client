import { useEffect } from "react";
import { getTopics } from "../redux/slices/topics";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function TopicsPage() {
    const dispatch = useAppDispatch();

    const { topics, isLoading } = useAppSelector((state) => state.topics);

    useEffect(() => {
        dispatch(getTopics());
    }, [dispatch]);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography variant="h2">Topics</Typography>
                    <Typography variant="h6">Select a topic you want to learn about.</Typography>
                    {topics.map((t) => (
                        <div key={t.id} style={{ display: "flex" }}>
                            <Link to={`/topics/${t.id}`}>
                                <Typography variant="h4">{t.name} -</Typography>
                            </Link>
                            <Typography variant="h5">learn more about arrays and collections</Typography>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
