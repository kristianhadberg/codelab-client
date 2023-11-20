import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getExerciseByid } from "../redux/slices/exercises";
import Editor from "@monaco-editor/react";

const ExercisePage = () => {
    const dispatch = useAppDispatch();
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { exercise, isLoading } = useAppSelector((state) => state.exercises);

    const editorRef = useRef(null);

    // look into the types for monaco
    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    const click = () => {
        if (editorRef.current != null) {
            // console.log(editorRef.current.getValue());
            console.log("onclick");
        }
    };

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
                    <div style={{ display: "flex" }}>
                        <div className="left" style={{ width: "40%" }}>
                            <Typography variant="h4">{exercise?.name}</Typography>
                            <Typography variant="body2">{exercise?.description}</Typography>
                            <Typography variant="h4">Expected output:</Typography>
                            <code>{exercise?.expectedOutput}</code>
                        </div>
                        <div className="right" style={{ width: "60%" }}>
                            <Editor height="70vh" defaultLanguage="java" defaultValue={`${exercise?.starterCode}`} theme="vs-dark" onMount={handleEditorDidMount} />
                            <button style={{ width: "100%" }} onClick={click}>
                                Submit
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExercisePage;
