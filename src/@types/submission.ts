export type ISubmission = {
    submittedCode: string,
    exerciseId: string,
}

export type ISubmissionState = {
    isLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
    submissions: ISubmission[];
    passed: boolean | null;
    failedCases: string[];
}