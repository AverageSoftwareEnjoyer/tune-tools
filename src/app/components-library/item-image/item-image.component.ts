import { NgOptimizedImage } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    signal,
} from "@angular/core";
import {
    IMAGE_SIZE_MAPPINGS,
    ImageSizeOptions,
    PLACEHOLDER_URL,
} from "@model/image.model";
import { Image } from "@model/user.model";

@Component({
    selector: "app-item-image",
    standalone: true,
    imports: [NgOptimizedImage],
    templateUrl: "./item-image.component.html",
    styleUrl: "./item-image.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemImageComponent {
    image = input.required<Image>();
    alt = input.required<string>();
    imageSize = input<ImageSizeOptions | null>(null);

    protected readonly placeholderUrl = signal<string | null>(null);
    protected readonly imageUrl = computed(
        () => this.placeholderUrl() ?? this.image().url,
    );

    protected readonly IMAGE_SIZE_MAPPINGS = IMAGE_SIZE_MAPPINGS;
    protected readonly PLACEHOLDER_URL = PLACEHOLDER_URL;

    /**
     * Sets the URL of the displayed image to a placeholder if an error occurs during the loading
     * of the regular image URL.
     */
    protected handleImageError(): void {
        this.placeholderUrl.set(PLACEHOLDER_URL);
    }
}
