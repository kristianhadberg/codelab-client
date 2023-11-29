export type ISubmission = {
    id?: number,
    userId: number,
    submittedCode: string,
    exerciseId: string,
    submissionDate?: Date;
}

export type ISubmissionState = {
    isLoading: boolean;
    isSubmitting: boolean;
    error: string | null;
    submissions: ISubmission[];
    passed: boolean | null;
    failedCases: string[];
}