import { IExercise } from "./exercise";

export type ITopic = {
    id: number,
    name: string,
    description: string
    isCompleted: boolean,
    exercises: IExercise[]
}

export type ITopicState = {
    isLoading: boolean;
    error: string | null;
    topics: ITopic[];
    topic: ITopic | null;
}