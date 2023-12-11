import { useEffect } from "react";
import { getTopics } from "../redux/slices/topics";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Button, Card, CardActions, CardContent, CircularProgress, Typography } from "@mui/material";
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
                    <Typography variant="h3">Topics</Typography>
                    <Typography variant="h6">Select a topic you want to learn about.</Typography>
                    <div className="topics" style={{ display: "flex", flexWrap: "wrap", marginTop: "50px" }}>
                        {topics.map((t) => (
                            <Card key={t.id} variant="outlined" sx={{ minWidth: 275, padding: 1, margin: "10px 10px 10px 0", backgroundColor: "#34444D" }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 16 }} fontWeight={"bold"} color={"white"}>
                                        {t.name}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={"100"} color={"white"}>
                                        Learn more about {t.name.toLowerCase()}.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/topics/${t.id}`}>
                                        <Button size="small">Learn More</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
