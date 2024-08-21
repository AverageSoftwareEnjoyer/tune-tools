import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoadingStateService } from "@state/loading-state.service";

@Component({
    selector: "app-spinner",
    standalone: true,
    imports: [MatProgressSpinnerModule],
    templateUrl: "./spinner.component.html",
    styleUrl: "./spinner.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
    protected readonly loadingStateService = inject(LoadingStateService);
}
