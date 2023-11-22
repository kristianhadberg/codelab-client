export type ITopic = {
    id: number,
    name: string,
    description: string
}

export type ITopicState = {
    isLoading: boolean;
    error: string | null;
    topics: ITopic[];
    topic: ITopic | null;
}