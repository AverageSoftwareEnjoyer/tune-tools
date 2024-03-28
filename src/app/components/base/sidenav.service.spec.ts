import { TestBed } from "@angular/core/testing";

import { SidenavService } from "./sidenav.service";

describe("SidenavService", () => {
    let sidenavService: SidenavService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        sidenavService = TestBed.inject(SidenavService);
    });

    it("should be created", () => {
        expect(sidenavService).toBeTruthy();
    });

    it("should toggle sidenav", async () => {
        const promise = new Promise<void>((resolve) => {
            const subscription = sidenavService.toggleSidenav$.subscribe(() => {
                resolve();
                subscription.unsubscribe();
            });
        });

        sidenavService.toggleSidenav();

        await expect(promise).resolves.toBeUndefined();
    });
});
