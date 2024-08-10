import { NgStyle } from "@angular/common";
import { ChangeDetectionStrategy, Component, Signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { fromEvent, map } from "rxjs";

@Component({
    selector: "app-scroll-to-top-button",
    standalone: true,
    imports: [MatButtonModule, MatIconModule, NgStyle],
    templateUrl: "./scroll-to-top-button.component.html",
    styleUrl: "./scroll-to-top-button.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopButtonComponent {
    protected windowScrolled: Signal<boolean> = toSignal(
        fromEvent(window, "scroll").pipe(map(() => window.scrollY > 30)),
        { initialValue: false },
    );

    /**
     * Scrolls to the top of the document body if the Y-axis scroll exists.
     *
     * @protected
     */
    protected scrollToTop(): void {
        const currentScroll = window.scrollY;
        if (currentScroll > 0) {
            window.requestAnimationFrame(this.scrollToTop.bind(this));
            window.scrollTo(
                0,
                currentScroll > 5 ? currentScroll - currentScroll / 8 : 0,
            );
        }
    }
}
