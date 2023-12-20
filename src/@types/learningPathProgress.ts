
export type ILearningPathProgress = {
    completedExercises: number,
    totalExercises: number
    percentageCompleted: number
}

export type ILearningPathProgressState = {
    isLoading: boolean;
    error: string | null;
    learningPathProgress: ILearningPathProgress | null;
}