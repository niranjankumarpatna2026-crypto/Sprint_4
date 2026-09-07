import { PDFParse } from "pdf-parse";

export async function extractTextFromPdf(buffer) {
  const parser = new PDFParse({
    data: buffer
  });

  try {
    const result = await parser.getText();

    return result.text
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  } finally {
    await parser.destroy();
  }
}