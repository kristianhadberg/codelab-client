export type ISubmission = {
    submittedCode: string,
    exerciseId: string
}

export type ISubmissionState = {
    isLoading: boolean;
    error: string | null;
    submissions: ISubmission[];
}