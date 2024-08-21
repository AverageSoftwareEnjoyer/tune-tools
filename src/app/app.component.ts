import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SpinnerComponent } from "@lib/spinner/spinner.component";

import { FooterComponent } from "./components/base/footer/footer.component";
import { HeaderComponent } from "./components/base/header/header.component";
import { MainContentComponent } from "./components/base/main-content/main-content.component";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [
        AsyncPipe,
        FooterComponent,
        HeaderComponent,
        MainContentComponent,
        RouterOutlet,
        SpinnerComponent,
    ],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
