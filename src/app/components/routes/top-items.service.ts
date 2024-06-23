import { Injectable } from "@angular/core";
import {
    Album,
    AlbumLimited,
    TopArtist,
    TopArtistLimited,
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
        track: TopTrack<Album, TopArtist>,
    ): TopTrackLimited {
        const { album, external_urls, name, artists } = structuredClone(track);
        return {
            album: this.convertAlbumToLimited(album),
            external_urls,
            name,
            artists: artists.map((artist) =>
                this.convertTopArtistToLimited(artist),
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
     * Simplifies the `Artist` by transforming it to include only essential fields.
     *
     * @param artists - The object to be converted.
     * @returns An object containing a subset of properties from the original one.
     */
    convertTopArtistToLimited(artist: TopArtist): TopArtistLimited {
        const { external_urls, name, images, genres } = structuredClone(artist);
        return { external_urls, name, images, genres };
    }
}
