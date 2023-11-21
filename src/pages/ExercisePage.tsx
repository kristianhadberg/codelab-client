import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getExerciseByid } from "../redux/slices/exercises";
import { createSubmission } from "../redux/slices/submissions";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { ISubmission } from "../@types/submission";
import { parse } from "path";

const ExercisePage = () => {
    const dispatch = useAppDispatch();
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { exercise, isLoading } = useAppSelector((state) => state.exercises);

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    // look into the types for monaco
    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: any) {
        editorRef.current = editor;
    }
    const handleSubmission = () => {
        if (editorRef.current != null && exerciseId != null) {
            const newSubmission: ISubmission = {
                submittedCode: editorRef.current.getValue(),
                exerciseId: exerciseId,
            };
            dispatch(createSubmission(newSubmission));
        }
    };

    useEffect(() => {
        if (exerciseId) {
            dispatch(getExerciseByid(exerciseId));
        }
    }, [exerciseId, dispatch]);

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
                            <Editor height="70vh" defaultLanguage="java" defaultValue={`${exercise?.starterCode}`} theme="vs-dark" onMount={handleEditorDidMount} options={{ formatOnPaste: true, formatOnType: true }} />
                            <button style={{ width: "100%" }} onClick={handleSubmission}>
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
