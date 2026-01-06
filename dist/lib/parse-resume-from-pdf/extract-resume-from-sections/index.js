import { extractProfile } from "./extract-profile.js";
import { extractEducation } from "./extract-education.js";
import { extractWorkExperience } from "./extract-work-experience.js";
import { extractProject } from "./extract-project.js";
import { extractSkills } from "./extract-skills.js";
export const extractResumeFromSections = (sections) => {
    const { profile } = extractProfile(sections);
    const { educations } = extractEducation(sections);
    const { workExperiences } = extractWorkExperience(sections);
    const { projects } = extractProject(sections);
    const { skills } = extractSkills(sections);
    return {
        profile,
        educations,
        workExperiences,
        projects,
        skills,
        custom: {
            descriptions: [],
        },
    };
};
