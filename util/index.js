import stringify from 'fast-json-stable-stringify';
// from https://stackoverflow.com/a/43382807 then modified to use stringify
export function memoize(f) {
    const memory = new Map();
    const g = (...args) => {
        const paramRepr = stringify(args);
        if (!memory.get(paramRepr)) {
            memory.set(paramRepr, f(...args));
        }
        return memory.get(paramRepr);
    };
    return g;
}
/**
 * Return 0 <= i <= array.length such that !pred(array[i - 1]) && pred(array[i]).
 * This and lowerBound / upperBound from https://stackoverflow.com/a/41956372
 */
export function binarySearch(array, pred) {
    let lo = -1, hi = array.length;
    while (1 + lo < hi) {
        const mi = lo + ((hi - lo) >> 1);
        if (pred(array[mi])) {
            hi = mi;
        }
        else {
            lo = mi;
        }
    }
    return hi;
}
/**
 * Return i such that array[i - 1] < item <= array[i].
 */
export function lowerBound(array, item) {
    return binarySearch(array, j => item <= j);
}
/**
 * Return i such that array[i - 1] <= item < array[i].
 */
export function upperBound(array, item) {
    return binarySearch(array, j => item < j);
}
/**
 * Return a modified version of the given array with the element
 * at a given index replaced with a replacement element.
 */
export const withReplacement = (array, index, replacement) => [...array.slice(0, index), replacement, ...array.slice(index + 1)];
// memoized so we don't thrash renders / recompute useCallbacks in <Choice />
/**
 * Returns the first N integers, e.g. firstNDigits(5) === [0, 1, 2, 3, 4].
 */
export const firstNDigits = memoize((n) => [...Array(n).keys()]);
export const shortestOf = (arr) => {
    let shortest = undefined;
    for (const item of arr) {
        if (shortest === undefined || item.length < shortest.length) {
            shortest = item;
        }
    }
    return shortest;
};
/**
 * e.g. [4, 6, 10, 1] => [4, 10, 20, 21]
 */
export const cumulative = (arr) => arr.reduce((workingArray, item, index) => {
    if (index === 0) {
        workingArray.push(item);
    }
    else {
        workingArray.push(item + workingArray[index - 1]);
    }
    return workingArray;
}, []);
export const unique = (arr) => arr.filter((item, index, self) => self.indexOf(item) === index);
//# sourceMappingURL=index.js.map