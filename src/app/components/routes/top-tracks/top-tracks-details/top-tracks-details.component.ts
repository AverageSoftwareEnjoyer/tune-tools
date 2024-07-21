import { TitleCasePipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    input,
    ViewEncapsulation,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ItemImageComponent } from "@lib/item-image/item-image.component";
import { ImageSizeOptions } from "@model/image.model";
import { TopTrackLimited } from "@model/top-items.model";

@Component({
    selector: "app-top-tracks-details",
    standalone: true,
    imports: [
        ItemImageComponent,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
        MatTooltipModule,
        TitleCasePipe,
    ],
    templateUrl: "./top-tracks-details.component.html",
    styleUrl: "./top-tracks-details.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TopTracksDetailsComponent {
    track = input.required<TopTrackLimited>();

    isBelowMediumWidth = input.required<boolean>();

    protected readonly ImageSizeOptions = ImageSizeOptions;
}
