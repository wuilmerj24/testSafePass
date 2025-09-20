/// <reference path="./node_modules/@nativescript/types/index.d.ts" />
/// <reference path="./typings/ios/arm64/objc!SafePasswordiOSLib.d.ts" />

declare module upinn {
    export module tech {
        export module safepasswordlib {
            export class PasswordStrength {
                public static class: java.lang.Class<upinn.tech.safepasswordlib.PasswordStrength>;
                public static WEAK: upinn.tech.safepasswordlib.PasswordStrength;
                public static MODERATE: upinn.tech.safepasswordlib.PasswordStrength;
                public static STRONG: upinn.tech.safepasswordlib.PasswordStrength;
                public static valueOf(value: string): upinn.tech.safepasswordlib.PasswordStrength;
                public static values(): androidNative.Array<upinn.tech.safepasswordlib.PasswordStrength>;
                public static getEntries(): any;
            }
            export module PasswordStrength {
                export class Companion {
                    public static class: java.lang.Class<upinn.tech.safepasswordlib.PasswordStrength.Companion>;
                }
            }
        }
    }
}

declare module upinn {
    export module tech {
        export module safepasswordlib {
            export class SafePassword {
                public static class: java.lang.Class<upinn.tech.safepasswordlib.SafePassword>;
                public makePassword(length: number, includeUppercase: boolean, includeNumbers: boolean, includeSymbols: boolean): string;
                public checkPassword(password: string): upinn.tech.safepasswordlib.PasswordStrength;
                public constructor();
            }
        }
    }
}

