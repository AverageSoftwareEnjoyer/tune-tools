import { TestBed } from "@angular/core/testing";
import { mockUserInfo, mockUserInfoLimited } from "@mocks/user.model.mock";

import { UserService } from "./user.service";

describe("UserService", () => {
    let userService: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        userService = TestBed.inject(UserService);
    });

    it("should be created", () => {
        expect(userService).toBeTruthy();
    });

    it("should convert UserInfo to UserInfoLimited", () => {
        const result = userService.convertUserInfoToLimited(mockUserInfo);
        expect(result).toEqual(mockUserInfoLimited);
    });
});
