import { generateCoverLetter } from "../services/geminiService.js";
import { extractTextFromPdf } from "../services/pdfService.js";

export async function generateCoverLetterController(req, res) {
  try {
    const {
      candidateName,
      jobRole,
      targetCompany,
      keySkills
    } = req.body;

    if (!candidateName || !jobRole || !targetCompany || !keySkills) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be completed."
      });
    }

    let resumeText = "";

    if (req.file) {
      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed."
        });
      }

      resumeText = await extractTextFromPdf(req.file.buffer);

      if (!resumeText) {
        return res.status(400).json({
          success: false,
          message: "Could not extract text from the PDF."
        });
      }

      // Prevent unnecessarily huge prompts.
      resumeText = resumeText.slice(0, 20000);
    }

    const coverLetter = await generateCoverLetter({
      candidateName,
      jobRole,
      targetCompany,
      keySkills,
      resumeText
    });

    return res.status(200).json({
      success: true,
      coverLetter
    });

  } catch (error) {
    console.error("Cover letter generation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate cover letter."
    });
  }
}