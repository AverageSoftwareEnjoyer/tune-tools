import { ExternalUrls, Followers, Image } from "./user.model";

export interface Restrictions {
    reason: "market" | "product" | "explicit";
}

export interface ExternalIds {
    isrc: string;
    ean: string;
    upc: string;
}

export type SimplifiedArtist = Omit<TopItem<"artist">, "popularity">;

export interface Album extends Omit<TopItem<"album">, "popularity"> {
    album_type: "ALBUM" | "COMPILATION" | "EP" | "SINGLE";
    total_tracks: number;
    available_markets: string[];
    images: Image[];
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions: Restrictions;
    artists: SimplifiedArtist[];
}

export type TopItemsType = "artists" | "tracks";

export type ItemType = "artist" | "track" | "album";

export interface TopItem<T extends ItemType> {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    popularity: number;
    type: T;
    uri: string;
}

export interface TopArtist extends TopItem<"artist"> {
    followers: Followers;
    genres: string[];
    images: Image[];
}

export interface TopTrack<
    T extends Album | AlbumLimited,
    U extends TopArtist | TopArtistLimited,
> extends TopItem<"track"> {
    album: T;
    artists: U[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    restrictions: Restrictions;
    preview_url: string | null;
    track_number: number;
    is_local: boolean;
}

export interface TopItems<T extends TopTrack<Album, TopArtist> | TopArtist> {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: null;
    total: number;
    items: T[];
}

export type TopArtists = TopItems<TopArtist>;

export type TopTracks = TopItems<TopTrack<Album, TopArtist>>;

export enum TimeRangeOptions {
    ShortTerm = "short_term",
    MediumTerm = "medium_term",
    LongTerm = "long_term",
}

export enum TimeRangeNames {
    ShortTerm = "Last 4 weeks",
    MediumTerm = "Last 6 months",
    LongTerm = "Last year",
}

export const TIME_RANGE_MAPPINGS: Record<TimeRangeOptions, TimeRangeNames> = {
    [TimeRangeOptions.ShortTerm]: TimeRangeNames.ShortTerm,
    [TimeRangeOptions.MediumTerm]: TimeRangeNames.MediumTerm,
    [TimeRangeOptions.LongTerm]: TimeRangeNames.LongTerm,
};

export interface TopItemsParams
    extends Record<string, TimeRangeOptions | number> {
    time_range: TimeRangeOptions;
    limit: 50;
    offset: 0;
}

export interface TopItemsByTimeRange<
    T extends TopTrackLimited | TopArtistLimited,
> {
    [TimeRangeOptions.ShortTerm]: T[];
    [TimeRangeOptions.MediumTerm]: T[];
    [TimeRangeOptions.LongTerm]: T[];
}

export interface TopItemsState<T extends TopTrackLimited | TopArtistLimited> {
    itemsByTimeRange: TopItemsByTimeRange<T>;
    currentTimeRange: TimeRangeOptions;
}

export type AlbumLimited = Pick<
    Album,
    | "external_urls"
    | "name"
    | "album_type"
    | "total_tracks"
    | "images"
    | "release_date"
>;

export type TopTrackLimited = Pick<
    TopTrack<AlbumLimited, TopArtistLimited>,
    "album" | "external_urls" | "name" | "artists"
>;

export type TopArtistLimited = Pick<
    TopArtist,
    "external_urls" | "name" | "images" | "genres"
>;

export enum TopItemsRoutes {
    TopTracks = "top-tracks",
    TopArtists = "top-artists",
    TopGenres = "top-genres",
}

// TODO: Genres
