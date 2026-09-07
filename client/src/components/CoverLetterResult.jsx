import DOMPurify from "dompurify";
import { marked } from "marked";

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

        <button
          className="copy-button"
          onClick={copyToClipboard}
        >
          Copy to Clipboard
        </button>

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