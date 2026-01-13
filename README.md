# Resume PDF Parser (Node.js + TypeScript)

A simple Node.js project that **extracts structured resume information from a PDF file** and converts it into a clean JSON format.

This parser reads a resume PDF, groups text logically (lines → sections), and outputs structured data like:
- Profile details
- Education
- Work experience
- Skills
- Projects (if present)

---

## Features

- Parse resume data from **PDF**
- Extract structured fields:
  - Name, email, links, summary
  - Education history
  - Work experience
  - Skills
- Outputs clean `resume.json`
- Built with **TypeScript**
- Uses **pdfjs-dist** for PDF text extraction

---

## Installation

```bash
npm install
```

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

## Run

```bash
npm start
```

>Run this project after build only to get output

---

This will:

1. Read `sample_resume.pdf`

2. Extract resume data

3. Generate `resume.json`

---

## Output example:

```json
{
  "profile": {
    "name": "John Doe",
    "email": "john@example.com",
    "url": "linkedin.com/in/johndoe",
    "summary": "Software Engineer with experience in..."
  },
  "educations": [],
  "workExperiences": [],
  "skills": {
    "descriptions": ["JavaScript", "Node.js", "Cloud"]
  }
}
```
---

## How It Works

1. readPdf – extracts raw text items from PDF

2. groupTextItemsIntoLines – converts text items into readable lines

3. groupLinesIntoSections – detects resume sections (Education, Experience, Skills)

4. extractResumeFromSections – builds structured resume JSON

## License

MIT