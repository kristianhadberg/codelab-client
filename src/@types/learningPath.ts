import { ITopic } from "./topic";

export type ILearningPath = {
    id: number,
    name: string
    topics: ITopic[]
}

export type ILearningPathState = {
    isLoading: boolean;
    error: string | null;
    learningPaths: ILearningPath[];
    learningPath: ILearningPath | null;
}