import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { AuthCallbackComponent } from "./auth-callback.component";

describe("AuthCallbackComponent", () => {
    let component: AuthCallbackComponent;
    let fixture: ComponentFixture<AuthCallbackComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthCallbackComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {},
                        queryParams: of({
                            code: "test-code",
                            state: "test-state",
                        }),
                    },
                },
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });

        fixture = TestBed.createComponent(AuthCallbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
