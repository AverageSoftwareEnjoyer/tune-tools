import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
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
    @Input() image!: Image;
    @Input() alt!: string;
    @Input() imageSize: ImageSizeOptions | null = null;

    protected readonly IMAGE_SIZE_MAPPINGS = IMAGE_SIZE_MAPPINGS;
}
