export type IExercise = {
    id: number,
    name: string,
    description: string,
    starterCode: string,
    expectedOutput: string
}

export type IExerciseState = {
    isLoading: boolean;
    error: string | null;
    exercises: IExercise[];
    exercise: IExercise | null;
}