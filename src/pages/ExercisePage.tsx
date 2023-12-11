import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getExerciseByid } from "../redux/slices/exercises";
import { createSubmission, clearPassedState, getSubmissionsByExerciseId } from "../redux/slices/submissions";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { ISubmission } from "../@types/submission";
import ExerciseDescription from "../components/ExerciseDescription";
import ExerciseSubmissions from "../components/ExerciseSubmissions";
import { GridEventListener, GridRowParams } from "@mui/x-data-grid";

const ExercisePage = () => {
    const dispatch = useAppDispatch();
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const { exercise, isLoading } = useAppSelector((state) => state.exercises);
    const { user } = useAppSelector((state) => state.user);
    const [editorValue, setEditorValue] = useState("");
    const [headerStateIsDescription, setHeaderStateIsDescription] = useState(true);
    const { submissions, isSubmitting, passed, failedCases, error } = useAppSelector((state) => state.submissions);

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    // look into the types for monaco
    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: any) {
        editorRef.current = editor;
    }

    // Handler for creating new submission
    const handleSubmission = () => {
        if (isSubmitting) return;

        if (editorRef.current != null && exerciseId != null && user?.id != null) {
            const newSubmission: ISubmission = {
                userId: user?.id,
                submittedCode: editorRef.current.getValue(),
                exerciseId: exerciseId,
            };
            dispatch(createSubmission(newSubmission));
        }
    };

    // Handler for when an existing submission is clicked
    const handleSubmissionClick: GridEventListener<"rowClick"> = (params: GridRowParams) => {
        setEditorValue(params.row.submittedCode);
    };

    useEffect(() => {
        dispatch(clearPassedState());
        if (exerciseId) {
            dispatch(getExerciseByid(exerciseId));
            dispatch(getSubmissionsByExerciseId(exerciseId));
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
                            <div style={{ display: "flex", marginBottom: "20px" }}>
                                <Button onClick={(e) => setHeaderStateIsDescription(true)} style={{ width: "50%" }} variant={headerStateIsDescription ? "contained" : "outlined"}>
                                    Description
                                </Button>
                                <Button onClick={(e) => setHeaderStateIsDescription(false)} style={{ width: "50%" }} variant={!headerStateIsDescription ? "contained" : "outlined"}>
                                    Submissions
                                </Button>
                            </div>
                            {headerStateIsDescription && exercise !== null && <ExerciseDescription exercise={exercise} />}
                            {!headerStateIsDescription && <ExerciseSubmissions submissions={submissions} handleClick={handleSubmissionClick} />}
                        </div>

                        <div className="right" style={{ width: "60%" }}>
                            <Editor height="70vh" defaultLanguage="java" defaultValue={`${exercise?.starterCode}`} value={editorValue} theme="vs-dark" onMount={handleEditorDidMount} options={{ formatOnPaste: true, formatOnType: true }} />
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

export default ExercisePage;
