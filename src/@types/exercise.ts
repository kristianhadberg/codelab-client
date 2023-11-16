export type IExercise = {
    id: number,
    name: string,
    starterCode: string,
}

export type IExerciseState = {
    isLoading: boolean;
    error: string | null;
    exercises: IExercise[];
}