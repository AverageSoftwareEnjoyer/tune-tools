import { Component } from "@angular/core";
import { Observable, timer } from "rxjs";

import { DestroyClass } from "./destroy.class";

@Component({
    template: "",
})
export class MockComponent extends DestroyClass {
    data$: Observable<number> = timer(100, 100).pipe(this.untilDestroyed());
}

import { fakeAsync, flush, tick } from "@angular/core/testing";

describe("DestroyClass", () => {
    let component: MockComponent;

    beforeEach(() => {
        component = new MockComponent();
    });

    it("should stop emitting values from data$ observable upon component destruction", fakeAsync(() => {
        const subscriptionSpy = jest.fn();
        component.data$.subscribe(subscriptionSpy);

        tick(150);
        component.ngOnDestroy();
        tick(200);
        flush();

        expect(subscriptionSpy).toHaveBeenCalledTimes(1);
    }));
});
