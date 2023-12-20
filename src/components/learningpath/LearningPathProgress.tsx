import React from "react";
import { ILearningPathProgress } from "../../@types/learningPathProgress";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Typography } from "@mui/material";

type Props = {
    learningPathProgress: ILearningPathProgress | null;
};

export default function LearningPathProgress({ learningPathProgress }: Props) {
    return (
        <div style={{ backgroundColor: "#34444D", width: "350px", height: "250px", borderRadius: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: "50px 0", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <Typography sx={{ textAlign: "center", marginBottom: "20px" }} variant="h6">
                Completed exercises: {learningPathProgress?.completedExercises}/{learningPathProgress?.totalExercises}
            </Typography>
            <div style={{ width: "200px", height: "200px" }}>
                <CircularProgressbarWithChildren
                    styles={{
                        path: {
                            stroke: "#9FF6C7",
                        },
                        text: {
                            fill: "#9FF6C7",
                        },
                    }}
                    value={learningPathProgress?.percentageCompleted || 0}
                    text={`${learningPathProgress?.percentageCompleted}%`}
                />
            </div>
        </div>
    );
}
