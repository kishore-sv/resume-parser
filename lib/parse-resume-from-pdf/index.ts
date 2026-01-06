import { readPdf } from "../parse-resume-from-pdf/read-pdf.js";
import { groupTextItemsIntoLines } from "../parse-resume-from-pdf/group-text-items-into-lines.js";
import { groupLinesIntoSections } from "../parse-resume-from-pdf/group-lines-into-sections.js";
import { extractResumeFromSections } from "./extract-resume-from-sections/index.js";

/**
 * Resume parser util that parses a resume from a resume pdf file
 *
 * Note: The parser algorithm only works for single column resume in English language
 */
export const parseResumeFromPdf = async (fileUrl: string) => {
  // Step 1. Read a pdf resume file into text items to prepare for processing
  const textItems = await readPdf(fileUrl);

  // Step 2. Group text items into lines
  const lines = groupTextItemsIntoLines(textItems);

  // Step 3. Group lines into sections
  const sections = groupLinesIntoSections(lines);

  // Step 4. Extract resume from sections
  const resume = extractResumeFromSections(sections);

  return resume;
};
