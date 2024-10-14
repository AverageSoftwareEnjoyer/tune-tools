import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { LocalStorageService } from "@core/auth/local-storage.service";
import { AuthStateService } from "@state/auth-state.service";

import { SettingsComponent } from "./settings.component";

describe("SettingsComponent", () => {
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;
    let authStateService: AuthStateService;
    let localStorageService: LocalStorageService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SettingsComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
            ],
        });

        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        authStateService = TestBed.inject(AuthStateService);
        localStorageService = TestBed.inject(LocalStorageService);
        router = TestBed.inject(Router);
        router.navigateByUrl = jest.fn().mockReturnValue(Promise.resolve(true));
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should log the current user out by clearing local storage and redirecting them to the home page", () => {
        jest.spyOn(localStorageService, "getItem").mockReturnValue(
            "different-state",
        );
        jest.spyOn(localStorageService, "clearLocalStorageItems");

        const logoutButton = fixture.debugElement.query(
            By.css(".mat-color-error"),
        ).nativeElement as HTMLButtonElement;
        logoutButton.click();

        expect(localStorageService.clearLocalStorageItems).toHaveBeenCalled();
        expect(authStateService.isUserAuthenticated).toBe(false);
        expect(router.navigateByUrl).toHaveBeenCalledWith("");
    });
});
