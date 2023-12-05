
export type ILearningPath = {
    id: number,
    name: string
}

export type ILearningPathState = {
    isLoading: boolean;
    error: string | null;
    learningPaths: ILearningPath[];
}