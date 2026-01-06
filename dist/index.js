import fs from 'node:fs';
import { readPdf } from "./lib/parse-resume-from-pdf/read-pdf.js";
import { groupTextItemsIntoLines } from "./lib/parse-resume-from-pdf/group-text-items-into-lines.js";
import { groupLinesIntoSections } from "./lib/parse-resume-from-pdf/group-lines-into-sections.js";
import { extractResumeFromSections } from "./lib/parse-resume-from-pdf/extract-resume-from-sections/index.js";
const fileUrl = "sample_resume.pdf";
const outputFilename = 'resume.json';
async function resumeParser() {
    const textItems = await readPdf(fileUrl);
    if (textItems.length === 0) {
        console.error("ERROR: PDF extraction returned 0 text items.");
        return;
    }
    const lines = groupTextItemsIntoLines(textItems);
    const sections = groupLinesIntoSections(lines);
    const resume = extractResumeFromSections(sections);
    console.log("RESUME:", resume);
    fs.writeFile(outputFilename, JSON.stringify(resume, null, 2), (err) => {
        if (err) {
            console.error("Error creating file:", err);
        }
        else {
            console.log(`${outputFilename} created successfully.`);
        }
    });
}
resumeParser();
