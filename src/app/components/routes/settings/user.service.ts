import { Injectable } from "@angular/core";
import { UserInfo, UserInfoLimited } from "@model/user.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    /**
     * Simplifies the `UserInfo` by transforming it to include only essential fields.
     *
     * @param userInfo - The object to be converted.
     * @returns An object containing a subset of properties from the original one.
     */
    convertUserInfoToLimited(userInfo: UserInfo): UserInfoLimited {
        const { country, display_name, external_urls, id, images } =
            structuredClone(userInfo);
        return {
            country,
            display_name,
            id,
            external_urls,
            images,
        };
    }
}
