import {
    Album,
    AlbumLimited,
    SimplifiedArtist,
    SimplifiedArtistLimited,
    TopArtist,
    TopArtistLimited,
    TopArtists,
    TopGenreLimited,
    TopTrack,
    TopTrackLimited,
    TopTracks,
} from "@model/top-items.model";
import { ExternalUrls, Image } from "@model/user.model";

export const mockExternalUrls: ExternalUrls = {
    spotify: "https://spotify.com/track/123",
};

export const mockImage: Image = {
    url: "https://image.url",
    height: 640,
    width: 640,
};

export const mockSimplifiedArtist: SimplifiedArtist = {
    name: "Artist Name",
    external_urls: mockExternalUrls,
    href: "",
    id: "",
    type: "artist",
    uri: "",
};

export const mockAlbum: Album = {
    external_urls: mockExternalUrls,
    name: "Album Name",
    album_type: "ALBUM",
    total_tracks: 10,
    images: [mockImage, mockImage, mockImage],
    release_date: "2020-01-01",
    available_markets: [],
    release_date_precision: "year",
    restrictions: {
        reason: "market",
    },
    artists: [mockSimplifiedArtist],
    href: "",
    id: "",
    type: "album",
    uri: "",
};

export const mockTopArtist: TopArtist = {
    name: "Artist Name",
    external_urls: mockExternalUrls,
    followers: {
        href: null,
        total: 0,
    },
    genres: ["rock"],
    images: [mockImage, mockImage, mockImage],
    href: "",
    id: "",
    popularity: 0,
    type: "artist",
    uri: "",
};

export const mockTopTrack: TopTrack<Album, TopArtist> = {
    album: mockAlbum,
    external_urls: mockExternalUrls,
    name: "Track Name",
    artists: [mockTopArtist, mockTopArtist],
    available_markets: [],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    external_ids: {
        isrc: "",
        ean: "",
        upc: "",
    },
    restrictions: {
        reason: "market",
    },
    preview_url: null,
    track_number: 0,
    is_local: false,
    href: "",
    id: "",
    popularity: 0,
    type: "track",
    uri: "",
};

export const mockAlbumLimited: AlbumLimited = {
    album_type: "ALBUM",
    external_urls: mockExternalUrls,
    images: [mockImage, mockImage, mockImage],
    name: "Album Name",
    release_date: "2020-01-01",
    total_tracks: 10,
};

export const mockTopArtistLimited: TopArtistLimited = {
    external_urls: mockExternalUrls,
    genres: ["rock"],
    images: [mockImage, mockImage, mockImage],
    name: "Artist Name",
};

export const mockSimplifiedArtistLimited: SimplifiedArtistLimited = {
    external_urls: mockExternalUrls,
    name: "Artist Name",
};

export const mockTopTrackLimited: TopTrackLimited = {
    album: mockAlbumLimited,
    external_urls: mockExternalUrls,
    name: "Track Name",
    artists: `${mockSimplifiedArtistLimited.name}, ${mockSimplifiedArtistLimited.name}`,
};

export const mockTopGenreLimited: TopGenreLimited = {
    name: "rock",
    score: 99,
};

export const mockTopTracks: TopTracks = {
    href: "https://spotify.com/tracks/123",
    limit: 50,
    next: null,
    offset: 0,
    previous: null,
    total: 50,
    items: [mockTopTrack],
};

export const mockTopArtists: TopArtists = {
    href: "https://spotify.com/artists/123",
    limit: 50,
    next: null,
    offset: 0,
    previous: null,
    total: 50,
    items: [mockTopArtist],
};
