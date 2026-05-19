import { useEffect, useState, useRef } from "react";
import { playSelectSound } from "./utils/audio.js";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { id: "i", badge: "1", title: "EXPERIENCE", subtitle: "ACCENTURE/INTERN", rank: 2 },
  { id: "ii", badge: "2", title: "PROJECTS", subtitle: "Persona5 Theme", rank: 3 },
  { id: "iii", badge: "3", title: "SKILLS", subtitle: "React / JavaScript / CSS / HTML / Firebase", rank: 3 },
  { id: "iv", badge: "4", title: "CERTIFICATES", subtitle: "Frontend Development / Deployment Workflow", rank: 2 },
];

const EXPERIENCE_ROWS = [
  { index: "01", title: "ACCENTURE/INTERN", date: "Jan - April 2026" },
];

const PROJECTS_ROWS = [
  { index: "01", title: "SMARTBIN3 (THESIS)", status: "COMPLETED" },
  { index: "02", title: "PIC-BASED FUTSAL SCOREBOARD", status: "COMPLETED" },
  { index: "01", title: "PERSONA5-THEMED PORTFOLIO", status: "IN PROGRESS" },
];

const SKILLS_ROWS = [
  { index: "01", title: "SALESFORCE", level: "PROFICIENT" },
  { index: "02", title: "REACT", level: "AMATEUR" },
  { index: "03", title: "JAVASCRIPT", level: "AMATEUR" },
  { index: "04", title: "CSS", level: "AMATEUR" },
  { index: "05", title: "HTML", level: "AMATEUR" },
  { index: "06", title: "FIREBASE", level: "AMATEUR" },
  { index: "07", title: "KOTLIN", level: "COMPETENT" },
];

const CERTIFICATES_ROWS = [
  { index: "01", title: "UNDERSTANDING THE INTERNET", link: "link button", url: "https://www.futurelearn.com/certificates/irb42f3" },
  { index: "02", title: "INTRODUCTION TO ANDROID STUDIO COURSE", link: "link button", url: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIyMzEyIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvNzg5ODM2MV84MjE1NjEyMTczOTQwMDIwNjMxOS5wbmciLCJ1c2VybmFtZSI6IlBhb2xvIEphbnNlbiBBLiBFbnJlcmEifQ%3D%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true" },
  { index: "03", title: "GETTING STARTED WITH MACHINE LEARNING ALGORITHMS", link: "link button", url: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzUxIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvNzg5ODU0N184MjE1NjEyMTczOTUwMTI0NzQ2MC5wbmciLCJ1c2VybmFtZSI6IlBhb2xvIEphbnNlbiBBLiBFbnJlcmEifQ%3D%3D&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true" },
];

export default function ResumePage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  const [mounted, setMounted] = useState(false);
  const isFirstRenderAudio = useRef(true);

  useEffect(() => {
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
    }
    playSelectSound();
  }, [active]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <style>{`
        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: all;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(50vw, 920px);
          display: flex;
          flex-direction: column;
          gap: 6px;
          pointer-events: none;
          transform: scale(1);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Persona5Main';
          font-size: 92px;
          line-height: 0.9;
          color: #ffffff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(13,13,13,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 138px;
          background: #0d0d0d;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(13,13,13,0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d92323;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 18px 28px 18px 72px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          overflow: visible;
        }

        .resume-badge {
          position: absolute;
          top: 4px;
          left: -14px;
          width: 78px;
          height: 96px;
          background: #0d0d0d;
          border: 3px solid #ffffff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(13,13,13,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Persona5Main';
          font-size: 42px;
          width: 100%;
          text-align: center;
          color: #ffffff;
          letter-spacing: -0.4em;
          line-height: 1;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #0d0d0d;
          border-color: #0d0d0d;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #ffffff;
        }

        .resume-title {
          font-family: 'Persona5Main';
          font-size: 52px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #ffffff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #0d0d0d;
        }

        .resume-rank {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Persona5Main';
          font-size: 26px;
          letter-spacing: 2px;
          color: #ffffff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Persona5Main';
          font-size: 42px;
          line-height: 0.9;
          letter-spacing: -0.05em;
          color: #ffffff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #0d0d0d;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #ffffff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #0d0d0d;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue';
          font-size: 28px;
          line-height: 1;
          letter-spacing: 0px;
          color: #0d0d0d;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #ffffff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 3vw;
          width: min(44vw, 810px);
          min-height: 75vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(13,13,13,0.96) 0%, rgba(13,13,13,0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.16),
            16px 16px 0 rgba(13,13,13,0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #0d0d0d;
          box-shadow: 10px 0 0 rgba(217,35,35,0.88);
        }
        .resume-detail-top-index {
          font-family: 'Persona5Main';
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Persona5Main';
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Persona5Main';
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(13,13,13,0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(13,13,13,1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue';
          font-size: 26px;
          letter-spacing: 1px;
          color: #ffffff;
        }
        .resume-detail-row-title {
          font-family: 'Bebas Neue';
          font-size: 28px;
          line-height: 1;
          color: #ffffff;
        }
        .resume-detail-date {
          font-family: 'Bebas Neue';
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #0d0d0d;
          background: #ffffff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-status {
          font-family: 'Bebas Neue';
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #0d0d0d;
          background: #ffffff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-level {
          font-family: 'Bebas Neue';
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #0d0d0d;
          background: #ffffff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-link {
          font-family: 'Bebas Neue';
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #0d0d0d;
          background: #ffffff;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(13,13,13,0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
        }
        .resume-detail-bottom-title {
          font-family: 'Persona5Main';
          font-size: 30px;
          letter-spacing: 2px;
          color: #ffffff;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Persona5Main';
          font-size: 21px;
          line-height: 1.15;
          color: #ffffff;
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {active === 0 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">1</div>
              <div className="resume-detail-top-title">PROFESSIONAL EXPERIENCE</div>
              <div className="resume-detail-top-progress">1/1</div>
            </div>

            <div className="resume-detail-list">
              {EXPERIENCE_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-date">{row.date}</div>
                </div>
              ))}
            </div>

            
          </div>
        )}

        {active === 1 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">2</div>
              <div className="resume-detail-top-title">PROJECTS</div>
              <div className="resume-detail-top-progress">X/X</div>
            </div>
            <div className="resume-detail-list">
              {PROJECTS_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-status">{row.status}</div>
                </div>
              ))}
            </div>
          </div>
)}

        {active === 2 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">3</div>
              <div className="resume-detail-top-title">SKILLS</div>
              <div className="resume-detail-top-progress">X/X</div>
            </div>
            <div className="resume-detail-list">
              {SKILLS_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <div className="resume-detail-level">{row.level}</div>
                </div>
              ))}
            </div>
          </div>
)}

        {active === 3 && (
          <div className="resume-detail-panel">
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">4</div>
              <div className="resume-detail-top-title">CERTIFICATES</div>
              <div className="resume-detail-top-progress">X/X</div>
            </div>
            <div className="resume-detail-list">
              {CERTIFICATES_ROWS.map((row) => (
                <div className="resume-detail-row" key={row.index}>
                  <div className="resume-detail-row-index">{row.index}</div>
                  <div className="resume-detail-row-title">{row.title}</div>
                  <button
                    className="resume-detail-link"
                    type="button"
                    onClick={() => window.open(row.url, "_blank", "noopener,noreferrer")}
                  >
                    {row.link}
                  </button>
                </div>
              ))}
            </div>
          </div>
)}
      </div>
    </div>
  );
}
