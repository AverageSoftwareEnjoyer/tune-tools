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

export interface TopItemsMappings {
    artists: TopArtistLimited;
    tracks: TopTrackLimited;
}

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
    U extends SimplifiedArtist | SimplifiedArtistLimited,
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

export interface TopItems<
    T extends TopTrack<Album, SimplifiedArtist> | TopArtist,
> {
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
} as const;

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
    TopTrack<AlbumLimited, SimplifiedArtistLimited>,
    "album" | "external_urls" | "name" | "artists"
>;

export type TopArtistLimited = Pick<
    TopArtist,
    "external_urls" | "name" | "images" | "genres"
>;

export type SimplifiedArtistLimited = Pick<TopArtist, "external_urls" | "name">;

export enum TopItemsRoutes {
    TopTracks = "top-tracks",
    TopArtists = "top-artists",
    TopGenres = "top-genres",
}

export enum TopItemsColumnsKeys {
    Index = "index",
    Image = "image",
    Name = "name",
    Artists = "artists",
    Link = "link",
    Expand = "expand",
    Genres = "genres",
}

export const TOP_TRACKS_COLUMNS_MAPPINGS = {
    [TopItemsColumnsKeys.Index]: "No.",
    [TopItemsColumnsKeys.Image]: "Album",
    [TopItemsColumnsKeys.Name]: "Name",
    [TopItemsColumnsKeys.Artists]: "Artists",
    [TopItemsColumnsKeys.Link]: "Link",
} as const;

export const TOP_TRACKS_COLUMNS_MAPPINGS_FILTERED = {
    [TopItemsColumnsKeys.Index]: "No.",
    [TopItemsColumnsKeys.Image]: "Album",
    [TopItemsColumnsKeys.Name]: "Info",
    [TopItemsColumnsKeys.Link]: "Link",
} as const;

export type TopTracksColumnsMappingsType = typeof TOP_TRACKS_COLUMNS_MAPPINGS;

export type TopTracksColumnsMappingsFilteredType =
    typeof TOP_TRACKS_COLUMNS_MAPPINGS_FILTERED;

export const TOP_ARTISTS_COLUMNS_MAPPINGS = {
    [TopItemsColumnsKeys.Index]: "No.",
    [TopItemsColumnsKeys.Image]: "Image",
    [TopItemsColumnsKeys.Name]: "Name",
    [TopItemsColumnsKeys.Genres]: "Genres",
    [TopItemsColumnsKeys.Link]: "Link",
} as const;

export const TOP_ARTISTS_COLUMNS_MAPPINGS_FILTERED = {
    [TopItemsColumnsKeys.Index]: "No.",
    [TopItemsColumnsKeys.Image]: "Image",
    [TopItemsColumnsKeys.Name]: "Info",
    [TopItemsColumnsKeys.Link]: "Link",
} as const;

export type TopArtistsColumnsMappingsType = typeof TOP_ARTISTS_COLUMNS_MAPPINGS;

export type TopArtistsColumnsMappingsFilteredType =
    typeof TOP_ARTISTS_COLUMNS_MAPPINGS_FILTERED;

export interface TopItemsColumnsMappings {
    artists:
        | TopArtistsColumnsMappingsType
        | TopArtistsColumnsMappingsFilteredType;
    tracks: TopTracksColumnsMappingsType | TopTracksColumnsMappingsFilteredType;
}

// TODO: Genres
