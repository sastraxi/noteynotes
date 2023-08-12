export declare function memoize<R, T extends (...args: any[]) => R>(f: T): T;
/**
 * Return 0 <= i <= array.length such that !pred(array[i - 1]) && pred(array[i]).
 * This and lowerBound / upperBound from https://stackoverflow.com/a/41956372
 */
export declare function binarySearch<T>(array: Array<T>, pred: (item: T) => boolean): number;
/**
 * Return i such that array[i - 1] < item <= array[i].
 */
export declare function lowerBound<T>(array: Array<T>, item: T): number;
/**
 * Return i such that array[i - 1] <= item < array[i].
 */
export declare function upperBound<T>(array: Array<T>, item: T): number;
/**
 * Return a modified version of the given array with the element
 * at a given index replaced with a replacement element.
 */
export declare const withReplacement: <T>(array: T[], index: number, replacement: T) => T[];
/**
 * Returns the first N integers, e.g. firstNDigits(5) === [0, 1, 2, 3, 4].
 */
export declare const firstNDigits: (n: number) => number[];
export declare const shortestOf: <T extends {
    length: number;
}>(arr: T[]) => T | undefined;
/**
 * e.g. [4, 6, 10, 1] => [4, 10, 20, 21]
 */
export declare const cumulative: (arr: Readonly<Array<number>>) => number[];
export declare const unique: <T>(arr: T[]) => T[];
