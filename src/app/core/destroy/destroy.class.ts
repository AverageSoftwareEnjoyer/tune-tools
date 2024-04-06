import { Injectable, OnDestroy } from "@angular/core";
import { MonoTypeOperatorFunction, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable()
export class DestroyClass implements OnDestroy {
    #destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.#destroy$.next();
        this.#destroy$.complete();
    }

    /**
     * Provides an RxJS operator that automatically unsubscribes from the observable
     * when the component is destroyed. This method leverages the `takeUntil` operator
     * and a private `Subject`, `destroy$`, which emits a value upon component destruction.
     *
     * @returns A MonoTypeOperatorFunction that can be used with RxJS pipe.
     */
    protected untilDestroyed<T>(): MonoTypeOperatorFunction<T> {
        return takeUntil(this.#destroy$);
    }
}
