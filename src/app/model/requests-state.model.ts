export interface LoadingState {
    loadingMap: Map<string, boolean>;
    loadingMessage?: string;
}

export interface LoadingData {
    url: string;
    isLoading: boolean;
    message?: string;
}

export enum ErrorMessages {
    Default = "An unknown error has occurred",
    Timeout = "Spotify server has timed out",
    Auth = "You are not authenticated",
}
