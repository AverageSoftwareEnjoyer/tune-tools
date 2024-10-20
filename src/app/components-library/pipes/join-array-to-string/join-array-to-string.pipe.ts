import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "joinArrayToString",
    standalone: true,
})
export class JoinArrayToStringPipe implements PipeTransform {
    transform(value: string[], separator = ", "): string {
        return value.length ? value.join(separator) : "Unknown";
    }
}
