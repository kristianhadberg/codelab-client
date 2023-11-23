import { ITestCase } from "./testCase";

export type IExercise = {
    id: number,
    name: string,
    description: string,
    starterCode: string,
    expectedOutput: string
    testCases: ITestCase[]
}

export type IExerciseState = {
    isLoading: boolean;
    error: string | null;
    exercises: IExercise[];
    exercise: IExercise | null;
}