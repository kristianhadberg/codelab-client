export type IUser = {
    id: number,
    username: string,
}

export type IUserState = {
    isLoading: boolean;
    user: IUser | null;
    error: string | null;
}