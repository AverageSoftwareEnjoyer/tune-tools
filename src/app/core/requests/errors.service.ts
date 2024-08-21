import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorMessages } from "@model/requests-state.model";

@Injectable({
    providedIn: "root",
})
export class ErrorsService {
    readonly #matSnackbar = inject(MatSnackBar);

    /**
     * Opens a snackbar with an error message.
     *
     * @param [message=ErrorMessages.Default] Error message to be displayed inside the snackbar.
     */
    openErrorSnackbar(message = ErrorMessages.Default): void {
        this.#matSnackbar.open(message);
    }
}
