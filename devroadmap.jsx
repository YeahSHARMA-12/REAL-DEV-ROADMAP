import { useState } from "react";

const phases = [
  {
    id: 1,
    month: "Month 1–2",
    title: "FOUNDATIONS",
    color: "#00ff88",
    bg: "#001a0d",
    border: "#00ff88",
    focus: "Python Solid + DSA Basics",
    hardness: "Medium",
    items: [
      { skill: "Python OOP, file I/O, modules", where: "Home evening", hard: 3 },
      { skill: "Arrays, Strings, Hashing (LeetCode Easy)", where: "Home evening", hard: 3 },
      { skill: "Git & GitHub basics", where: "Commute / Free period", hard: 1 },
      { skill: "Reading: 'Clean Code' (PDF)", where: "Commute / Lecture breaks", hard: 1 },
      { skill: "Build 1 CLI project (todo/expense tracker)", where: "Weekend", hard: 2 },
    ],
    goal: "Crack 30+ LeetCode Easy. Push to GitHub daily.",
    internSignal: "You can now speak to a recruiter about Python & version control"
  },
  {
    id: 2,
    month: "Month 3–4",
    title: "DEPTH",
    color: "#ff9500",
    bg: "#1a0d00",
    border: "#ff9500",
    focus: "DSA Medium + Web/API Basics",
    hardness: "High",
    items: [
      { skill: "Linked List, Trees, Stacks, Queues (LeetCode Medium)", where: "Home deep work block", hard: 5 },
      { skill: "FastAPI or Flask — build REST API", where: "Home evening", hard: 4 },
      { skill: "SQL basics (joins, aggregates)", where: "Commute app: SQLZoo", hard: 2 },
      { skill: "Postman / API testing", where: "Commute / college wifi", hard: 1 },
      { skill: "Read: System Design Primer (GitHub)", where: "Commute PDF", hard: 2 },
      { skill: "1 backend project: URL shortener / notes API", where: "Weekend sprints", hard: 4 },
    ],
    goal: "20+ LeetCode Medium solved. 1 deployed API project on GitHub.",
    internSignal: "Backend intern / Python dev intern resumes now viable"
  },
  {
    id: 3,
    month: "Month 5–6",
    title: "ATTACK",
    color: "#ff3366",
    bg: "#1a0009",
    border: "#ff3366",
    focus: "Internship Sprint + Showcase",
    hardness: "High-Max",
    items: [
      { skill: "Mock interviews (Pramp, Interviewing.io)", where: "Home evening", hard: 5 },
      { skill: "Dynamic Programming — top 20 patterns", where: "Home deep work", hard: 5 },
      { skill: "1 AI/automation project using Python + API", where: "Weekend project", hard: 4 },
      { skill: "Resume + LinkedIn + cold email templates", where: "Commute writing", hard: 2 },
      { skill: "Contribute to 1 open source repo (small bug fix)", where: "Weekend", hard: 3 },
      { skill: "Apply to 30+ startups, not just big tech", where: "Daily 20 min", hard: 1 },
    ],
    goal: "Portfolio: 3 projects live. GitHub streak 90+ days. 30 applications sent.",
    internSignal: "You're ready. Execute without waiting for 'perfect'."
  }
];

const tracks = [
  {
    name: "Backend Dev",
    icon: "⚙️",
    stack: "Python → FastAPI → PostgreSQL → Docker basics",
    demand: "Very High",
    internPath: "Build REST APIs, deploy on Railway/Render",
    color: "#00ff88"
  },
  {
    name: "AI/ML Adjacent",
    icon: "🤖",
    stack: "Python → NumPy/Pandas → OpenAI API → Prompt Eng",
    demand: "Extremely High",
    internPath: "Build automation tools / AI wrappers (no PhD needed)",
    color: "#a78bfa"
  },
  {
    name: "Automation/Scripting",
    icon: "⚡",
    stack: "Python → Selenium/Playwright → APIs → Cron jobs",
    demand: "High",
    internPath: "Easiest internship entry point. Companies love this.",
    color: "#ff9500"
  },
  {
    name: "Full Stack (later)",
    icon: "🌐",
    stack: "Python + React basics → MongoDB → Vercel",
    demand: "High",
    internPath: "Add React in Month 4-5 only after backend is solid",
    color: "#38bdf8"
  }
];

