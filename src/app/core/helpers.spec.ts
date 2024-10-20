import { TestBed } from "@angular/core/testing";
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    Router,
    RouterStateSnapshot,
} from "@angular/router";
import { TimeRangeOptions, TopItemsRoutes } from "@model/top-items.model";

import { routeParamGuard } from "./helpers";

describe("timeRangeGuard", () => {
    let router: Router;
    let guard: CanActivateFn;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        guard = routeParamGuard(
            TopItemsRoutes.TopTracks,
            TimeRangeOptions,
            "timeRange",
            TimeRangeOptions.ShortTerm,
        );
        router = TestBed.inject(Router);
    });

    it("should allow navigation if timeRange is valid", () => {
        const route = {
            params: { timeRange: TimeRangeOptions.LongTerm },
        };
        const result = TestBed.runInInjectionContext(() =>
            guard(
                route as unknown as ActivatedRouteSnapshot,
                {} as unknown as RouterStateSnapshot,
            ),
        );

        expect(result).toBe(true);
    });

    it("should redirect to default route if timeRange is invalid", () => {
        const route = { params: { timeRange: "InvalidTimeRange" } };
        const result = TestBed.runInInjectionContext(() =>
            guard(
                route as unknown as ActivatedRouteSnapshot,
                {} as unknown as RouterStateSnapshot,
            ),
        );

        expect(result).toEqual(
            router.parseUrl(
                `${TopItemsRoutes.TopTracks}/${TimeRangeOptions.ShortTerm}`,
            ),
        );
    });
});
