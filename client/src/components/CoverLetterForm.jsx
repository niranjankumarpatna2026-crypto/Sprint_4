import { useState } from "react";

function CoverLetterForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    candidateName: "",
    jobRole: "",
    targetCompany: "",
    keySkills: ""
  });

  const [resume, setResume] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("PDF must be smaller than 5 MB.");
      return;
    }

    setResume(file);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append(
      "candidateName",
      form.candidateName
    );

    formData.append(
      "jobRole",
      form.jobRole
    );

    formData.append(
      "targetCompany",
      form.targetCompany
    );

    formData.append(
      "keySkills",
      form.keySkills
    );

    if (resume) {
      formData.append("resume", resume);
    }

    onGenerate(formData);
  }

  return (
    <section className="card">

      <div className="section-heading">
        <h2>Tell us about the candidate</h2>

        <p>
          Enter the job details and optionally upload your resume.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="grid">

          <div className="field">
            <label>
              Candidate Name
            </label>

            <input
              type="text"
              name="candidateName"
              value={form.candidateName}
              onChange={handleChange}
              placeholder="e.g. Niranjan Kumar"
              required
            />
          </div>

          <div className="field">
            <label>
              Job Role
            </label>

            <input
              type="text"
              name="jobRole"
              value={form.jobRole}
              onChange={handleChange}
              placeholder="e.g. Data Analyst"
              required
            />
          </div>

          <div className="field">
            <label>
              Target Company
            </label>

            <input
              type="text"
              name="targetCompany"
              value={form.targetCompany}
              onChange={handleChange}
              placeholder="e.g. Microsoft"
              required
            />
          </div>

          <div className="field full">
            <label>
              Key Skills
            </label>

            <textarea
              name="keySkills"
              value={form.keySkills}
              onChange={handleChange}
              placeholder="SQL, Python, Power BI, Excel, Data Analysis..."
              rows="4"
              required
            />
          </div>

        </div>

        <div className="upload-box">

          <div>
            <h3>Upload Resume</h3>

            <p>
              Optional — PDF only, maximum 5 MB.
            </p>
          </div>

          <label className="upload-button">
            Choose PDF

            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              hidden
            />
          </label>

          {resume && (
            <div className="file-name">
              📄 {resume.name}
            </div>
          )}

        </div>

        <button
          type="submit"
          className="generate-button"
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Cover Letter"}
        </button>

      </form>

    </section>
  );
}

export default CoverLetterForm;