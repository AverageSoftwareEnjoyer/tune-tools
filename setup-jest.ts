import "jest-preset-angular/setup-jest";

import structuredClone from "@ungap/structured-clone";
import { TextDecoder, TextEncoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

import crypto from "crypto";

Object.defineProperty(global, "crypto", {
    value: {
        subtle: crypto.webcrypto.subtle,
        getRandomValues: <T>(arr: T[]) => crypto.randomBytes(arr.length),
    },
});

Object.assign(global, { structuredClone });
