import React, { useState, useEffect } from "react";
import {
  Upload,
  File,
  Lock,
  Download,
  X
} from "lucide-react";

const FileUploadApp = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch all files
  const fetchFiles = async () => {
    try {
      const response = await fetch("https://ulcclub1.onrender.com/api/v1/secure/files");
      const data = await response.json();
      if (data.success) {
        setFiles(data.files);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // ✅ Open file for preview
  const openFile = async (file) => {
    try {
      setSelectedFile(file);
      setIsLoading(true);

      const url = `https://ulcclub1.onrender.com/${file.path.replace(/\\/g, "/")}`;
      setFileContent(url);
    } catch (error) {
      console.error("Error opening file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeFileViewer = () => {
    setSelectedFile(null);
    setFileContent(null);
  };

  // ✅ Render preview content
  const renderFileContent = () => {
    if (!selectedFile || !fileContent) return null;

    if (selectedFile.mimeType.startsWith("image/")) {
      return (
        <img
          src={fileContent}
          alt={selectedFile.originalName}
          style={{ maxWidth: "100%", borderRadius: "12px" }}
        />
      );
    }

    if (selectedFile.mimeType === "application/pdf") {
      return (
        <iframe
          src={fileContent}
          title={selectedFile.originalName}
          style={{ width: "100%", height: "600px", border: "none" }}
        />
      );
    }

    return (
      <a
        href={fileContent}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#00d4ff", textDecoration: "underline" }}
      >
        Open {selectedFile.originalName}
      </a>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #0f0f1a, #1a1a2e, #0f2027)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "30px" }}>
        Secure File Manager
      </h1>

      {/* Upload Section */}
      <div style={{ marginBottom: "40px" }}>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "12px 24px",
            background: "linear-gradient(90deg, #ff0080, #7928ca, #00d4ff)",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          <Upload size={20} style={{ marginRight: "10px" }} /> Upload File
          <input
            type="file"
            hidden
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;
              const formData = new FormData();
              formData.append("file", file);

              try {
                const res = await fetch("https://ulcclub1.onrender.com/api/v1/secure/upload", {
                  method: "POST",
                  body: formData,
                });
                const data = await res.json();
                if (data.success) {
                  setFiles([data.file, ...files]);
                }
              } catch (err) {
                console.error("Error uploading:", err);
              }
            }}
          />
        </label>
      </div>

      {/* File Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {files.map((file) => (
          <div
            key={file._id}
            onClick={() => openFile(file)}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "20px",
              transition: "all 0.3s ease",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 212, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Glow Bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background:
                  "linear-gradient(90deg, #ff0080, #00d4ff, #00ff88)",
                animation: "gradientShift 3s ease-in-out infinite",
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
              <File />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.1rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {file.originalName}
                </h3>
              </div>
              <Lock size={20} style={{ color: "#ff0080" }} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                fontSize: "0.9rem",
                opacity: 0.7,
              }}
            >
              <span>{file.size ? (file.size / 1024).toFixed(1) + " KB" : "Unknown"}</span>
              <span>{file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString() : "N/A"}</span>
            </div>

            <a
              href={`https://ulcclub1.onrender.com/${file.path.replace(/\\/g, "/")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{ color: "#00d4ff", textDecoration: "underline", fontSize: "0.9rem" }}
            >
              <Download size={16} style={{ marginRight: "5px" }} />
              Download
            </a>
          </div>
        ))}
      </div>

      {/* File Viewer */}
      {fileContent && selectedFile && (
        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2>{selectedFile.originalName}</h2>
            <button
              onClick={closeFileViewer}
              style={{
                background: "transparent",
                border: "none",
                color: "#ff0080",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              <X />
            </button>
          </div>
          {renderFileContent()}
        </div>
      )}
    </div>
  );
};

export default FileUploadApp;
