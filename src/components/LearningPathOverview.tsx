import CheckIcon from "@mui/icons-material/Check";
import { Box, Typography } from "@mui/material";
import { ITopic } from "../@types/topic";
import { useEffect, useState } from "react";
import ExerciseTable from "./ExerciseTable";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";

type Props = {
    topics: ITopic[];
};

export default function LearningPathOverview({ topics }: Props) {
    const [activeTopic, setActiveTopic] = useState<ITopic>();

    const handleTopicClick = (topic: ITopic) => {
        setActiveTopic(topic);
    };

    useEffect(() => {
        const getInitialActiveTopic = () => {
            let firstUncompletedTopic = null;
            for (let i = 0; i < topics.length; i++) {
                if (topics[i].isCompleted === false) {
                    firstUncompletedTopic = topics[i];
                    break;
                }
            }

            if (!firstUncompletedTopic) {
                return topics[0];
            }
            setActiveTopic(firstUncompletedTopic);
        };
        getInitialActiveTopic();
    }, [topics]);

    const getProgressValue = () => {
        if (!activeTopic) return;
        let completedExercises = 0;
        const totalExercises = activeTopic?.exercises.length;

        for (let i = 0; i < activeTopic.exercises.length; i++) {
            if (activeTopic.exercises[i].isCompleted) {
                completedExercises++;
            }
        }

        const result = (completedExercises / totalExercises) * 100;
        if (isNaN(result)) {
            return 0;
        } else {
            return result;
        }
    };

    return (
        <div style={{ display: "flex", width: "100%", backgroundColor: "#34444D" }}>
            <div style={{ borderRight: "2px solid #242E34", padding: 10, position: "relative" }}>
                {/* overview menu / side menu */}
                {topics.map((t, index) => (
                    <div style={{ display: "flex", cursor: "pointer", padding: 15 }} onClick={() => handleTopicClick(t)} key={index}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "50%",
                                width: "60px",
                                height: "60px",
                                border: t.isCompleted ? "2px solid #9FF6C7" : "2px solid white",
                                backgroundColor: t.isCompleted ? "#9FF6C7" : "#34444D",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            {t.isCompleted ? <CheckIcon sx={{ color: "#266D47" }} /> : index + 1}
                        </div>
                        <div style={{ alignSelf: "center" }}>
                            <Typography sx={{ alignSelf: "center", margin: "0px 30px 0px 30px" }} color={activeTopic === t ? "primary" : "white"} variant="h6">
                                {t.name}
                            </Typography>
                            {t.isCompleted && (
                                <Typography sx={{ alignSelf: "center", margin: "0px 30px 0px 30px", color: "#9FF6C7" }} variant="body2">
                                    Completed
                                </Typography>
                            )}
                        </div>
                        {index < topics.length - 1 && ( // Check if it's not the last topic
                            <div
                                style={{
                                    position: "absolute",
                                    height: "80%",
                                    width: "2px",
                                    backgroundColor: "white",
                                    left: "57px",
                                    top: "30px",
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            {/* active topic section */}
            <div style={{ padding: 30, marginLeft: 40, width: "50%" }}>
                <Typography variant="h3">{activeTopic?.name}</Typography>
                <div style={{ marginTop: "50px", marginBottom: "50px" }}>
                    <Typography variant="body2" fontWeight={200}>
                        Your progress for this topic
                    </Typography>
                    <LinearProgressWithLabel value={getProgressValue() || 0} />
                </div>
                <Typography sx={{ color: "white", marginTop: 5 }} variant="h6">
                    Exercises
                </Typography>
                <ExerciseTable exercises={activeTopic?.exercises || []} />
            </div>
        </div>
    );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress sx={{ height: "20px", borderRadius: 2 }} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="white">{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
