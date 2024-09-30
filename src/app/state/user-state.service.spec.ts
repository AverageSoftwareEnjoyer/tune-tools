import { provideHttpClient } from "@angular/common/http";
import {
    HttpTestingController,
    provideHttpClientTesting,
} from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { UserHTTPService } from "@api/user-http.service";
import { environment } from "@env/environment";
import { mockUserInfo, mockUserInfoLimited } from "@mocks/user.model.mock";
import { UserInfo } from "@model/user.model";
import { of } from "rxjs";

import { UserStateService } from "./user-state.service";

describe("UserStateService", () => {
    let userStateService: UserStateService;
    let userHTTPService: UserHTTPService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        userStateService = TestBed.inject(UserStateService);
        httpTestingController = TestBed.inject(HttpTestingController);
        userHTTPService = TestBed.inject(UserHTTPService);
    });

    it("should be created", () => {
        expect(userStateService).toBeTruthy();
    });

    it("should publish new user info and update the state", () => {
        expect(userStateService.isUserInfoStateEmpty()).toBe(true);
        expect(userStateService.displayName()).toBe(null);
        expect(userStateService.countryImage()).toStrictEqual({
            url: null,
            height: null,
            width: null,
        });
        expect(userStateService.url()).toBe(null);
        expect(userStateService.id()).toBe(null);
        expect(userStateService.image()).toStrictEqual(null);

        userHTTPService.getUserInfo$ = jest
            .fn()
            .mockReturnValue(of(mockUserInfo));

        userStateService.publishUserInfo();

        expect(userStateService.isUserInfoStateEmpty()).toBe(false);
        expect(userStateService.displayName()).toBe(
            mockUserInfoLimited.display_name,
        );
        expect(userStateService.countryImage()).toStrictEqual({
            url: `https://flagsapi.com/${mockUserInfoLimited.country}/flat/64.png`,
            height: null,
            width: null,
        });
        expect(userStateService.url()).toBe(
            mockUserInfoLimited.external_urls.spotify,
        );
        expect(userStateService.id()).toBe(mockUserInfoLimited.id);
        expect(userStateService.image()).toStrictEqual(
            mockUserInfoLimited.images[0],
        );
    });

    it("should fetch and update top tracks for the specified time range", fakeAsync(() => {
        userHTTPService.getUserInfo$ = jest
            .fn()
            .mockReturnValue(of(mockUserInfo));

        userStateService.publishUserInfo();
        tick();

        expect(userStateService.displayName()).toStrictEqual(
            mockUserInfoLimited.display_name,
        );
        expect(userHTTPService.getUserInfo$).toHaveBeenCalledTimes(1);
    }));

    it("should fetch data again if data for the specified time range has not been loaded yed", fakeAsync(() => {
        jest.spyOn(userHTTPService, "getUserInfo$");

        userStateService.publishUserInfo();
        const req1 = httpTestingController.expectOne(
            `${environment.apiBaseUrl}/me`,
        );
        req1.flush(mockUserInfo);
        tick();
        expect(req1.request.method).toBe("GET");
        expect(userStateService.displayName()).toStrictEqual(
            mockUserInfoLimited.display_name,
        );

        userStateService.publishUserInfo();
        const req2 = httpTestingController.expectOne(
            `${environment.apiBaseUrl}/me`,
        );
        const mockNewUserInfo = {
            ...mockUserInfo,
            display_name: null,
        } satisfies UserInfo;
        req2.flush(mockNewUserInfo);
        tick();
        expect(req2.request.method).toBe("GET");

        expect(userStateService.displayName()).toEqual(
            mockNewUserInfo.display_name,
        );
        expect(userHTTPService.getUserInfo$).toHaveBeenCalledTimes(2);
    }));
});
