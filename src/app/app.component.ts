import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { map, Observable, shareReplay } from "rxjs";

import { FooterComponent } from "./components/base/footer/footer.component";
import { HeaderComponent } from "./components/base/header/header.component";
import { MainContentComponent } from "./components/base/main-content/main-content.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        MainContentComponent,
        FooterComponent,
        AsyncPipe,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
})
export class AppComponent {
    protected isHandset$: Observable<boolean>;

    readonly #breakpointObserver = inject(BreakpointObserver);

    constructor() {
        this.isHandset$ = this.#breakpointObserver
            .observe(Breakpoints.Handset)
            .pipe(
                map(({ matches }) => matches),
                shareReplay(),
            );
    }
}
