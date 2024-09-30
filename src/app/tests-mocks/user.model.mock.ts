import { UserInfo, UserInfoLimited } from "@model/user.model";

import { mockImage } from "./top-items.model.mock";

export const mockUserInfo: UserInfo = {
    country: "PL",
    display_name: "test_user",
    email: "test_user@test_user.com",
    explicit_content: {
        filter_enabled: false,
        filter_locked: false,
    },
    external_urls: {
        spotify: "http://spotify.com/test_user",
    },
    followers: {
        href: null,
        total: 0,
    },
    href: "http://spotify.com/test_user",
    id: "test",
    images: [mockImage],
    product: "premium",
    type: "user",
    uri: "",
};

export const mockUserInfoLimited: UserInfoLimited = {
    country: "PL",
    display_name: "test_user",
    external_urls: {
        spotify: "http://spotify.com/test_user",
    },
    id: "test",
    images: [mockImage],
};
