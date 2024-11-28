import structuredClone from "@ungap/structured-clone";
import { setupZoneTestEnv } from "jest-preset-angular/setup-env/zone";
import { TextDecoder, TextEncoder } from "util";

setupZoneTestEnv();

Object.assign(global, { TextDecoder, TextEncoder });

import crypto from "crypto";

Object.defineProperty(global, "crypto", {
    value: {
        subtle: crypto.webcrypto.subtle,
        getRandomValues: <T>(arr: T[]) => crypto.randomBytes(arr.length),
    },
});

Object.assign(global, { structuredClone });
