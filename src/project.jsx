import { useState } from "react";

/* ─── Design Tokens ──────────────────────────────────────────── */
const C = {
  bg:          "#0D1117",
  surface:     "#161B22",
  surfaceAlt:  "#1C2128",
  border:      "#30363D",
  accent:      "#6366F1",
  accentLight: "#818CF8",
  success:     "#10B981",
  warning:     "#F59E0B",
  danger:      "#EF4444",
  text:        "#F0F6FC",
  textMuted:   "#8B949E",
  textDim:     "#484F58",
};

/* ─── Shared Style Helpers ───────────────────────────────────── */
const card  = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "24px" };
const inp   = { width: "100%", padding: "10px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px", color: C.text, fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" };
const label = { display: "block", fontSize: "11px", fontWeight: 700, color: C.textMuted, marginBottom: "7px", textTransform: "uppercase", letterSpacing: "0.8px" };

function Btn({ children, variant = "primary", full, sm, onClick, disabled, style = {} }) {
  const base = { border: "none", cursor: disabled ? "not-allowed" : "pointer", fontWeight: 600, borderRadius: "8px", fontFamily: "Inter, sans-serif", transition: "opacity .15s, transform .1s", opacity: disabled ? 0.45 : 1 };
  const size = sm ? { padding: "6px 12px", fontSize: "12px" } : { padding: "10px 20px", fontSize: "14px" };
  const color =
    variant === "primary" ? { background: C.accent,   color: "#fff" } :
    variant === "success" ? { background: C.success,  color: "#fff" } :
    variant === "danger"  ? { background: C.danger,   color: "#fff" } :
    /* secondary */         { background: C.surface,  color: C.text, border: `1px solid ${C.border}` };
  return (
    <button onClick={disabled ? undefined : onClick}
      style={{ ...base, ...size, ...color, ...(full ? { width: "100%" } : {}), ...style }}>
      {children}
    </button>
  );
}

/* ─── Sub-pages defined OUTSIDE parent to avoid remount ─────── */

function AuthPage({ authMode, setAuthMode, onLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 65px)" }}>
      <div style={{ width: "400px", padding: "32px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "28px", fontWeight: 700, margin: "0 0 8px" }}>
            {authMode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p style={{ color: C.textMuted, fontSize: "14px", lineHeight: 1.5 }}>
            {authMode === "login" ? "Sign in to continue your learning streak." : "Start your focused learning journey today."}
          </p>
        </div>

        {/* Toggle tabs */}
        <div style={{ display: "flex", background: C.bg, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
          {[["login", "Log In"], ["register", "Sign Up"]].map(([m, lbl]) => (
            <button key={m} onClick={() => setAuthMode(m)}
              style={{ flex: 1, padding: "8px", border: "none", borderRadius: "7px", cursor: "pointer", fontWeight: 600, fontSize: "14px", transition: "all .15s", background: authMode === m ? C.accent : "transparent", color: authMode === m ? "#fff" : C.textMuted, fontFamily: "Inter, sans-serif" }}>
              {lbl}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {authMode === "register" && (
            <div>
              <div style={label}>Name</div>
              <input style={inp} placeholder="Your name" value={form.name} onChange={set("name")} />
            </div>
          )}
          <div>
            <div style={label}>Email</div>
            <input style={inp} type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
          </div>
          <div>
            <div style={label}>Password</div>
            <input style={inp} type="password" placeholder="••••••••" value={form.password} onChange={set("password")} />
          </div>
          {authMode === "login" && (
            <div style={{ textAlign: "right", marginTop: "-6px" }}>
              <span style={{ fontSize: "12px", color: C.accent, cursor: "pointer", fontWeight: 600 }}>Forgot password?</span>
            </div>
          )}
          <Btn full onClick={onLogin} style={{ padding: "13px", fontSize: "15px", marginTop: "6px", borderRadius: "9px" }}>
            {authMode === "login" ? "Sign In" : "Create Account"}
          </Btn>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13px", color: C.textMuted }}>
          {authMode === "login" ? "No account? " : "Already have one? "}
          <span onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
            style={{ color: C.accent, fontWeight: 600, cursor: "pointer" }}>
            {authMode === "login" ? "Sign up free" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
}

function PlayerPage({ ytId, setYtId }) {
  const [url,       setUrl]       = useState("");
  const [notes,     setNotes]     = useState("");
  const [progress,  setProgress]  = useState(0);
  const [done,      setDone]      = useState(false);
  const [focus,     setFocus]     = useState(false);

  const extractId = (u) => {
    const m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return m ? m[1] : null;
  };
  const load = () => {
    const id = extractId(url);
    if (id) { setYtId(id); setProgress(0); setDone(false); }
  };
  const mark = () => { setProgress(100); setDone(true); };
  const words = notes.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: focus ? "16px 24px" : "36px 32px" }}>
      {/* Header */}
      {!focus && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "28px", fontWeight: 700, margin: "0 0 4px" }}>YouBox Player</h1>
            <p style={{ color: C.textMuted, fontSize: "14px" }}>No recommendations. No distractions. Just the video.</p>
          </div>
          <Btn variant="secondary" onClick={() => setFocus(true)}>⚡ Enter Focus Mode</Btn>
        </div>
      )}

      {/* URL Bar */}
      <div style={{ ...card, padding: "14px 18px", marginBottom: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
        <input style={{ ...inp, flex: 1, background: C.bg, border: `1px solid ${C.border}` }}
          value={url} onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === "Enter" && load()}
          placeholder="Paste a YouTube URL and press Enter — e.g. https://youtube.com/watch?v=..." />
        <Btn onClick={load}>Load Video</Btn>
        {focus && <Btn variant="secondary" sm onClick={() => setFocus(false)}>Exit Focus</Btn>}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 370px", gap: "16px" }}>

        {/* ── Left: Video + Progress ── */}
        <div>
          {/* Player */}
          <div style={{ background: "#000", borderRadius: "12px", overflow: "hidden", aspectRatio: "16/9", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {ytId ? (
              <iframe key={ytId} width="100%" height="100%"
                src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1&iv_load_policy=3&fs=1`}
                title="Study video" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen style={{ display: "block", minHeight: "320px" }} />
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "64px", opacity: 0.15, marginBottom: "12px" }}>▶</div>
                <p style={{ color: C.textMuted, fontSize: "15px" }}>Paste a YouTube link above to start watching</p>
                <p style={{ color: C.textDim, fontSize: "12px", marginTop: "6px" }}>No sidebar · No recommendations · No autoplay</p>
              </div>
            )}
          </div>

          {/* Progress row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
            <div style={{ flex: 1, height: "6px", background: C.border, borderRadius: "100px", overflow: "hidden" }}>
              <div style={{ width: `${progress}%`, height: "100%", borderRadius: "100px", transition: "width .4s ease",
                background: done ? C.success : `linear-gradient(90deg, ${C.accent}, ${C.accentLight})` }} />
            </div>
            <span style={{ fontSize: "13px", color: C.textMuted, minWidth: "36px", textAlign: "right" }}>{progress}%</span>
            <Btn variant={done ? "success" : "primary"} sm onClick={mark} disabled={!ytId}>
              {done ? "✓ Complete" : "Mark Complete"}
            </Btn>
          </div>

          {/* Quick-progress shortcuts */}
          {ytId && !done && (
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <span style={{ fontSize: "12px", color: C.textDim, alignSelf: "center", marginRight: "4px" }}>Jump to:</span>
              {[25, 50, 75].map(p => (
                <Btn key={p} variant="secondary" sm onClick={() => setProgress(p)}>{p}%</Btn>
              ))}
            </div>
          )}

          {/* Session complete card */}
          {done && (
            <div style={{ marginTop: "16px", padding: "16px 20px", background: `${C.success}18`, border: `1px solid ${C.success}40`, borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "28px" }}>🎉</span>
              <div>
                <div style={{ fontWeight: 700, color: C.success }}>Session complete!</div>
                <div style={{ fontSize: "13px", color: C.textMuted }}>Your progress and notes have been saved.</div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Notes + Info ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Notes Editor */}
          <div style={{ ...card, display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px" }}>Session Notes</h3>
              <span style={{ fontSize: "11px", color: C.success, fontWeight: 600, letterSpacing: "0.3px" }}>● Auto-saved</span>
            </div>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder={"Take notes as you watch...\n\nTip: Use timestamps like [2:30] to mark key moments."}
              style={{ flex: 1, minHeight: "300px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: "8px", padding: "12px 14px", color: C.text, fontSize: "14px", lineHeight: 1.65, resize: "vertical", outline: "none", fontFamily: "Inter, sans-serif" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <span style={{ fontSize: "12px", color: C.textDim }}>{words} word{words !== 1 ? "s" : ""}</span>
              <span style={{ fontSize: "12px", color: C.textDim }}>{notes.length} chars</span>
            </div>
          </div>

          {/* Shortcuts */}
          <div style={{ ...card, padding: "16px 18px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: C.textMuted, letterSpacing: "0.8px", marginBottom: "10px" }}>SHORTCUTS</div>
            {[["Enter", "Load video"], ["K / Space", "Play / Pause"], ["J / L", "Back / Forward 10s"], ["Ctrl + S", "Save notes"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <span style={{ fontSize: "12px", color: C.textMuted }}>{v}</span>
                <kbd style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: "5px", padding: "2px 7px", fontSize: "11px", color: C.text, fontFamily: "monospace" }}>{k}</kbd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────────── */
export default function YouBox() {
  const [page,      setPage]      = useState("landing");
  const [authMode,  setAuthMode]  = useState("login");
  const [loggedIn,  setLoggedIn]  = useState(false);
  const [ytId,      setYtId]      = useState("");

  const nav = (p) => { setPage(p); window.scrollTo(0, 0); };
  const login = () => { setLoggedIn(true); nav("dashboard"); };

  /* ── Static Data ── */
  const user = { name: "Alex", streak: 7, totalHours: 24, videosCompleted: 12, goalVideos: 10, completedGoal: 3 };

  const badges = [
    { icon: "🎯", name: "First Video",    desc: "Completed your first study session",       earned: true  },
    { icon: "🔥", name: "Weekly Winner",  desc: "7 consecutive days of studying",           earned: true  },
    { icon: "📚", name: "Deep Diver",     desc: "Accumulated 10+ total hours of study",     earned: true  },
    { icon: "🏆", name: "Century Club",   desc: "Complete 100 total videos",                earned: false },
    { icon: "⚡", name: "Speed Learner",  desc: "Finish 5 videos in a single day",          earned: false },
    { icon: "🌟", name: "Consistent",     desc: "Maintain a 30-day study streak",           earned: false },
  ];

  const recentVideos = [
    { title: "CS50 Lecture 1 — C",         duration: "1h 52m", progress: 100, done: true  },
    { title: "MIT 18.06 Linear Algebra",   duration: "39m",    progress: 65,  done: false },
    { title: "React Hooks Deep Dive",      duration: "45m",    progress: 30,  done: false },
  ];

  // 26-week × 7-day activity grid (seeded mock)
  const heatmap = Array.from({ length: 26 * 7 }, (_, i) => ({
    count: [0,0,0,1,2,3,0,1,0,2][i % 10] ?? 0,
  }));
  const heatColor = (n) =>
    n === 0 ? C.surfaceAlt :
    n === 1 ? `${C.accent}50` :
    n === 2 ? `${C.accent}90` :
              C.accent;

  /* ── Navbar ── */
  const Nav = () => (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: `${C.bg}ee`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: "64px" }}>
      {/* Logo */}
      <div onClick={() => nav(loggedIn ? "dashboard" : "landing")}
        style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "22px", fontWeight: 800, letterSpacing: "-0.5px", cursor: "pointer", userSelect: "none" }}>
        You<span style={{ color: C.accent }}>Box</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        {loggedIn ? (
          <>
            {[["dashboard", "Dashboard"], ["player", "Player"], ["analytics", "Analytics"]].map(([p, lbl]) => (
              <button key={p} onClick={() => nav(p)}
                style={{ padding: "7px 14px", border: "none", cursor: "pointer", borderRadius: "8px", fontSize: "14px", fontWeight: 500, fontFamily: "Inter, sans-serif", transition: "all .15s",
                  background: page === p ? C.surface : "transparent",
                  color:      page === p ? C.text    : C.textMuted }}>
                {lbl}
              </button>
            ))}
            <Btn variant="secondary" sm style={{ marginLeft: "6px" }} onClick={() => { setLoggedIn(false); nav("landing"); }}>Sign Out</Btn>
          </>
        ) : (
          <>
            <button onClick={() => nav("auth")} style={{ padding: "7px 14px", border: "none", background: "transparent", color: C.textMuted, cursor: "pointer", fontSize: "14px", fontFamily: "Inter, sans-serif" }}>Log In</button>
            <Btn onClick={() => { nav("auth"); setAuthMode("register"); }} style={{ padding: "8px 18px" }}>Get Started</Btn>
          </>
        )}
      </div>
    </nav>
  );

  /* ─── Landing ─── */
  const Landing = (
    <div>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "110px 32px 80px", maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: `${C.accent}18`, border: `1px solid ${C.accent}38`, borderRadius: "100px", padding: "5px 14px", marginBottom: "28px", color: C.accentLight, fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px" }}>
          ✦ FOCUS-FIRST LEARNING
        </div>
        <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(44px, 8vw, 72px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2.5px", margin: "0 0 24px" }}>
          Study Without<br /><span style={{ color: C.accent }}>Distractions.</span>
        </h1>
        <p style={{ fontSize: "19px", color: C.textMuted, lineHeight: 1.7, margin: "0 0 44px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
          YouBox strips YouTube down to what actually matters — the video, your notes, and your goals. No rabbit holes. No recommendations. No noise.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={() => { setAuthMode("register"); nav("auth"); }} style={{ padding: "14px 36px", fontSize: "16px", borderRadius: "10px" }}>
            Get Started — It's Free
          </Btn>
          <Btn variant="secondary" onClick={() => { setLoggedIn(true); nav("dashboard"); }} style={{ padding: "14px 36px", fontSize: "16px", borderRadius: "10px" }}>
            View Live Demo →
          </Btn>
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px 100px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {[
          { icon: "🚫", title: "Zero Distractions",  desc: "No sidebar. No autoplay rabbit holes. No Up Next interruptions ever." },
          { icon: "🎯", title: "Focused Player",     desc: "Paste any YouTube URL and drop into a clean, cinema-style viewer instantly." },
          { icon: "📊", title: "Track Progress",     desc: "Log sessions, monitor your study hours, and visualize consistency over time." },
          { icon: "🏅", title: "Achievement Badges", desc: "Earn rewards for streaks, milestones, and the study habits that compound." },
        ].map((f, i) => (
          <div key={i} style={{ ...card, textAlign: "center" }}>
            <div style={{ fontSize: "42px", marginBottom: "16px" }}>{f.icon}</div>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "16px", marginBottom: "10px" }}>{f.title}</div>
            <div style={{ color: C.textMuted, fontSize: "13px", lineHeight: 1.65 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── Dashboard ─── */
  const Dashboard = (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px" }}>
      {/* Greeting */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "30px", fontWeight: 700, margin: "0 0 6px" }}>
          Good morning, {user.name} 👋
        </h1>
        <p style={{ color: C.textMuted, fontSize: "15px" }}>
          You're on a <span style={{ color: C.warning, fontWeight: 700 }}>{user.streak}-day streak 🔥</span> — don't break the chain!
        </p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Hours Studied",   value: `${user.totalHours}h`,                        icon: "⏱", color: C.accent      },
          { label: "Videos Done",     value: user.videosCompleted,                          icon: "✅", color: C.success     },
          { label: "Day Streak",      value: `${user.streak} 🔥`,                           icon: "",   color: C.warning     },
          { label: "Goal Progress",   value: `${user.completedGoal}/${user.goalVideos}`,    icon: "🎯", color: C.accentLight },
        ].map((s, i) => (
          <div key={i} style={card}>
            <div style={{ fontSize: "22px", marginBottom: "10px" }}>{s.icon}</div>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "30px", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: "12px", color: C.textMuted, marginTop: "6px", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Goal Progress Bar */}
      <div style={{ ...card, marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
          <span style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px" }}>Monthly Goal</span>
          <span style={{ color: C.textMuted, fontSize: "13px" }}>{user.completedGoal} of {user.goalVideos} videos</span>
        </div>
        <div style={{ height: "8px", background: C.bg, borderRadius: "100px", overflow: "hidden" }}>
          <div style={{ width: `${(user.completedGoal / user.goalVideos) * 100}%`, height: "100%", borderRadius: "100px", background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`, transition: "width .6s ease" }} />
        </div>
        <div style={{ marginTop: "8px", fontSize: "12px", color: C.textMuted }}>
          {user.goalVideos - user.completedGoal} more videos to hit your target this month
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px" }}>
        {/* Recent Videos */}
        <div style={card}>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, margin: "0 0 16px" }}>Recent Videos</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {recentVideos.map((v, i) => (
              <div key={i} onClick={() => nav("player")} style={{ padding: "14px 16px", background: C.bg, borderRadius: "9px", cursor: "pointer", border: `1px solid transparent`, transition: "border-color .15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.border}
                onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 600, fontSize: "14px" }}>{v.title}</span>
                  <span style={{ color: C.textMuted, fontSize: "12px", marginLeft: "12px", whiteSpace: "nowrap" }}>{v.duration}</span>
                </div>
                <div style={{ height: "4px", background: C.border, borderRadius: "100px", overflow: "hidden" }}>
                  <div style={{ width: `${v.progress}%`, height: "100%", borderRadius: "100px", background: v.done ? C.success : C.accent }} />
                </div>
                <div style={{ marginTop: "5px", fontSize: "11px", color: v.done ? C.success : C.textMuted }}>
                  {v.done ? "✓ Completed" : `${v.progress}% complete`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* CTA */}
          <div style={{ ...card, background: `linear-gradient(135deg, ${C.accent}22 0%, ${C.surface} 100%)`, border: `1px solid ${C.accent}38` }}>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, margin: "0 0 8px" }}>Start a Session</h3>
            <p style={{ color: C.textMuted, fontSize: "13px", lineHeight: 1.55, margin: "0 0 18px" }}>
              Paste any YouTube link and enter distraction-free focus mode.
            </p>
            <Btn full onClick={() => nav("player")} style={{ padding: "12px", borderRadius: "9px" }}>Open Player →</Btn>
          </div>

          {/* Badges preview */}
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "15px", margin: 0 }}>Badges</h3>
              <span onClick={() => nav("analytics")} style={{ fontSize: "12px", color: C.accent, cursor: "pointer", fontWeight: 600 }}>See all →</span>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {badges.filter(b => b.earned).map((b, i) => (
                <span key={i} title={b.name} style={{ fontSize: "30px", cursor: "default" }}>{b.icon}</span>
              ))}
            </div>
            <div style={{ marginTop: "12px", fontSize: "12px", color: C.textMuted }}>
              {badges.filter(b => !b.earned).length} more to unlock
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ─── Analytics ─── */
  const Analytics = (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 32px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "30px", fontWeight: 700, margin: "0 0 6px" }}>Analytics</h1>
        <p style={{ color: C.textMuted, fontSize: "15px" }}>Track your consistency and celebrate every milestone.</p>
      </div>

      {/* Top Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Hours Studied",     value: "24h 18m", sub: "All time",           color: C.accent,  icon: "⏱" },
          { label: "Videos Completed",  value: "12",      sub: "3 this week",         color: C.success, icon: "🎬" },
          { label: "Longest Streak",    value: "7 days",  sub: "Currently active 🔥", color: C.warning, icon: "🔥" },
        ].map((s, i) => (
          <div key={i} style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "36px", fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontWeight: 600, fontSize: "14px", marginTop: "4px" }}>{s.label}</div>
                <div style={{ fontSize: "12px", color: C.textMuted, marginTop: "3px" }}>{s.sub}</div>
              </div>
              <span style={{ fontSize: "30px", opacity: 0.55 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Heatmap */}
      <div style={{ ...card, marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "18px" }}>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "16px", margin: 0 }}>Study Activity — Last 26 Weeks</h3>
          <span style={{ fontSize: "12px", color: C.textMuted }}>Each column = 1 week</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(26, 1fr)", gap: "4px" }}>
          {heatmap.map((d, i) => (
            <div key={i} title={`${d.count} session${d.count !== 1 ? "s" : ""}`}
              style={{ aspectRatio: "1", borderRadius: "3px", background: heatColor(d.count), transition: "opacity .15s", cursor: "default" }} />
          ))}
        </div>
        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end", marginTop: "12px" }}>
          <span style={{ fontSize: "11px", color: C.textMuted }}>Less</span>
          {[0, 1, 2, 3].map(n => (
            <div key={n} style={{ width: "13px", height: "13px", borderRadius: "3px", background: heatColor(n === 0 ? 0 : n) }} />
          ))}
          <span style={{ fontSize: "11px", color: C.textMuted }}>More</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div style={card}>
        <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "16px", margin: "0 0 20px" }}>Badges & Achievements</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {badges.map((b, i) => (
            <div key={i} style={{ padding: "16px", background: C.bg, borderRadius: "10px", display: "flex", gap: "14px", alignItems: "flex-start",
              border: `1px solid ${b.earned ? C.accent + "44" : C.border}`,
              opacity: b.earned ? 1 : 0.38 }}>
              <span style={{ fontSize: "34px", lineHeight: 1, flexShrink: 0 }}>{b.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>{b.name}</div>
                <div style={{ fontSize: "12px", color: C.textMuted, lineHeight: 1.5 }}>{b.desc}</div>
                {b.earned && <div style={{ fontSize: "11px", color: C.success, fontWeight: 700, marginTop: "7px" }}>✓ Earned</div>}
                {!b.earned && <div style={{ fontSize: "11px", color: C.textDim, fontWeight: 600, marginTop: "7px" }}>Locked</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── Render ─── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D1117; }
        input::placeholder, textarea::placeholder { color: #484F58; }
        button:hover  { opacity: .82 !important; }
        button:active { transform: scale(.97) !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track  { background: #0D1117; }
        ::-webkit-scrollbar-thumb  { background: #30363D; border-radius: 3px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Inter, sans-serif" }}>
        <Nav />
        {page === "landing"   && Landing}
        {page === "auth"      && <AuthPage authMode={authMode} setAuthMode={setAuthMode} onLogin={login} />}
        {page === "dashboard" && Dashboard}
        {page === "player"    && <PlayerPage ytId={ytId} setYtId={setYtId} />}
        {page === "analytics" && Analytics}
      </div>
    </>
  );
}

