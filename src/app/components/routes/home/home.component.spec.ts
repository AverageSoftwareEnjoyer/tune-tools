import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";

import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let authService: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HomeComponent, NoopAnimationsModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {},
                    },
                },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        authService = TestBed.inject(AuthService);
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should redirect the user to Spotify auth flow on button click if they are not authenticated", () => {
        const redirectToAuthCodeFlowSpy = jest.spyOn(
            authService,
            "redirectToAuthCodeFlow$",
        );
        const button = fixture.debugElement.query(By.css("#cta-1"));

        button.triggerEventHandler("click", null);

        expect(redirectToAuthCodeFlowSpy).toHaveBeenCalledTimes(1);
    });
});
