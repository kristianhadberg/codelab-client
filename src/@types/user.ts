export type IUser = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    token: string
}

export type IUserState = {
    isLoading: boolean;
    user: IUser | null;
    error: string | null;
}