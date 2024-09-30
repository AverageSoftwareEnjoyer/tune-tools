export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: null;
    total: number;
}

export interface Image {
    url: string | null;
    height: number | null;
    width: number | null;
}

export interface UserInfo {
    country: string;
    display_name: string | null;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

export type UserInfoLimited = Pick<
    UserInfo,
    "country" | "display_name" | "external_urls" | "id" | "images"
>;
