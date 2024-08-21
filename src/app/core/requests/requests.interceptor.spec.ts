import {
    HttpInterceptorFn,
    HttpRequest,
    HttpResponse,
} from "@angular/common/http";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "@env/environment";
import { ErrorMessages } from "@model/requests-state.model";
import { LoadingStateService } from "@state/loading-state.service";
import { firstValueFrom, map, of, throwError, timer } from "rxjs";

import { ErrorsService } from "./errors.service";
import { requestsInterceptor } from "./requests.interceptor";

describe("requestsInterceptor", () => {
    let loadingStateService: LoadingStateService;
    let errorsService: ErrorsService;

    const url = `${environment.apiBaseUrl}/test-endpoint`;

    const interceptor: HttpInterceptorFn = (req, next) =>
        TestBed.runInInjectionContext(() => requestsInterceptor(req, next));

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
        });

        loadingStateService = TestBed.inject(LoadingStateService);
        errorsService = TestBed.inject(ErrorsService);
    });

    it("should be created", () => {
        expect(interceptor).toBeTruthy();
    });

    it("should add and remove a request from the loading queue", async () => {
        const url = `${environment.apiBaseUrl}/test-endpoint`;
        const publishLoadingStateSpy = jest.spyOn(
            loadingStateService,
            "publishLoadingState",
        );
        const httpRequest = new HttpRequest("GET", url);
        const httpHandler = jest.fn().mockReturnValue(of(new HttpResponse()));

        await firstValueFrom(interceptor(httpRequest, httpHandler));

        expect(publishLoadingStateSpy).toHaveBeenNthCalledWith(1, {
            url,
            isLoading: true,
            message: undefined,
        });
        expect(publishLoadingStateSpy).toHaveBeenNthCalledWith(2, {
            url,
            isLoading: false,
            message: undefined,
        });
    });

    it("should display a snackbar if an HTTP error occurs", () => {
        const openErrorSnackbarSpy = jest.spyOn(
            errorsService,
            "openErrorSnackbar",
        );
        const httpRequest = new HttpRequest("GET", url);
        const httpHandler = jest
            .fn()
            .mockReturnValue(
                throwError(() => ({ error: { message: "test-error" } })),
            );

        interceptor(httpRequest, httpHandler).subscribe(() =>
            expect(openErrorSnackbarSpy).toHaveBeenCalledWith(
                ErrorMessages.Default,
            ),
        );
    });

    it("should display a snackbar if a timeout error occurs", fakeAsync(() => {
        const openErrorSnackbarSpy = jest.spyOn(
            errorsService,
            "openErrorSnackbar",
        );
        const httpRequest = new HttpRequest("GET", url);
        const httpHandler = jest
            .fn()
            .mockReturnValue(timer(6000).pipe(map(() => new HttpResponse())));

        interceptor(httpRequest, httpHandler).subscribe(() => {
            expect(openErrorSnackbarSpy).toHaveBeenCalledWith(
                ErrorMessages.Timeout,
            );
        });

        tick(7000);
    }));
});
