import React from "react";
import "../styles/home.scss";

const Home = () => {
  return (
    <div className="page">

      <section className="hero">
        <div className="badge">
          AI Powered Interview Preparation
        </div>

        <h1>Create Your Custom Interview Prep Plan</h1>

        <p>
          Upload your resume, paste the job description and get a
          personalized interview roadmap instantly.
        </p>
      </section>

      <main className="home">

        <div className="leftArea">
          <div className="section-header">
            <h2>Job Description</h2>
            <p>Paste the company job description</p>
          </div>

          <textarea
            id="jobDescription"
            placeholder="Enter job description here..."
          />
        </div>

        <div className="divider"></div>

        <div className="rightArea">

          <div className="section-header">
            <h2>Candidate Profile</h2>
            <p>Upload resume and describe yourself</p>
          </div>

          <div className="upload-box">
            <label htmlFor="resume">
              📄 Upload Resume
            </label>

            <input
              type="file"
              id="resume"
              accept=".pdf,.doc,.docx"
            />
          </div>

          <div className="input-group">
            <label htmlFor="selfDescription">
              Self Description
            </label>

            <textarea
              id="selfDescription"
              placeholder="Tell us about yourself..."
            />
          </div>

          <button className="generate-btn">
            Generate Interview Report
          </button>

        </div>

      </main>

    </div>
  );
};

export default Home;