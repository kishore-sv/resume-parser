import { getSectionLinesByKeywords } from "../../parse-resume-from-pdf/extract-resume-from-sections/lib/get-section-lines.js";
import { getBulletPointsFromLines, getDescriptionsLineIdx, } from "../../parse-resume-from-pdf/extract-resume-from-sections/lib/bullet-points.js";
// Generate placeholder featured skills (instead of Redux initial state)
const createEmptyFeaturedSkills = (count) => Array.from({ length: count }, () => ({ skill: "" }));
export const extractSkills = (sections) => {
    const lines = getSectionLinesByKeywords(sections, ["skill"]);
    const descriptionsLineIdx = getDescriptionsLineIdx(lines) ?? 0;
    // Extract descriptions (bullet points)
    const descriptionsLines = lines.slice(descriptionsLineIdx);
    const descriptions = getBulletPointsFromLines(descriptionsLines);
    // Prepare featured skills
    const featuredSkills = createEmptyFeaturedSkills(6);
    if (descriptionsLineIdx !== 0) {
        const featuredSkillsLines = lines.slice(0, descriptionsLineIdx);
        const featuredSkillsTextItems = featuredSkillsLines
            .flat()
            .filter((item) => item.text.trim())
            .slice(0, 6);
        for (let i = 0; i < featuredSkillsTextItems.length; i++) {
            featuredSkills[i].skill = featuredSkillsTextItems[i].text;
        }
    }
    const skills = {
        descriptions,
    };
    return { skills };
};
