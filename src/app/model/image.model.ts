export enum ImageSizeOptions {
    Small = "Small",
    Medium = "Medium",
    Big = "Big",
}

export const IMAGE_SIZE_MAPPINGS = {
    [ImageSizeOptions.Small]: 64,
    [ImageSizeOptions.Medium]: 128,
    [ImageSizeOptions.Big]: 256,
} as const;
