import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import exercises, { getExerciseByid } from "../redux/slices/exercises";
import { createSubmission, clearPassedState } from "../redux/slices/submissions";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { ISubmission } from "../@types/submission";
import { ITestCase } from "../@types/testCase";

const ExercisePage = () => {
    const dispatch = useAppDispatch();
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { exercise, isLoading } = useAppSelector((state) => state.exercises);
    const { submissions, isSubmitting, passed, failedCases, error } = useAppSelector((state) => state.submissions);

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
        dispatch(clearPassedState());
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
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div className="left" style={{ width: "35%" }}>
                            <Typography variant="h4">{exercise?.name}</Typography>
                            <Typography variant="body2">{exercise?.description}</Typography>
                            <Typography variant="h4" style={{ marginTop: "50px" }}>
                                Expected output:
                            </Typography>
                            <code style={{ padding: "10px", display: "block", backgroundColor: "#3c4d57", borderRadius: "5px" }}>{exercise?.expectedOutput}</code>
                            {exercise?.testCases ? <TestCases testCases={exercise?.testCases}></TestCases> : <></>}
                        </div>
                        <div className="right" style={{ width: "60%" }}>
                            <Editor height="70vh" defaultLanguage="java" defaultValue={`${exercise?.starterCode}`} theme="vs-dark" onMount={handleEditorDidMount} options={{ formatOnPaste: true, formatOnType: true }} />
                            <div style={{ display: "flex" }}>
                                <Button onClick={handleSubmission} style={{ width: "50%", height: "50px" }} color="success" variant="contained">
                                    {isSubmitting ? <CircularProgress /> : <Typography>Submit</Typography>}
                                </Button>
                                {passed == null ? (
                                    <></>
                                ) : passed ? (
                                    <Typography sx={{ width: "50%", textAlign: "center", color: "limegreen" }} variant="h6">
                                        Passed
                                    </Typography>
                                ) : (
                                    <div style={{ width: "50%" }}>
                                        <Typography sx={{ textAlign: "center" }} variant="h6">
                                            {failedCases}
                                        </Typography>
                                        {error && (
                                            <Typography sx={{ textAlign: "center" }} variant="h6">
                                                {error}
                                            </Typography>
                                        )}
                                        <Typography sx={{ textAlign: "center" }} color="error" variant="h6">
                                            Failed
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

type Props = {
    testCases: ITestCase[];
};

const TestCases = ({ testCases }: Props) => {
    return (
        <>
            {testCases.map((testCase, index) => (
                <div key={index}>
                    <Typography variant="h6" style={{ marginTop: "20px" }}>
                        Test case {index + 1}:
                    </Typography>
                    <code style={{ padding: "10px", display: "block", backgroundColor: "#3c4d57", borderRadius: "5px" }}>
                        <div style={{ display: "flex" }}>
                            <Typography fontWeight="bold">Input: &nbsp;</Typography>
                            <Typography>{testCase.input}</Typography>
                        </div>
                        <div style={{ display: "flex" }}>
                            <Typography fontWeight="bold">Expected output: &nbsp;</Typography>
                            <Typography>{testCase.expectedOutput}</Typography>
                        </div>
                    </code>
                </div>
            ))}
        </>
    );
};

export default ExercisePage;
