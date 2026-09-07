import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from .env");
}

const ai = new GoogleGenAI({
  apiKey
});

const model = process.env.GEMINI_MODEL || "gemini-3.7-flash";

export async function generateCoverLetter({
  candidateName,
  jobRole,
  targetCompany,
  keySkills,
  resumeText
}) {
  const prompt = `
Create a professional job application cover letter.

Candidate Name:
${candidateName}

Target Job Role:
${jobRole}

Target Company:
${targetCompany}

Key Skills:
${keySkills}

Resume Information:
${resumeText || "No resume was uploaded."}

Instructions:

1. Write a professional and personalized cover letter.
2. Do not invent degrees, companies, jobs, achievements, certifications,
   or experience that are not present in the supplied information.
3. Connect the candidate's skills to the target role.
4. Mention the target company naturally.
5. Keep the letter between 300 and 450 words.
6. Use professional but natural English.
7. Do not use generic filler.
8. Do not include a fake address or phone number.
9. Do not include a subject line unless appropriate.
10. Return Markdown only.
11. Use paragraphs and short sections.
12. Do not wrap the entire response inside a code block.
`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction:
        "You are an expert professional career writer. Generate truthful, concise and personalized cover letters."
    }
  });

  return response.text;
}