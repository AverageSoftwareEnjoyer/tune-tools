import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { IMAGE_SIZE_MAPPINGS, ImageSizeOptions } from "@model/image.model";
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

    protected readonly IMAGE_SIZE_MAPPINGS = IMAGE_SIZE_MAPPINGS;
}
