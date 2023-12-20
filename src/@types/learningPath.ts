import { ILearningPathProgress } from "./learningPathProgress";
import { ITopic } from "./topic";

export type ILearningPath = {
    id: number,
    name: string
    topics: ITopic[]
    learningPathProgress: ILearningPathProgress;
}

export type ILearningPathState = {
    isLoading: boolean;
    error: string | null;
    learningPaths: ILearningPath[];
    learningPath: ILearningPath | null;
    learningPathProgress: ILearningPathProgress | null;
}