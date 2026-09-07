import { useState } from "react";
import CoverLetterForm from "./components/CoverLetterForm";
import CoverLetterResult from "./components/CoverLetterResult";

function App() {
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(formData) {
    setLoading(true);
    setError("");
    setCoverLetter("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/cover-letter/generate",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Generation failed.");
      }

      setCoverLetter(data.coverLetter);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="badge">
          AI Career Assistant
        </div>

        <h1>
          AI Cover Letter Generator
        </h1>

        <p>
          Create a professional, personalized cover letter
          using your job details and resume.
        </p>
      </header>

      <main className="container">

        <CoverLetterForm
          onGenerate={handleGenerate}
          loading={loading}
        />

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>

            <div>
              <strong>Generating...</strong>
              <p>
                AI is analyzing your information and preparing
                your personalized cover letter.
              </p>
            </div>
          </div>
        )}

        {coverLetter && !loading && (
          <CoverLetterResult
            coverLetter={coverLetter}
          />
        )}

      </main>
    </div>
  );
}

export default App;