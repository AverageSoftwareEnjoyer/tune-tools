import {
    RecentlyPlayedItem,
    RecentlyPlayedItemGrouped,
    RecentlyPlayedItemLimited,
    RecentlyPlayedResponse,
} from "@model/recently-played.model";

import {
    mockExternalUrls,
    mockTopTrack,
    mockTopTrackLimited,
} from "./top-items.model.mock";

export const mockRecentlyPlayedItem: RecentlyPlayedItem = {
    track: mockTopTrack,
    played_at: new Date(2024, 10, 23),
    context: {
        type: "album",
        href: "",
        external_urls: mockExternalUrls,
        uri: "",
    },
};

export const mockRecentlyPlayedResponse: RecentlyPlayedResponse = {
    href: "",
    limit: 50,
    next: null,
    cursors: {
        after: "1234",
        before: "12345",
    },
    items: [mockRecentlyPlayedItem, mockRecentlyPlayedItem],
    total: 2,
};

export const mockRecentlyPlayedItemLimited: RecentlyPlayedItemLimited = {
    played_at: new Date(2024, 10, 23),
    name: mockTopTrackLimited.name,
    artists: mockTopTrackLimited.artists,
    external_urls: mockExternalUrls,
};

export const mockRecentlyPlayedItemGrouped: RecentlyPlayedItemGrouped = {
    name: mockTopTrackLimited.name,
    artists: mockTopTrackLimited.artists,
    external_urls: mockExternalUrls,
    score: 0,
    normalizedScore: 0,
};