const distractionTools = [
  {
    tool: "The 10-Second Rule",
    desc: "Before opening Reels/WhatsApp, ask: 'Is this serving my goal or stealing from it?' Wait 10 sec. Most urges die.",
    icon: "⏱️"
  },
  {
    tool: "Identity Anchor",
    desc: "Repeat daily: 'I am a developer being built.' Not 'I'm trying to study.' Identity-first kills distraction at root.",
    icon: "🧠"
  },
  {
    tool: "Energy Budgeting",
    desc: "You have ~4 hrs of real focus/day. Protect them like cash. Gossip, unsolicited advice, passive WhatsApp groups = zero ROI.",
    icon: "🔋"
  },
  {
    tool: "Social Filter",
    desc: "Before joining any conversation: 'Does this person code, build, or ship?' If no → polite exit. You're not rude, you're building.",
    icon: "🎯"
  },
  {
    tool: "Phone Protocol",
    desc: "Phone in bag or face-down during deep work. Grayscale mode during study hours. Reels = variable reward = dopamine trap.",
    icon: "📵"
  },
  {
    tool: "Replace, Don't Resist",
    desc: "When bored: open LeetCode or read a tech thread instead of Instagram. Same dopamine hit, compound interest.",
    icon: "🔄"
  }
];

const levelCheck = [
  { param: "DSA", current: "Basics (arrays, strings)", target6m: "Trees, DP, 100+ problems", gap: "Critical" },
  { param: "System Design", current: "Unaware", target6m: "Knows 5 core concepts", gap: "High" },
  { param: "Project Portfolio", current: "None live", target6m: "3 deployed projects", gap: "Critical" },
  { param: "Git/GitHub", current: "Maybe heard of it", target6m: "Active profile, PRs done", gap: "High" },
  { param: "Internship Fit", current: "0%", target6m: "60–80%", gap: "Fixable in 6m" },
  { param: "Python Depth", current: "Basics-Moderate", target6m: "OOP + APIs + Libraries", gap: "Medium" },
];

const gapColor = { "Critical": "#ff3366", "High": "#ff9500", "Medium": "#ffdd57", "Fixable in 6m": "#00ff88" };

