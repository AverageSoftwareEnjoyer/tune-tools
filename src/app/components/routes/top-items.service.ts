import { Injectable } from "@angular/core";
import {
    Album,
    AlbumLimited,
    SimplifiedArtist,
    SimplifiedArtistLimited,
    TopArtist,
    TopArtistLimited,
    TopGenreLimited,
    TopTrack,
    TopTrackLimited,
} from "@model/top-items.model";

@Injectable({
    providedIn: "root",
})
export class TopItemsService {
    /**
     * Simplifies the `TopTrack` by transforming it to include only essential fields.
     *
     * @param track - The object to be converted.
     * @returns An object containing a subset of properties from the original one.
     */
    convertTopTrackToLimited(
        track: TopTrack<Album, SimplifiedArtist>,
    ): TopTrackLimited {
        const { album, external_urls, name, artists } = structuredClone(track);
        return {
            album: this.convertAlbumToLimited(album),
            external_urls,
            name,
            artists: artists.map((artist) =>
                this.convertSimplifiedArtistToLimited(artist),
            ),
        };
    }

    /**
     * Simplifies the `Album` by transforming it to include only essential fields.
     *
     * @param album - The object to be converted.
     * @returns An object containing a subset of properties from the original one.
     */
    convertAlbumToLimited(album: Album): AlbumLimited {
        const {
            external_urls,
            name,
            album_type,
            total_tracks,
            images,
            release_date,
        } = structuredClone(album);
        return {
            external_urls,
            name,
            album_type,
            total_tracks,
            images,
            release_date,
        };
    }

    /**
     * Simplifies the `SimplifiedArtist` by transforming it to include only essential fields.
     *
     * @param artist - The object to be converted.
     * @returns An object containing a subset of properties from the original one.
     */
    convertSimplifiedArtistToLimited(
        artist: SimplifiedArtist,
    ): SimplifiedArtistLimited {
        const { external_urls, name } = structuredClone(artist);
        return { external_urls, name };
    }

    /**
     * Simplifies the `Artist` by transforming it to include only essential fields.
     *
     * @param artist - The object to be converted.
     * @returns An object containing a subset of properties from the original one.
     */
    convertTopArtistToLimited(artist: TopArtist): TopArtistLimited {
        const { external_urls, name, images, genres } = structuredClone(artist);
        return { external_urls, name, images, genres };
    }

    /**
     * Converts an array of `TopArtist` objects to `GenresLimited`.
     *
     * @param artist - The array of objects to be converted.
     * @returns An array containing genres with their names and scores
     */
    convertTopArtistsToTopGenres(artists: TopArtist[]): TopGenreLimited[] {
        return Array.from(
            artists
                .flatMap(({ genres }) => genres)
                .reduce(
                    (acc, curr) => acc.set(curr, (acc.get(curr) ?? 0) + 1),
                    new Map<string, number>(),
                ),
        )
            .map(([key, value]) => ({ name: key, score: value }))
            .filter(({ score }) => score > 1)
            .sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);
    }
}
