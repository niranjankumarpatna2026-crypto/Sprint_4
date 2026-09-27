// import DOMPurify from "dompurify";
// import { marked } from "marked";

// function CoverLetterResult({ coverLetter }) {

//   const html = DOMPurify.sanitize(
//     marked.parse(coverLetter)
//   );

//   async function copyToClipboard() {
//     try {
//       await navigator.clipboard.writeText(coverLetter);

//       alert("Cover letter copied to clipboard!");
//     } catch (error) {
//       console.error(error);
//       alert("Could not copy the cover letter.");
//     }
//   }

//   return (
//     <section className="card result-card">

//       <div className="result-header">

//         <div>
//           <span className="success-badge">
//             AI Generated
//           </span>

//           <h2>
//             Your Cover Letter
//           </h2>
//         </div>

//         <button
//           className="copy-button"
//           onClick={copyToClipboard}
//         >
//           Copy to Clipboard
//         </button>

//       </div>

//       <article
//         className="cover-letter"
//         dangerouslySetInnerHTML={{
//           __html: html
//         }}
//       />

//     </section>
//   );
// }

// export default CoverLetterResult;


import DOMPurify from "dompurify";
import { marked } from "marked";
import jsPDF from "jspdf";

function CoverLetterResult({ coverLetter }) {
  const html = DOMPurify.sanitize(
    marked.parse(coverLetter)
  );

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(coverLetter);
      alert("Cover letter copied to clipboard!");
    } catch (error) {
      console.error(error);
      alert("Could not copy the cover letter.");
    }
  }

  function downloadPDF() {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4"
    });

    const pageWidth = 210;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    let y = 25;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Cover Letter", margin, y);

    y += 12;

    // Divider
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);

    y += 12;

    // Body
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const plainText = coverLetter
      .replace(/#{1,6}\s?/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1");

    const paragraphs = plainText.split(/\n\s*\n/);

    paragraphs.forEach((paragraph) => {
      const cleanParagraph = paragraph.trim();

      if (!cleanParagraph) return;

      const lines = doc.splitTextToSize(
        cleanParagraph,
        contentWidth
      );

      // New page if needed
      if (y + lines.length * 6 > 275) {
        doc.addPage();
        y = 25;
      }

      doc.text(lines, margin, y);

      y += lines.length * 6;
      y += 6;
    });

    doc.save("cover-letter.pdf");
  }

  return (
    <section className="card result-card">

      <div className="result-header">

        <div>
          <span className="success-badge">
            AI Generated
          </span>

          <h2>
            Your Cover Letter
          </h2>
        </div>

        <div className="result-actions">

          <button
            className="copy-button"
            onClick={copyToClipboard}
          >
            📋 Copy
          </button>

          <button
            className="download-button"
            onClick={downloadPDF}
          >
            📄 Download PDF
          </button>

        </div>

      </div>

      <article
        className="cover-letter"
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />

    </section>
  );
}

export default CoverLetterResult;