export default function DevRoadmap() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeTab, setActiveTab] = useState("roadmap");

  const tabs = ["roadmap", "tracks", "focus", "levelcheck"];
  const tabLabels = { roadmap: "6-Month Map", tracks: "Pick Your Track", focus: "Stay Locked In", levelcheck: "Level Check" };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#060608",
      fontFamily: "'Courier New', 'SF Mono', monospace",
      color: "#e0e0e0",
      padding: "0",
      overflowX: "hidden"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #060608 0%, #0d0d1a 50%, #060608 100%)",
        borderBottom: "1px solid #1a1a2e",
        padding: "32px 24px 24px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0,255,136,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(167,139,250,0.04) 0%, transparent 50%)",
          pointerEvents: "none"
        }} />
        <div style={{ fontSize: "10px", color: "#00ff88", letterSpacing: "4px", marginBottom: "8px" }}>
          BTech IT 2028 · 4th SEM · VIRĀR, MH
        </div>
        <h1 style={{
          fontSize: "clamp(22px, 5vw, 36px)",
          fontWeight: "900",
          margin: "0 0 8px",
          fontFamily: "'Georgia', serif",
          letterSpacing: "-1px",
          background: "linear-gradient(90deg, #ffffff 0%, #a78bfa 50%, #00ff88 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          FROM ZERO TO INTERN-READY
        </h1>
        <p style={{ margin: 0, fontSize: "13px", color: "#666", maxWidth: "560px", lineHeight: "1.6" }}>
          Your personal engineering manifesto. Not a college syllabus. A real market-grade 6-month attack plan.
        </p>

        {/* Brutal Truth Banner */}
        <div style={{
          marginTop: "20px",
          padding: "12px 16px",
          background: "rgba(255,51,102,0.08)",
          border: "1px solid rgba(255,51,102,0.3)",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#ff6688",
          lineHeight: "1.7"
        }}>
          <strong style={{ color: "#ff3366" }}>BRUTAL TRUTH:</strong> Your college won't make you hireable. The market judges GitHub, not CGPA (mostly). You're 6 months away from being dangerous — IF you stop consuming and start building.
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        borderBottom: "1px solid #1a1a2e",
        background: "#060608",
        overflowX: "auto",
        padding: "0 24px"
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "14px 20px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "11px",
              letterSpacing: "2px",
              fontFamily: "'Courier New', monospace",
              fontWeight: "700",
              whiteSpace: "nowrap",
              color: activeTab === tab ? "#00ff88" : "#444",
              borderBottom: activeTab === tab ? "2px solid #00ff88" : "2px solid transparent",
              transition: "all 0.2s"
            }}
          >
            {tabLabels[tab].toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>

        {/* ROADMAP TAB */}
        {activeTab === "roadmap" && (
          <div>
            {/* Time Hacking Banner */}
            <div style={{
              marginBottom: "28px",
              padding: "16px",
              background: "rgba(0,255,136,0.04)",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: "6px"
            }}>
              <div style={{ fontSize: "10px", color: "#00ff88", letterSpacing: "3px", marginBottom: "10px" }}>⚡ COMMUTE / COLLEGE TIME HACKING</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px" }}>
                {[
                  { time: "Commute (bus/train)", do: "Read PDFs, watch short tech explainers, Anki flashcards for CS concepts" },
                  { time: "Free periods / labs", do: "Git pushes, LeetCode Easy, reading docs, reviewing your own code" },
                  { time: "Evening at home (2–3h)", do: "Deep work: DSA medium, building projects, writing code" },
                  { time: "Weekend (4–5h/day)", do: "Project sprints. Ship something. Break things. Fix them." }
                ].map((t, i) => (
                  <div key={i} style={{ fontSize: "12px" }}>
                    <div style={{ color: "#00ff88", fontWeight: "700", marginBottom: "4px" }}>{t.time}</div>
                    <div style={{ color: "#888", lineHeight: "1.5" }}>{t.do}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Cards */}
            {phases.map(phase => (
              <div
                key={phase.id}
                style={{
                  marginBottom: "20px",
                  border: `1px solid ${activePhase === phase.id ? phase.border : '#1a1a2e'}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "all 0.3s",
                  cursor: "pointer"
                }}
                onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
              >
                {/* Phase Header */}
                <div style={{
                  padding: "16px 20px",
                  background: activePhase === phase.id ? phase.bg : "#0a0a0f",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px"
                }}>
                  <div>
                    <div style={{ fontSize: "10px", color: phase.color, letterSpacing: "3px", marginBottom: "4px" }}>
                      {phase.month} · HARDNESS: {phase.hardness.toUpperCase()}
                    </div>
                    <div style={{ fontSize: "20px", fontWeight: "900", color: "#fff", letterSpacing: "-0.5px", fontFamily: "'Georgia', serif" }}>
                      PHASE {phase.id}: {phase.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "#888", marginTop: "4px" }}>{phase.focus}</div>
                  </div>
                  <div style={{
                    fontSize: "18px",
                    color: phase.color,
                    transition: "transform 0.3s",
                    transform: activePhase === phase.id ? "rotate(45deg)" : "rotate(0)"
                  }}>+</div>
                </div>

                {/* Expanded Content */}
                {activePhase === phase.id && (
                  <div style={{ background: phase.bg, padding: "20px", borderTop: `1px solid ${phase.border}20` }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
                      <thead>
                        <tr style={{ fontSize: "10px", color: "#555", letterSpacing: "2px" }}>
                          <th style={{ textAlign: "left", padding: "6px 0", width: "50%" }}>SKILL / TASK</th>
                          <th style={{ textAlign: "left", padding: "6px 8px" }}>WHERE TO DO IT</th>
                          <th style={{ textAlign: "center", padding: "6px 0" }}>DIFFICULTY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {phase.items.map((item, i) => (
                          <tr key={i} style={{ borderTop: "1px solid #ffffff08" }}>
                            <td style={{ padding: "10px 0", fontSize: "13px", color: "#ddd", lineHeight: "1.4" }}>{item.skill}</td>
                            <td style={{ padding: "10px 8px", fontSize: "11px", color: "#888" }}>{item.where}</td>
                            <td style={{ textAlign: "center", padding: "10px 0" }}>
                              <div style={{ display: "flex", gap: "2px", justifyContent: "center" }}>
                                {[1,2,3,4,5].map(n => (
                                  <div key={n} style={{
                                    width: "8px", height: "8px", borderRadius: "50%",
                                    background: n <= item.hard ? phase.color : "#222"
                                  }} />
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div style={{
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "4px",
                      borderLeft: `3px solid ${phase.color}`,
                      marginBottom: "10px"
                    }}>
                      <div style={{ fontSize: "10px", color: phase.color, letterSpacing: "2px", marginBottom: "4px" }}>MILESTONE GOAL</div>
                      <div style={{ fontSize: "13px", color: "#ccc" }}>{phase.goal}</div>
                    </div>
                    <div style={{
                      padding: "10px 16px",
                      background: `${phase.color}10`,
                      borderRadius: "4px",
                      fontSize: "12px",
                      color: phase.color,
                      borderLeft: `3px solid ${phase.color}`
                    }}>
                      🎯 <strong>Internship Signal:</strong> {phase.internSignal}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div style={{
              padding: "16px 20px",
              background: "rgba(167,139,250,0.06)",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: "6px",
              fontSize: "13px",
              color: "#a78bfa",
              lineHeight: "1.7",
              marginTop: "8px"
            }}>
              <strong>🚫 WHAT TO SKIP FOR NOW:</strong> Vibe coding (Cursor/Copilot) before you can code manually — it makes you dependent and you won't learn. No-code tools? Not yet. Java/C++ rabbit holes? No. Learn one backend stack deeply. Ship or shut up.
            </div>
          </div>
        )}

        {/* TRACKS TAB */}
        {activeTab === "tracks" && (
          <div>
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "24px", lineHeight: "1.7" }}>
              Pick <strong style={{ color: "#fff" }}>ONE track</strong> and go deep. Switching tracks is the #1 reason students stay stuck. Given your Python base → <strong style={{ color: "#00ff88" }}>Backend or Automation</strong> is your fastest path to an internship.
            </div>

            {tracks.map((t, i) => (
              <div key={i} style={{
                marginBottom: "16px",
                padding: "20px",
                background: "#0a0a0f",
                border: `1px solid ${t.color}30`,
                borderRadius: "8px",
                borderLeft: `4px solid ${t.color}`
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <div style={{ fontSize: "18px", marginBottom: "6px" }}>
                      {t.icon} <span style={{ color: t.color, fontWeight: "900", letterSpacing: "-0.5px" }}>{t.name}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#666", marginBottom: "10px", letterSpacing: "1px" }}>
                      STACK: <span style={{ color: "#aaa" }}>{t.stack}</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#888", lineHeight: "1.6" }}>
                      📌 {t.internPath}
                    </div>
                  </div>
                  <div style={{
                    padding: "4px 12px",
                    background: `${t.color}15`,
                    border: `1px solid ${t.color}40`,
                    borderRadius: "3px",
                    fontSize: "10px",
                    color: t.color,
                    letterSpacing: "2px",
                    whiteSpace: "nowrap"
                  }}>
                    {t.demand}
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              marginTop: "8px",
              padding: "20px",
              background: "rgba(0,255,136,0.04)",
              border: "1px solid rgba(0,255,136,0.2)",
              borderRadius: "6px"
            }}>
              <div style={{ fontSize: "10px", color: "#00ff88", letterSpacing: "3px", marginBottom: "12px" }}>RECOMMENDED FOR YOU RIGHT NOW</div>
              <div style={{ fontSize: "14px", color: "#fff", lineHeight: "1.8" }}>
                Given 4th sem + Python basics → Go: <strong style={{ color: "#00ff88" }}>Automation → Backend</strong><br/>
                <span style={{ color: "#888", fontSize: "12px" }}>
                  Month 1-2: Pure Python + DSA<br/>
                  Month 3-4: FastAPI + small automation scripts<br/>
                  Month 5-6: Mix AI APIs (OpenAI/Gemini) into your automation project = 🔥 resume gold
                </span>
              </div>
            </div>
          </div>
        )}

        {/* FOCUS TAB */}
        {activeTab === "focus" && (
          <div>
            <div style={{
              padding: "16px",
              background: "rgba(255,51,102,0.06)",
              border: "1px solid rgba(255,51,102,0.2)",
              borderRadius: "6px",
              fontSize: "13px",
              color: "#ff6688",
              marginBottom: "24px",
              lineHeight: "1.7"
            }}>
              <strong>The Engineering:</strong> Reels, gossip, unsolicited advice, over-caring about others' drama — these aren't personality flaws. They're <strong>low-effort dopamine</strong>. Your brain prefers them because they're easy. You need to make <strong>building feel easier</strong> than consuming. Here's how.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              {distractionTools.map((d, i) => (
                <div key={i} style={{
                  padding: "18px",
                  background: "#0a0a0f",
                  border: "1px solid #1a1a2e",
                  borderRadius: "8px",
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>{d.icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>{d.tool}</div>
                  <div style={{ fontSize: "12px", color: "#777", lineHeight: "1.7" }}>{d.desc}</div>
                </div>
              ))}
            </div>

            {/* Daily Schedule */}
            <div style={{
              padding: "20px",
              background: "#0a0a0f",
              border: "1px solid #1a1a2e",
              borderRadius: "8px"
            }}>
              <div style={{ fontSize: "10px", color: "#a78bfa", letterSpacing: "3px", marginBottom: "16px" }}>SAMPLE DAILY SCHEDULE (COLLEGE DAY)</div>
              {[
                { time: "6:00–7:00", act: "Morning: LeetCode 1 problem (no phone before this)", type: "deep" },
                { time: "Commute", act: "Read tech article / PDF / watch 1 concept video (NO reels)", type: "light" },
                { time: "College", act: "Attend what's needed. Free time = GitHub / docs reading", type: "light" },
                { time: "Commute back", act: "Review what you coded, think about next feature", type: "light" },
                { time: "6:00–9:00pm", act: "DEEP WORK BLOCK: Project coding or DSA medium problems", type: "deep" },
                { time: "9:00–10:00", act: "Review, push to GitHub, plan tomorrow (15 min), read (45 min)", type: "light" },
                { time: "After 10", act: "Phone goes away. Sleep is a performance multiplier.", type: "rest" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: "16px",
                  padding: "10px 0",
                  borderTop: i > 0 ? "1px solid #111" : "none",
                  alignItems: "flex-start"
                }}>
                  <div style={{
                    minWidth: "80px",
                    fontSize: "11px",
                    color: s.type === "deep" ? "#00ff88" : s.type === "rest" ? "#a78bfa" : "#ff9500",
                    fontWeight: "700",
                    letterSpacing: "0.5px"
                  }}>{s.time}</div>
                  <div style={{ fontSize: "12px", color: "#999", lineHeight: "1.5" }}>{s.act}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "16px",
              padding: "16px",
              background: "rgba(167,139,250,0.06)",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: "6px",
              fontSize: "13px",
              color: "#a78bfa",
              lineHeight: "1.8"
            }}>
              <strong>On giving unsolicited advice & joining every conversation:</strong> This is often validation-seeking in disguise. You want to feel useful or included. Redirect that energy — write a blog post, help on Stack Overflow, answer questions on Discord servers. Same social energy, 10x the return.
            </div>
          </div>
        )}

        {/* LEVEL CHECK TAB */}
        {activeTab === "levelcheck" && (
          <div>
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "20px", lineHeight: "1.7" }}>
              Honest snapshot of where you are vs where the market expects a first-year intern to be. Use this to track monthly.
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ fontSize: "10px", color: "#555", letterSpacing: "2px" }}>
                    {["PARAMETER", "YOU NOW", "6-MONTH TARGET", "GAP"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "12px 8px", borderBottom: "1px solid #1a1a2e" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {levelCheck.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #0d0d0d" }}>
                      <td style={{ padding: "14px 8px", fontSize: "13px", color: "#fff", fontWeight: "700" }}>{row.param}</td>
                      <td style={{ padding: "14px 8px", fontSize: "12px", color: "#666" }}>{row.current}</td>
                      <td style={{ padding: "14px 8px", fontSize: "12px", color: "#aaa" }}>{row.target6m}</td>
                      <td style={{ padding: "14px 8px" }}>
                        <span style={{
                          padding: "3px 10px",
                          background: `${gapColor[row.gap]}15`,
                          border: `1px solid ${gapColor[row.gap]}40`,
                          borderRadius: "3px",
                          fontSize: "10px",
                          color: gapColor[row.gap],
                          letterSpacing: "1px",
                          fontWeight: "700",
                          whiteSpace: "nowrap"
                        }}>{row.gap}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {[
                { q: "Am I vibe-coding without understanding?", ans: "Use AI tools only after you can write the logic manually first. Otherwise you're a prompt monkey, not a developer." },
                { q: "Is DSA actually needed?", ans: "Yes for any company doing structured hiring. But you don't need 500 problems — 100 focused problems beat 300 random ones." },
                { q: "Should I learn multiple languages?", ans: "No. Python → master it. Add JavaScript only if you go full-stack. Breadth without depth is worthless at your stage." },
                { q: "Will my college matter?", ans: "Less than you fear. GitHub, real projects, and interview performance dominate. Tier-3 engineers crack Tier-1 companies all the time." },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "16px",
                  background: "#0a0a0f",
                  border: "1px solid #1a1a2e",
                  borderRadius: "6px"
                }}>
                  <div style={{ fontSize: "12px", color: "#fff", fontWeight: "700", marginBottom: "8px", lineHeight: "1.4" }}>❓ {item.q}</div>
                  <div style={{ fontSize: "11px", color: "#777", lineHeight: "1.6" }}>{item.ans}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: "24px",
              padding: "20px",
              background: "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(167,139,250,0.05))",
              border: "1px solid rgba(0,255,136,0.3)",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "10px", color: "#00ff88", letterSpacing: "3px", marginBottom: "12px" }}>YOUR ONE METRIC</div>
              <div style={{ fontSize: "22px", color: "#fff", fontWeight: "900", fontFamily: "'Georgia', serif", marginBottom: "8px" }}>
                "Did I ship something today?"
              </div>
              <div style={{ fontSize: "12px", color: "#666", lineHeight: "1.7" }}>
                Not "did I study?" or "did I watch a tutorial?"<br/>
                Code pushed. Problem solved. Feature built.<br/>
                <strong style={{ color: "#a78bfa" }}>Builders get hired. Studiers don't.</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "20px 24px",
        borderTop: "1px solid #0d0d0d",
        textAlign: "center",
        fontSize: "11px",
        color: "#333",
        letterSpacing: "1px"
      }}>
        BUILT FOR YOU · VIRAR, MH · BTECH IT 2028 · STAY CONSISTENT OR STAY AVERAGE
      </div>
    </div>
  );
}
