export const BULLET_POINTS = [
    "⋅",
    "∙",
    "🞄",
    "•",
    "⦁",
    "⚫︎",
    "●",
    "⬤",
    "⚬",
    "○",
];
/**
 * Convert bullet point lines into a string array aka descriptions.
 */
export const getBulletPointsFromLines = (lines) => {
    // Simply return all lines with text item joined together if there is no bullet point
    const firstBulletPointLineIndex = getFirstBulletPointLineIdx(lines);
    if (firstBulletPointLineIndex === undefined) {
        return lines.map((line) => line.map((item) => item.text).join(" "));
    }
    // Otherwise, process and remove bullet points
    // Combine all lines into a single string
    let lineStr = "";
    for (let item of lines.flat()) {
        const text = item.text;
        // Make sure a space is added between 2 words
        if (!lineStr.endsWith(" ") && !text.startsWith(" ")) {
            lineStr += " ";
        }
        lineStr += text;
    }
    // Get the most common bullet point
    const commonBulletPoint = getMostCommonBulletPoint(lineStr);
    // Start line string from the beginning of the first bullet point
    const firstBulletPointIndex = lineStr.indexOf(commonBulletPoint);
    if (firstBulletPointIndex !== -1) {
        lineStr = lineStr.slice(firstBulletPointIndex);
    }
    // Divide the single string using bullet point as divider
    return lineStr
        .split(commonBulletPoint)
        .map((text) => text.trim())
        .filter((text) => !!text);
};
const getMostCommonBulletPoint = (str) => {
    const bulletToCount = BULLET_POINTS.reduce((acc, cur) => {
        acc[cur] = 0;
        return acc;
    }, {});
    let bulletWithMostCount = BULLET_POINTS[0];
    let bulletMaxCount = 0;
    for (let char of str) {
        if (bulletToCount.hasOwnProperty(char)) {
            bulletToCount[char]++;
            if (bulletToCount[char] > bulletMaxCount) {
                bulletWithMostCount = char;
            }
        }
    }
    return bulletWithMostCount;
};
const getFirstBulletPointLineIdx = (lines) => {
    for (let i = 0; i < lines.length; i++) {
        for (let item of lines[i]) {
            if (BULLET_POINTS.some((bullet) => item.text.includes(bullet))) {
                return i;
            }
        }
    }
    return undefined;
};
// Only consider words that don't contain numbers
const isWord = (str) => /^[^0-9]+$/.test(str);
const hasAtLeast8Words = (item) => item.text.split(/\s/).filter(isWord).length >= 8;
export const getDescriptionsLineIdx = (lines) => {
    // The main heuristic to determine descriptions is to check if has bullet point
    let idx = getFirstBulletPointLineIdx(lines);
    // Fallback heuristic if the main heuristic doesn't apply (e.g. LinkedIn resume) to
    // check if the line has at least 8 words
    if (idx === undefined) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.length === 1 && hasAtLeast8Words(line[0])) {
                idx = i;
                break;
            }
        }
    }
    return idx;
};
