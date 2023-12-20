import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { getLearningPaths } from "../../redux/slices/learningPaths";

export default function LearningPathPage() {
    const dispatch = useAppDispatch();

    const { learningPaths, isLoading } = useAppSelector((state) => state.learningPaths);

    useEffect(() => {
        dispatch(getLearningPaths());
    }, [dispatch]);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography variant="h3">Learning Paths</Typography>
                    <Typography variant="h6">Choose your path.</Typography>
                    <div className="learningPaths" style={{ marginTop: "50px", display: "flex", flexWrap: "nowrap", height: "80%", width: "100%" }}>
                        {learningPaths.map((lp) => (
                            <Card key={lp.name} variant="outlined" sx={{ width: "50%", padding: 2, marginRight: "10px", backgroundColor: "#34444D", textAlign: "center", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                                    <Typography color={"white"} variant="h2">
                                        {lp.name}
                                    </Typography>
                                    <div>
                                        <Typography color="white" variant="h5" fontWeight={"bold"}>
                                            Contains the following topics:
                                        </Typography>
                                        {lp.topics.map((t) => (
                                            <Typography key={t.name} sx={{ fontWeight: "200" }} color={"white"} variant="h6">
                                                {t.name}
                                            </Typography>
                                        ))}
                                    </div>
                                    <Link to={`/learning-path/${lp.id}`}>
                                        <Button sx={{ width: "100%", marginBottom: "50px" }} variant="contained" size="large">
                                            GO
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
