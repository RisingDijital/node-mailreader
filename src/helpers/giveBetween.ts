/**
 * 
 * @param {string} string string to search 
 * @param {string} start - start string
 * @param {string} end - end string
 * @returns {string} between the given strings
 * first finds the start string and then starts searching for the end string from start string's index
 */
 export default function giveBetweeen(string: string, start: string, end: string): string {
    const startIndex = string.indexOf(start);
    const endIndex = string.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return "";
    return string.slice(startIndex + start.length, endIndex);
}