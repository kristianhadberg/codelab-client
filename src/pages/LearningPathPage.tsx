import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { getLearningPaths } from "../redux/slices/learningPaths";

export default function LearningPathPage() {
    const dispatch = useAppDispatch();

    const { learningPaths, isLoading } = useAppSelector((state) => state.learningPaths);

    useEffect(() => {
        dispatch(getLearningPaths());
    }, [dispatch]);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography variant="h3">Learning Paths</Typography>
                    <Typography variant="h6">Choose your path.</Typography>
                    <div className="learningPaths" style={{ marginTop: "50px", display: "flex", flexWrap: "wrap" }}>
                        {learningPaths.map((lp) => (
                            <Card key={lp.id} variant="outlined" sx={{ minWidth: 275, padding: 2, marginRight: "10px", backgroundColor: "#34444D" }}>
                                <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography color={"white"} variant="h6">
                                        {lp.name}
                                    </Typography>
                                    <Link to={`/learning-path/${lp.id}`}>
                                        <Button variant="outlined" size="small">
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
