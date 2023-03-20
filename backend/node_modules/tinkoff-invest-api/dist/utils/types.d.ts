export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export declare type OptionalKeys<T> = {
    [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? K : never;
}[keyof T];
export declare type PublicOf<T> = {
    [P in keyof T]: T[P];
};
//# sourceMappingURL=types.d.ts.map