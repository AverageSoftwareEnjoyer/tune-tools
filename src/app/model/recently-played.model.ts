import { ValueOf } from "@core/helpers";

import {
    Album,
    SimplifiedArtist,
    TopTrack,
    TopTrackLimited,
} from "./top-items.model";
import { ExternalUrls } from "./user.model";

export const RECENTLY_PLAYED_ROUTES = {
    Default: "default",
    Grouped: "grouped",
} as const;

export type RecentlyPlayedRoutesOptions = ValueOf<
    typeof RECENTLY_PLAYED_ROUTES
>;

export interface RecentlyPlayedResponse {
    href: string;
    limit: number;
    next: string | null;
    cursors: Cursors;
    items: RecentlyPlayedItem[];
    total: number;
}

export interface Cursors {
    after: string;
    before: string;
}

export interface RecentlyPlayedItem {
    track: TopTrack<Album, SimplifiedArtist>;
    played_at: Date;
    context: Context;
}

export interface Context {
    type: string;
    href: string;
    external_urls: ExternalUrls;
    uri: string;
}

export interface RecentlyPlayedParams extends Record<string, number> {
    before: number;
    limit: 50;
}

type RequiredFromTopTrackLimited = Pick<
    TopTrackLimited,
    "name" | "artists" | "external_urls"
>;

export interface RecentlyPlayedItemLimited
    extends Pick<RecentlyPlayedItem, "played_at">,
        RequiredFromTopTrackLimited {}

export interface RecentlyPlayedItemGrouped extends RequiredFromTopTrackLimited {
    score: number;
    normalizedScore: number;
}

export const RECENTLY_PLAYED_COLUMNS_KEYS_DEFAULT = {
    Index: "index",
    Name: "name",
    Date: "date",
    Link: "link",
} as const;

export type RecentlyPlayedColumnKeysDefault = ValueOf<
    typeof RECENTLY_PLAYED_COLUMNS_KEYS_DEFAULT
>;

export const RECENTLY_PLAYED_COLUMNS_KEYS_MAPPINGS_DEFAULT = {
    [RECENTLY_PLAYED_COLUMNS_KEYS_DEFAULT.Index]: "No.",
    [RECENTLY_PLAYED_COLUMNS_KEYS_DEFAULT.Name]: "Name",
    [RECENTLY_PLAYED_COLUMNS_KEYS_DEFAULT.Date]: "Date",
    [RECENTLY_PLAYED_COLUMNS_KEYS_DEFAULT.Link]: "Link",
} as const satisfies { [key in RecentlyPlayedColumnKeysDefault]: string };

export const RECENTLY_PLAYED_COLUMNS_KEYS_GROUPED = {
    Index: "index",
    Name: "name",
    Score: "score",
    Link: "link",
} as const;

export type RecentlyPlayedColumnKeysGrouped = ValueOf<
    typeof RECENTLY_PLAYED_COLUMNS_KEYS_GROUPED
>;

export const RECENTLY_PLAYED_COLUMNS_KEYS_MAPPINGS_GROUPED = {
    [RECENTLY_PLAYED_COLUMNS_KEYS_GROUPED.Index]: "No.",
    [RECENTLY_PLAYED_COLUMNS_KEYS_GROUPED.Name]: "Name",
    [RECENTLY_PLAYED_COLUMNS_KEYS_GROUPED.Score]: "No. of plays",
    [RECENTLY_PLAYED_COLUMNS_KEYS_GROUPED.Link]: "Link",
} as const satisfies { [key in RecentlyPlayedColumnKeysGrouped]: string };

export const RECENTLY_PLAYED_COLUMNS_KEYS_ALL = {
    ...RECENTLY_PLAYED_COLUMNS_KEYS_DEFAULT,
    ...RECENTLY_PLAYED_COLUMNS_KEYS_GROUPED,
} as const;
