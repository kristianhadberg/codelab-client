import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getExerciseByid } from "../redux/slices/exercises";

const ExercisePage = () => {
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const dispatch = useAppDispatch();
    const { exercise, isLoading } = useAppSelector((state) => state.exercises);

    useEffect(() => {
        if (exerciseId) {
            dispatch(getExerciseByid(exerciseId));
        }
    }, [dispatch, exerciseId]);

    return (
        <div>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography variant="h2">Exercise</Typography>
                </>
            )}
        </div>
    );
};

export default ExercisePage;
