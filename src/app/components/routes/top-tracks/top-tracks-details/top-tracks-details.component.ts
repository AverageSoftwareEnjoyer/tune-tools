import { TitleCasePipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Signal,
    ViewEncapsulation,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
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
        TitleCasePipe,
    ],
    templateUrl: "./top-tracks-details.component.html",
    styleUrl: "./top-tracks-details.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TopTracksDetailsComponent {
    @Input() track!: TopTrackLimited;
    @Input() isBelowMediumWidth!: Signal<boolean>;

    protected readonly ImageSizeOptions = ImageSizeOptions;
}
