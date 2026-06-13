import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../hooks/useInterview";

const History = () => {
  const { reports, getReports, loading, deleteReport, editReport } = useInterview();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    getReports();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Delete this report?")) {
      await deleteReport(id);
    }
  };

  const handleEditOpen = (e, r) => {
    e.stopPropagation();
    setEditingId(r._id);
    setEditValue(r.jobdescription ?? "");
  };

  const handleEditSave = async () => {
    await editReport(editingId, { jobdescription: editValue });
    setEditingId(null);
  };

  if (loading) {
    return (
      <main style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0f0f1a" }}>
        <h1 style={{ color: "#a5b4fc" }}>Loading your reports...</h1>
      </main>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0f0f1a", padding: "3rem 2rem" }}>

      {/* Edit Modal */}
      {editingId && (
        <div style={{ position: "fixed", inset: 0, background: "#000a", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#1a1a2e", border: "1px solid #4f46e5", borderRadius: "14px", padding: "2rem", width: "min(500px, 90vw)" }}>
            <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Edit Job Description</h2>
            <textarea
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              rows={6}
              style={{ width: "100%", background: "#0f0f1a", color: "#d1d5db", border: "1px solid #2a2a3e", borderRadius: "8px", padding: "0.8rem", fontSize: "0.9rem", resize: "vertical", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem", justifyContent: "flex-end" }}>
              <button onClick={() => setEditingId(null)} style={{ background: "transparent", border: "1px solid #4b5563", color: "#9ca3af", padding: "0.5rem 1.2rem", borderRadius: "8px", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={handleEditSave} style={{ background: "#4f46e5", border: "none", color: "#fff", padding: "0.5rem 1.4rem", borderRadius: "8px", cursor: "pointer" }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700 }}>Your Interview Reports</h1>
        <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>All your previously generated interview prep plans.</p>
        <button onClick={() => navigate("/")} style={{ marginTop: "1.2rem", background: "transparent", border: "1px solid #4f46e5", color: "#a5b4fc", padding: "0.5rem 1.4rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem" }}>
          + Generate New Report
        </button>
      </div>

      {(!reports || reports.length === 0) && (
        <div style={{ textAlign: "center", color: "#6b7280", marginTop: "4rem" }}>
          <p style={{ fontSize: "1.1rem" }}>No reports yet.</p>
          <p style={{ marginTop: "0.4rem" }}>Go to Home to generate your first interview prep plan!</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.2rem", maxWidth: "1100px", margin: "0 auto" }}>
        {reports?.map((r) => {
          const score = r.matchScore ?? 0;
          const scoreColor = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#ef4444";
          const date = new Date(r.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" });
          const preview = r.jobdescription?.slice(0, 100) ?? "No description";

          return (
            <div key={r._id} onClick={() => navigate(`/interview/${r._id}`)}
              style={{ background: "#1a1a2e", border: "1px solid #2a2a3e", borderRadius: "14px", padding: "1.4rem", cursor: "pointer", transition: "border-color 0.2s, transform 0.2s", display: "flex", flexDirection: "column", gap: "0.8rem" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#4f46e5"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3e"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6b7280", fontSize: "0.8rem" }}>{date}</span>
                <span style={{ fontSize: "1.3rem", fontWeight: 700, color: scoreColor, background: scoreColor + "18", padding: "0.2rem 0.7rem", borderRadius: "8px" }}>
                  {score}%
                </span>
              </div>

              <p style={{ color: "#d1d5db", fontSize: "0.92rem", lineHeight: "1.5", margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {preview}
              </p>

              {r.skillGaps?.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.2rem" }}>
                  {r.skillGaps.slice(0, 3).map((gap, i) => (
                    <span key={i} style={{ fontSize: "0.75rem", padding: "0.2rem 0.6rem", borderRadius: "6px", fontWeight: 500, background: gap.severity === "high" ? "#ef444420" : gap.severity === "mid" ? "#eab30820" : "#22c55e20", color: gap.severity === "high" ? "#ef4444" : gap.severity === "mid" ? "#eab308" : "#22c55e", border: `1px solid ${gap.severity === "high" ? "#ef444440" : gap.severity === "mid" ? "#eab30840" : "#22c55e40"}` }}>
                      {gap.skill}
                    </span>
                  ))}
                  {r.skillGaps.length > 3 && <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>+{r.skillGaps.length - 3} more</span>}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.2rem" }}>
                <span style={{ color: "#6b7280", fontSize: "0.78rem" }}>
                  {r.technicalQuestions?.length ?? 0} technical · {r.behavioralQuestions?.length ?? 0} behavioral
                </span>
                {/* Edit + Delete buttons */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={(e) => handleEditOpen(e, r)}
                    style={{ background: "transparent", border: "1px solid #4f46e5", color: "#a5b4fc", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "6px", cursor: "pointer" }}>
                    Edit
                  </button>
                  <button onClick={(e) => handleDelete(e, r._id)}
                    style={{ background: "transparent", border: "1px solid #ef4444", color: "#ef4444", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "6px", cursor: "pointer" }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;