import React, { Component, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HumanBodyModel from "../components/HumanBodyModel";

/* =========================================================
   ERROR BOUNDARY
   Prevents the whole dashboard from becoming blank if the
   3D model has a loading problem.
========================================================= */

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error) {
    console.error("HumanBodyModel error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="model-error">
          <div className="model-error-icon">◇</div>

          <div className="model-error-title">
            3D anatomy temporarily unavailable
          </div>

          <div className="model-error-text">
            The dashboard is working, but the human body model could not be
            loaded.
          </div>

          <div className="model-error-small">
            Check the browser console for the model loading error.
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("Awaiting report");

  const [systems, setSystems] = useState({
    skeletal: true,
    muscular: true,
    nervous: true,
    circulatory: true,
  });

  /* -------------------------------------------------------
     REPORT UPLOAD
  ------------------------------------------------------- */

  const handleReportClick = () => {
    fileInputRef.current?.click();
  };

  const handleReportChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setUploadStatus("Report loaded");
  };

  /* -------------------------------------------------------
     FILTER TOGGLE
  ------------------------------------------------------- */

  const toggleSystem = (system) => {
    setSystems((previous) => ({
      ...previous,
      [system]: !previous[system],
    }));
  };

  /* -------------------------------------------------------
     LOGOUT
  ------------------------------------------------------- */

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="dashboard">

        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div className="background-grid"></div>
        <div className="background-glow glow-one"></div>
        <div className="background-glow glow-two"></div>

        {/* =================================================
            TOP NAVIGATION
        ================================================= */}

        <header className="topbar">

          <div className="brand">
            <div className="brand-mark">
              A
            </div>

            <div>
              <div className="brand-name">
                ANATOMIND
              </div>

              <div className="brand-subtitle">
                Medical intelligence interface
              </div>
            </div>
          </div>


          <div className="top-status">

            <div className="live-dot"></div>

            <span>
              SYSTEM ONLINE
            </span>

            <div className="top-divider"></div>

            <span className="time-text">
              03D / 07H
            </span>

          </div>


          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Exit
          </button>

        </header>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="main-area">

          {/* =================================================
              LEFT GLASS PANEL
          ================================================= */}

          <section className="glass-panel patient-panel">

            <div className="panel-top">

              <div>
                <div className="eyebrow">
                  Patient overview
                </div>

                <h2>
                  ANATOMIND_007
                </h2>
              </div>

              <div className="active-badge">
                <span></span>
                ACTIVE
              </div>

            </div>


            <div className="patient-grid">

              <div className="mini-stat">
                <span>
                  AGE
                </span>

                <strong>
                  28
                </strong>

                <small>
                  YEARS
                </small>
              </div>


              <div className="mini-stat">
                <span>
                  STATUS
                </span>

                <strong>
                  NORMAL
                </strong>

                <small>
                  CURRENT
                </small>
              </div>

            </div>


            <div className="panel-line"></div>


            <div className="scan-info">

              <span>
                LAST SCAN
              </span>

              <strong>
                Awaiting report
              </strong>

            </div>


            <div className="scan-info">

              <span>
                MODEL
              </span>

              <strong>
                Human anatomy
              </strong>

            </div>

          </section>


          {/* =================================================
              RIGHT REPORT UPLOAD PANEL
          ================================================= */}

          <section className="glass-panel report-panel">

            <div className="eyebrow">
              Medical intelligence
            </div>

            <div className="report-heading-row">

              <div>
                <h2>
                  Analyze your report
                </h2>

                <p>
                  Upload a medical report to extract relevant
                  health information for visualization.
                </p>
              </div>

              <div className="ai-badge">
                AI
              </div>

            </div>


            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleReportChange}
              style={{ display: "none" }}
            />


            <button
              className="upload-area"
              onClick={handleReportClick}
            >

              <div className="upload-icon">
                ↑
              </div>

              <strong>
                {selectedFile
                  ? selectedFile.name
                  : "Upload medical report"}
              </strong>

              <span>
                {selectedFile
                  ? "Click to replace report"
                  : "PDF, PNG or JPG"}
              </span>

              <small>
                Maximum file size: 10MB
              </small>

            </button>


            <div className="report-status">

              <span className="status-dot"></span>

              <span>
                {uploadStatus}
              </span>

            </div>

          </section>


          {/* =================================================
              CENTER HUMAN BODY VIEWER
          ================================================= */}

          <section className="body-section">

            <div className="body-header">

              <div>

                <div className="eyebrow">
                  Anatomy visualization
                </div>

                <h1>
                  Visual body map
                </h1>

              </div>


              <div className="viewer-status">

                <span className="viewer-dot"></span>

                3D VIEWER

              </div>

            </div>


            {/* BODY MODEL */}

            <div className="body-viewer">

              <div className="scan-ring ring-one"></div>
              <div className="scan-ring ring-two"></div>
              <div className="scan-ring ring-three"></div>


              <div className="model-wrapper">

                <ModelErrorBoundary>

                  <HumanBodyModel />

                </ModelErrorBoundary>

              </div>


              {/* BODY LABEL */}

              <div className="body-label">

                <div className="body-label-line"></div>

                <span>
                  ANATOMIND
                </span>

                <small>
                  FULL BODY ANALYSIS
                </small>

              </div>


              {/* CORNER DATA */}

              <div className="body-data data-left">

                <span>
                  SYSTEM
                </span>

                <strong>
                  FULL BODY
                </strong>

              </div>


              <div className="body-data data-right">

                <span>
                  SCAN MODE
                </span>

                <strong>
                  LIVE
                </strong>

              </div>

            </div>

          </section>


          {/* =================================================
              SYSTEM FILTER PANEL
          ================================================= */}

          <section className="glass-panel systems-panel">

            <div className="panel-top">

              <div>
                <div className="eyebrow">
                  Anatomy layers
                </div>

                <h3>
                  Body systems
                </h3>
              </div>

              <div className="scan-badge">
                SCAN
              </div>

            </div>


            <div className="system-list">

              {/* SKELETAL */}

              <SystemRow
                name="Skeletal"
                value={systems.skeletal}
                percentage="100%"
                onClick={() => toggleSystem("skeletal")}
              />


              {/* MUSCULAR */}

              <SystemRow
                name="Muscular"
                value={systems.muscular}
                percentage="98%"
                onClick={() => toggleSystem("muscular")}
              />


              {/* NERVOUS */}

              <SystemRow
                name="Nervous"
                value={systems.nervous}
                percentage="97%"
                onClick={() => toggleSystem("nervous")}
              />


              {/* CIRCULATORY */}

              <SystemRow
                name="Circulatory"
                value={systems.circulatory}
                percentage="96%"
                onClick={() => toggleSystem("circulatory")}
              />

            </div>

          </section>


          {/* =================================================
              HEALTH METRICS
          ================================================= */}

          <section className="metrics-panel">

            <Metric
              title="Heart rate"
              value="--"
              unit="BPM"
              status="Awaiting report"
            />

            <Metric
              title="O₂ saturation"
              value="--"
              unit="%"
              status="Awaiting report"
            />

            <Metric
              title="Cardiac rhythm"
              value="--"
              unit=""
              status="Awaiting report"
            />

            <Metric
              title="Alerts"
              value="--"
              unit=""
              status="Awaiting report"
            />

          </section>


          {/* =================================================
              FLOATING VIEWER BUTTONS
          ================================================= */}

          <div className="viewer-buttons">

            <button
              title="Expand viewer"
              onClick={() => {
                document.documentElement.requestFullscreen?.();
              }}
            >
              ⛶
            </button>

            <button
              title="Reset viewer"
              onClick={() => window.location.reload()}
            >
              ↻
            </button>

          </div>

        </main>


        {/* =================================================
            BOTTOM STATUS BAR
        ================================================= */}

        <footer className="bottom-bar">

          <div>
            ANATOMIND CORE
          </div>

          <div className="bottom-progress">

            <span></span>

          </div>

          <div>
            SYSTEM READY
          </div>

        </footer>

      </div>


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          background: #050307;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }


        body {
          overflow-x: hidden;
        }


        button {
          font-family: inherit;
        }


        /* ================================================
           MAIN BACKGROUND
        ================================================ */

        .dashboard {
          position: relative;
          min-height: 100vh;
          overflow: hidden;

          color: #f5eeee;

          background:
            radial-gradient(
              circle at 50% 45%,
              rgba(120, 20, 25, 0.22),
              transparent 35%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(255, 45, 45, 0.08),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #050307 0%,
              #0d0508 45%,
              #050306 100%
            );
        }


        .background-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.22;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );

          background-size:
            70px 70px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent
            );
        }


        .background-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }


        .glow-one {
          left: 25%;
          top: 30%;
          background: rgba(150, 15, 25, 0.12);
        }


        .glow-two {
          right: -200px;
          top: 10%;
          background: rgba(255, 35, 45, 0.08);
        }


        /* ================================================
           TOP BAR
        ================================================ */

        .topbar {
          position: relative;
          z-index: 20;

          height: 78px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding:
            0 32px;

          border-bottom:
            1px solid rgba(255,255,255,0.07);

          background:
            rgba(8,5,7,0.55);

          backdrop-filter:
            blur(22px);
        }


        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }


        .brand-mark {
          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          border:
            1px solid rgba(255,75,75,0.55);

          border-radius: 12px;

          color: #ff7777;

          background:
            rgba(255,50,50,0.08);

          box-shadow:
            0 0 25px rgba(255,50,50,0.12);

          font-weight: 700;
        }


        .brand-name {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.2em;
        }


        .brand-subtitle {
          margin-top: 3px;

          font-size: 9px;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.12em;
        }


        .top-status {
          display: flex;
          align-items: center;
          gap: 9px;

          font-size: 9px;
          letter-spacing: 0.16em;

          color:
            rgba(255,255,255,0.55);
        }


        .live-dot,
        .viewer-dot,
        .active-badge span,
        .status-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background: #ff5151;

          box-shadow:
            0 0 12px rgba(255,80,80,0.9);
        }


        .top-divider {
          width: 1px;
          height: 16px;

          background:
            rgba(255,255,255,0.12);

          margin: 0 8px;
        }


        .time-text {
          color:
            rgba(255,255,255,0.32);
        }


        .logout-button {
          border:
            1px solid rgba(255,255,255,0.1);

          background:
            rgba(255,255,255,0.03);

          color:
            rgba(255,255,255,0.65);

          padding:
            9px 18px;

          border-radius: 999px;

          cursor: pointer;

          transition:
            0.2s ease;
        }


        .logout-button:hover {
          border-color:
            rgba(255,80,80,0.4);

          color: white;

          background:
            rgba(255,50,50,0.08);
        }


        /* ================================================
           MAIN AREA
        ================================================ */

        .main-area {
          position: relative;
          z-index: 5;

          min-height:
            calc(100vh - 78px);

          padding:
            28px 30px 80px;
        }


        /* ================================================
           GLASS PANELS
        ================================================ */

        .glass-panel {
          position: absolute;

          border:
            1px solid rgba(255,255,255,0.1);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.065),
              rgba(255,255,255,0.025)
            );

          backdrop-filter:
            blur(24px);

          -webkit-backdrop-filter:
            blur(24px);

          box-shadow:
            0 25px 80px rgba(0,0,0,0.35),
            inset 0 1px rgba(255,255,255,0.04);

          border-radius: 22px;
        }


        /* ================================================
           PATIENT PANEL
        ================================================ */

        .patient-panel {
          left: 30px;
          top: 28px;

          width: 290px;

          padding: 24px;
        }


        .panel-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }


        .eyebrow {
          color:
            rgba(255,255,255,0.36);

          font-size: 9px;

          letter-spacing:
            0.22em;

          text-transform:
            uppercase;
        }


        .patient-panel h2 {
          margin:
            10px 0 0;

          font-size: 23px;

          letter-spacing:
            0.04em;
        }


        .active-badge {
          display: flex;
          align-items: center;
          gap: 7px;

          font-size: 8px;

          color:
            rgba(255,150,150,0.75);
        }


        .patient-grid {
          display: grid;
          grid-template-columns:
            1fr 1fr;

          gap: 10px;

          margin-top: 22px;
        }


        .mini-stat {
          padding: 14px;

          border:
            1px solid rgba(255,255,255,0.07);

          border-radius: 14px;

          background:
            rgba(255,255,255,0.025);
        }


        .mini-stat span,
        .scan-info span {
          display: block;

          font-size: 8px;

          color:
            rgba(255,255,255,0.35);

          letter-spacing:
            0.18em;
        }


        .mini-stat strong {
          display: block;

          margin-top: 8px;

          font-size: 17px;

          font-weight: 500;
        }


        .mini-stat small {
          display: block;

          margin-top: 3px;

          font-size: 7px;

          color:
            rgba(255,255,255,0.28);
        }


        .panel-line {
          height: 1px;

          margin:
            20px 0;

          background:
            rgba(255,255,255,0.08);
        }


        .scan-info {
          margin-top: 14px;
        }


        .scan-info strong {
          display: block;

          margin-top: 7px;

          font-size: 12px;

          color:
            rgba(255,130,130,0.85);
        }


        /* ================================================
           REPORT PANEL
        ================================================ */

        .report-panel {
          right: 30px;
          top: 28px;

          width: 330px;

          padding: 24px;
        }


        .report-heading-row {
          display: flex;
          justify-content: space-between;

          gap: 20px;

          margin-top: 5px;
        }


        .report-panel h2 {
          margin:
            8px 0 7px;

          font-size: 20px;
        }


        .report-panel p {
          margin: 0;

          max-width: 220px;

          font-size: 11px;

          line-height: 1.7;

          color:
            rgba(255,255,255,0.4);
        }


        .ai-badge {
          width: 40px;
          height: 40px;

          flex-shrink: 0;

          display: grid;
          place-items: center;

          border:
            1px solid rgba(255,70,70,0.3);

          border-radius: 12px;

          color:
            #ff7777;

          font-size: 9px;
          letter-spacing: 0.12em;

          background:
            rgba(255,40,40,0.06);
        }


        .upload-area {
          width: 100%;

          margin-top: 22px;

          padding:
            25px 18px;

          display: flex;
          flex-direction: column;
          align-items: center;

          border:
            1px dashed rgba(255,255,255,0.13);

          border-radius: 17px;

          background:
            rgba(0,0,0,0.15);

          color: white;

          cursor: pointer;

          transition:
            0.25s ease;
        }


        .upload-area:hover {
          border-color:
            rgba(255,80,80,0.5);

          background:
            rgba(255,50,50,0.05);

          transform:
            translateY(-2px);
        }


        .upload-icon {
          width: 45px;
          height: 45px;

          display: grid;
          place-items: center;

          border:
            1px solid rgba(255,80,80,0.35);

          border-radius: 14px;

          color:
            #ff6666;

          font-size: 23px;

          margin-bottom: 13px;

          background:
            rgba(255,50,50,0.06);
        }


        .upload-area strong {
          font-size: 12px;

          max-width: 240px;

          overflow: hidden;

          text-overflow: ellipsis;

          white-space: nowrap;
        }


        .upload-area span {
          margin-top: 7px;

          font-size: 10px;

          color:
            rgba(255,255,255,0.4);
        }


        .upload-area small {
          margin-top: 12px;

          font-size: 8px;

          color:
            rgba(255,255,255,0.23);
        }


        .report-status {
          display: flex;
          align-items: center;
          gap: 8px;

          margin-top: 12px;

          font-size: 9px;

          color:
            rgba(255,255,255,0.38);
        }


        /* ================================================
           CENTER BODY
        ================================================ */

        .body-section {
          position: relative;

          width: 100%;

          min-height:
            calc(100vh - 170px);

          display: flex;
          flex-direction: column;
          align-items: center;

          padding-top: 70px;
        }


        .body-header {
          position: relative;
          z-index: 5;

          width: min(760px, 70vw);

          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          margin-bottom: 4px;
        }


        .body-header h1 {
          margin:
            8px 0 0;

          font-size: 29px;

          font-weight: 500;

          letter-spacing:
            -0.03em;
        }


        .viewer-status {
          display: flex;
          align-items: center;
          gap: 8px;

          padding:
            9px 14px;

          border:
            1px solid rgba(255,255,255,0.1);

          border-radius: 999px;

          color:
            rgba(255,255,255,0.42);

          font-size: 8px;

          letter-spacing:
            0.16em;
        }


        .body-viewer {
          position: relative;

          width: min(820px, 72vw);

          height:
            min(690px, calc(100vh - 220px));

          min-height: 500px;

          overflow: hidden;

          border-radius: 30px;
        }


        /* ================================================
           BODY SCAN RINGS
        ================================================ */

        .scan-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          border:
            1px solid rgba(255,60,60,0.08);

          border-radius: 50%;

          pointer-events: none;
        }


        .ring-one {
          width: 430px;
          height: 620px;
        }


        .ring-two {
          width: 510px;
          height: 680px;
        }


        .ring-three {
          width: 590px;
          height: 740px;
        }


        .model-wrapper {
          position: absolute;

          inset:
            25px 50px 45px;

          z-index: 2;
        }


        .model-wrapper > div {
          width: 100%;
          height: 100%;
        }


        /* ================================================
           BODY DATA LABELS
        ================================================ */

        .body-data {
          position: absolute;

          z-index: 6;

          padding:
            11px 14px;

          min-width: 120px;

          border:
            1px solid rgba(255,255,255,0.08);

          border-radius: 12px;

          background:
            rgba(0,0,0,0.22);

          backdrop-filter:
            blur(12px);
        }


        .body-data span {
          display: block;

          font-size: 7px;

          color:
            rgba(255,255,255,0.3);

          letter-spacing:
            0.18em;
        }


        .body-data strong {
          display: block;

          margin-top: 5px;

          font-size: 10px;

          color:
            rgba(255,130,130,0.8);
        }


        .data-left {
          left: 35px;
          bottom: 150px;
        }


        .data-right {
          right: 35px;
          bottom: 150px;
        }


        .body-label {
          position: absolute;

          left: 50%;
          bottom: 20px;

          transform:
            translateX(-50%);

          z-index: 7;

          text-align: center;
        }


        .body-label-line {
          width: 100px;
          height: 1px;

          margin:
            0 auto 9px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,100,100,0.7),
              transparent
            );
        }


        .body-label span {
          display: block;

          font-size: 8px;

          color:
            rgba(255,255,255,0.35);

          letter-spacing:
            0.35em;
        }


        .body-label small {
          display: block;

          margin-top: 5px;

          font-size: 7px;

          color:
            rgba(255,255,255,0.2);

          letter-spacing:
            0.2em;
        }


        /* ================================================
           SYSTEM PANEL
        ================================================ */

        .systems-panel {
          left: 30px;
          bottom: 100px;

          width: 290px;

          padding: 22px;

          z-index: 10;
        }


        .systems-panel h3 {
          margin:
            7px 0 0;

          font-size: 16px;

          font-weight: 500;
        }


        .scan-badge {
          color:
            rgba(255,100,100,0.65);

          font-size: 8px;

          letter-spacing:
            0.14em;
        }


        .system-list {
          margin-top: 18px;
        }


        .system-row {
          margin-top: 13px;

          cursor: pointer;
        }


        .system-row-top {
          display: flex;
          justify-content: space-between;

          font-size: 9px;

          color:
            rgba(255,255,255,0.48);
        }


        .system-percent {
          color:
            rgba(255,100,100,0.65);
        }


        .system-bar {
          height: 3px;

          margin-top: 7px;

          border-radius: 99px;

          overflow: hidden;

          background:
            rgba(255,255,255,0.08);
        }


        .system-fill {
          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              #861d25,
              #ff6666
            );

          box-shadow:
            0 0 10px rgba(255,70,70,0.4);

          transition:
            width 0.25s ease,
            opacity 0.25s ease;
        }


        /* ================================================
           METRICS
        ================================================ */

        .metrics-panel {
          position: absolute;

          left: 50%;

          bottom: 92px;

          transform:
            translateX(-50%);

          width: min(900px, 65vw);

          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 12px;

          z-index: 10;
        }


        .metric-card {
          padding:
            16px 18px;

          border:
            1px solid rgba(255,255,255,0.07);

          border-radius: 16px;

          background:
            rgba(10,5,8,0.52);

          backdrop-filter:
            blur(18px);
        }


        .metric-title {
          font-size: 8px;

          color:
            rgba(255,255,255,0.32);

          letter-spacing:
            0.16em;
        }


        .metric-value {
          margin-top: 7px;

          font-size: 22px;

          font-weight: 500;
        }


        .metric-unit {
          margin-left: 4px;

          font-size: 9px;

          color:
            rgba(255,255,255,0.3);
        }


        .metric-status {
          margin-top: 7px;

          font-size: 8px;

          color:
            rgba(255,255,255,0.25);
        }


        /* ================================================
           VIEWER BUTTONS
        ================================================ */

        .viewer-buttons {
          position: fixed;

          right: 22px;
          bottom: 100px;

          z-index: 30;

          display: flex;
          flex-direction: column;

          gap: 10px;
        }


        .viewer-buttons button {
          width: 54px;
          height: 54px;

          border:
            1px solid rgba(255,255,255,0.12);

          border-radius: 16px;

          background:
            rgba(255,255,255,0.07);

          color:
            rgba(255,255,255,0.65);

          backdrop-filter:
            blur(20px);

          cursor: pointer;

          font-size: 18px;

          transition:
            0.2s ease;
        }


        .viewer-buttons button:hover {
          background:
            rgba(255,60,60,0.12);

          border-color:
            rgba(255,80,80,0.3);

          color: white;
        }


        /* ================================================
           BOTTOM BAR
        ================================================ */

        .bottom-bar {
          position: fixed;

          left: 30px;
          right: 30px;
          bottom: 18px;

          z-index: 50;

          display: flex;
          align-items: center;
          justify-content: space-between;

          font-size: 7px;

          letter-spacing:
            0.25em;

          color:
            rgba(255,255,255,0.25);
        }


        .bottom-progress {
          width: 240px;
          height: 3px;

          overflow: hidden;

          border-radius: 99px;

          background:
            rgba(255,255,255,0.08);
        }


        .bottom-progress span {
          display: block;

          width: 72%;
          height: 100%;

          background:
            linear-gradient(
              90deg,
              #7d1820,
              #ff7777
            );

          box-shadow:
            0 0 10px rgba(255,60,60,0.4);
        }


        /* ================================================
           MODEL ERROR
        ================================================ */

        .model-error {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          width: 280px;

          padding: 25px;

          text-align: center;

          border:
            1px solid rgba(255,70,70,0.22);

          border-radius: 20px;

          background:
            rgba(20,5,8,0.65);

          backdrop-filter:
            blur(20px);

          z-index: 20;
        }


        .model-error-icon {
          width: 48px;
          height: 48px;

          display: grid;
          place-items: center;

          margin:
            0 auto 14px;

          border:
            1px solid rgba(255,70,70,0.3);

          border-radius: 50%;

          color:
            #ff6b6b;

          font-size: 22px;
        }


        .model-error-title {
          font-size: 12px;

          color:
            rgba(255,255,255,0.85);
        }


        .model-error-text {
          margin-top: 9px;

          font-size: 9px;

          line-height: 1.6;

          color:
            rgba(255,255,255,0.4);
        }


        .model-error-small {
          margin-top: 12px;

          font-size: 7px;

          color:
            rgba(255,100,100,0.55);
        }


        /* ================================================
           RESPONSIVE
        ================================================ */

        @media (max-width: 1100px) {

          .patient-panel {
            width: 240px;
          }

          .report-panel {
            width: 280px;
          }

          .metrics-panel {
            width: 55vw;
          }

          .systems-panel {
            width: 240px;
          }

        }


        @media (max-width: 850px) {

          .top-status {
            display: none;
          }

          .patient-panel,
          .report-panel,
          .systems-panel {
            position: relative;

            left: auto;
            right: auto;
            bottom: auto;
            top: auto;

            width: 100%;

            margin-bottom: 15px;
          }


          .body-section {
            min-height: 650px;

            padding-top: 10px;
          }


          .body-header {
            width: 100%;
          }


          .body-viewer {
            width: 100%;
          }


          .metrics-panel {
            position: relative;

            left: auto;
            bottom: auto;

            transform: none;

            width: 100%;

            margin-top: 15px;
          }

        }


        @media (max-width: 600px) {

          .topbar {
            padding:
              0 16px;
          }


          .main-area {
            padding:
              18px 16px 90px;
          }


          .metrics-panel {
            grid-template-columns:
              1fr 1fr;
          }


          .body-header {
            align-items: flex-start;
          }


          .body-header h1 {
            font-size: 22px;
          }


          .viewer-status {
            display: none;
          }


          .body-viewer {
            min-height: 520px;
          }


          .data-left,
          .data-right {
            display: none;
          }


          .viewer-buttons {
            right: 12px;
          }


          .bottom-bar {
            left: 16px;
            right: 16px;
          }


          .bottom-progress {
            width: 100px;
          }

        }

      `}</style>
    </>
  );
}


/* =========================================================
   SYSTEM ROW COMPONENT
========================================================= */

function SystemRow({
  name,
  value,
  percentage,
  onClick,
}) {
  return (
    <div
      className="system-row"
      onClick={onClick}
    >

      <div className="system-row-top">

        <span>
          {name}
        </span>

        <span className="system-percent">
          {value ? percentage : "OFF"}
        </span>

      </div>


      <div className="system-bar">

        <div
          className="system-fill"
          style={{
            width: value ? percentage : "8%",
            opacity: value ? 1 : 0.18,
          }}
        />

      </div>

    </div>
  );
}


/* =========================================================
   METRIC COMPONENT
========================================================= */

function Metric({
  title,
  value,
  unit,
  status,
}) {
  return (
    <div className="metric-card">

      <div className="metric-title">
        {title}
      </div>


      <div className="metric-value">

        {value}

        {unit && (
          <span className="metric-unit">
            {unit}
          </span>
        )}

      </div>


      <div className="metric-status">
        ● &nbsp; {status}
      </div>

    </div>
  );
}