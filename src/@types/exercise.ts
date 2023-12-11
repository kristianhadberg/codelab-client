import { ITestCase } from "./testCase";

export enum Difficulty {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced"
}

export type IExercise = {
    id: number,
    name: string,
    description: string,
    starterCode: string,
    expectedOutput: string
    submissionCount: number,
    isLearningPathExercise: boolean,
    difficulty: Difficulty
    isCompleted: boolean,
    testCases: ITestCase[]
}

export type IExerciseState = {
    isLoading: boolean;
    error: string | null;
    exercises: IExercise[];
    exercise: IExercise | null;
}