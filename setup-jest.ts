import "jest-preset-angular/setup-jest";

import { TextDecoder, TextEncoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

import crypto from "crypto";

Object.defineProperty(global, "crypto", {
    value: {
        subtle: crypto.webcrypto.subtle,
        getRandomValues: <T>(arr: T[]) => crypto.randomBytes(arr.length),
    },
});
