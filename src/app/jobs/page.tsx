"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { JOBS, JOB_CATEGORIES, type Job } from "@/components/data";

function JobSheet({ job, onClose }: { job: Job; onClose: () => void }) {
  const [tab, setTab] = useState<"roadmap"|"life"|"impact">("roadmap");
  return (
    <div style={{ position:"fixed",inset:0,zIndex:100 }}>
      <div onClick={onClose} style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)" }} />
      <div style={{ position:"absolute",bottom:0,left:0,right:0,background:"var(--bg-card)",borderRadius:"24px 24px 0 0",maxHeight:"93vh",overflow:"auto",paddingBottom:32,border:"1px solid var(--border)" }}>
        <div style={{ display:"flex",justifyContent:"center",padding:"10px 0 4px" }}><div style={{ width:36,height:4,borderRadius:4,background:"rgba(255,255,255,0.12)" }} /></div>
        <div style={{ padding:"0 20px" }}>
          <div style={{ display:"flex",gap:5,marginBottom:8 }}>
            {job.isNew && <span style={{ background:"#0C7C59",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10 }}>NEW</span>}
            {job.isHot && <span style={{ background:"#dc2626",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 8px",borderRadius:10 }}>🔥 TRENDING</span>}
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"var(--text-dark)",lineHeight:1.25,marginBottom:2 }}>{job.title}</h2>
          <p style={{ fontSize:12,color:"var(--text-light)",marginBottom:16 }}>{job.org}</p>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:18 }}>
            {[{l:"Vacancies",v:job.vacancies.toLocaleString(),i:"👥"},{l:"In-Hand Salary",v:job.inHand,i:"💰"},{l:"Last Date",v:job.lastDate,i:"📅"},{l:"Post",v:job.grade.length>30?job.grade.slice(0,30)+"…":job.grade,i:"📊"}].map((s,i)=>(
              <div key={i} style={{ background:"var(--bg-card-2)",borderRadius:10,padding:"10px 12px",border:"1px solid var(--border)" }}>
                <div style={{ fontSize:10,color:"var(--text-light)",marginBottom:2 }}>{s.i} {s.l}</div>
                <div style={{ fontSize:12,fontWeight:600,color:"var(--text-dark)" }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:"flex",gap:3,marginBottom:18,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:3 }}>
            {(["roadmap","life","impact"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{
                flex:1,padding:"9px 0",borderRadius:8,fontSize:12,fontWeight:600,border:"none",cursor:"pointer",transition:"all 0.2s",
                background:tab===t?"var(--bg-card-2)":"transparent",
                color:tab===t?"var(--text-dark)":"var(--text-light)",
                boxShadow:tab===t?"var(--shadow-sm)":"none",
              }}>{t==="roadmap"?"Roadmap":t==="life"?"Life & Salary":"Your Impact"}</button>
            ))}
          </div>

          {/* ROADMAP TAB */}
          {tab==="roadmap" && (
            <div className="anim-fade">
              <p style={{ fontSize:13,color:"var(--text-body)",marginBottom:18,lineHeight:1.5 }}>Your step-by-step journey — from where you are today to your first day in uniform:</p>
              {/* Premium timeline */}
              <div style={{ position:"relative",paddingLeft:36 }}>
                <div style={{ position:"absolute",left:14,top:12,bottom:12,width:2,background:"linear-gradient(to bottom,#3B82F6,rgba(59,130,246,0.1))",borderRadius:2 }} />
                {job.roadmap.map((r,i)=>(
                  <div key={i} style={{ position:"relative",marginBottom:i===job.roadmap.length-1?0:24 }}>
                    <div style={{
                      position:"absolute",left:-28,top:2,width:24,height:24,borderRadius:"50%",
                      background:i===job.roadmap.length-1?"#3B82F6":"var(--bg-card)",
                      border:"2.5px solid #3B82F6",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,
                      color:i===job.roadmap.length-1?"#fff":"#3B82F6",boxShadow:"0 2px 8px rgba(59,130,246,0.25)",
                    }}>{r.icon}</div>
                    <div style={{ background:"var(--bg-card-2)",borderRadius:12,padding:"12px 14px",border:"1px solid var(--border)" }}>
                      <div style={{ fontSize:14,fontWeight:700,color:"var(--text-dark)",marginBottom:2 }}>{r.step}</div>
                      <div style={{ fontSize:12,color:"var(--text-body)",lineHeight:1.5 }}>{r.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promotion Path */}
              <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"var(--text-dark)",marginTop:28,marginBottom:12 }}>Promotion & Salary Growth</h3>
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                {job.promotionPath.map((p,i)=>(
                  <div key={i} style={{
                    display:"flex",alignItems:"center",justifyContent:"space-between",
                    background:i===0?"rgba(59,130,246,0.08)":"var(--bg-card-2)",
                    borderRadius:10,padding:"12px 14px",
                    border:i===0?"1px solid rgba(59,130,246,0.2)":"1px solid var(--border)",
                  }}>
                    <div>
                      <div style={{ fontSize:13,fontWeight:700,color:"var(--text-dark)" }}>{p.title}</div>
                      <div style={{ fontSize:11,color:"var(--text-light)" }}>{p.years}</div>
                    </div>
                    <div style={{ fontSize:14,fontWeight:800,color:"#3B82F6",fontFamily:"'Outfit'" }}>{p.salary}</div>
                  </div>
                ))}
              </div>

              {/* Eligibility */}
              <div style={{ height:1,background:"var(--border)",margin:"24px 0 20px" }} />
              <div style={{ fontSize:11,fontWeight:700,color:"#A78BFA",letterSpacing:1,textTransform:"uppercase",marginBottom:10,display:"flex",alignItems:"center",gap:6 }}>
                <span style={{ width:3,height:14,background:"#A78BFA",borderRadius:2,display:"inline-block" }} />
                📋 Eligibility
              </div>
              <div style={{ fontSize:13,color:"var(--text-body)",lineHeight:1.7,background:"rgba(167,139,250,0.05)",borderRadius:12,padding:"14px",border:"1px solid rgba(167,139,250,0.1)",marginBottom:16 }}>
                {job.eligibility}
              </div>

              {/* Exam Stages */}
              <div style={{ fontSize:11,fontWeight:700,color:"#F472B6",letterSpacing:1,textTransform:"uppercase",marginBottom:10,display:"flex",alignItems:"center",gap:6 }}>
                <span style={{ width:3,height:14,background:"#F472B6",borderRadius:2,display:"inline-block" }} />
                📝 Exam Stages
              </div>
              <div style={{ fontSize:13,color:"var(--text-body)",lineHeight:1.7,background:"rgba(244,114,182,0.05)",borderRadius:12,padding:"14px",border:"1px solid rgba(244,114,182,0.1)" }}>
                {job.exam}
              </div>
            </div>
          )}

          {/* LIFE TAB */}
          {tab==="life" && (
            <div className="anim-fade" style={{ display:"flex",flexDirection:"column",gap:14 }}>

              {/* ── 1. SALARY HERO CARD ── */}
              <div style={{ borderRadius:16,overflow:"hidden",border:"1px solid rgba(59,130,246,0.2)" }}>
                {/* Top band */}
                <div style={{ background:"linear-gradient(135deg,rgba(59,130,246,0.18),rgba(20,184,166,0.12))",padding:"16px 16px 12px" }}>
                  <div style={{ fontSize:10,fontWeight:700,color:"#93C5FD",letterSpacing:1.2,textTransform:"uppercase",marginBottom:10 }}>💰 Salary Snapshot</div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end" }}>
                    <div>
                      <div style={{ fontSize:11,color:"rgba(255,255,255,0.5)",marginBottom:2 }}>Take-home every month</div>
                      <div style={{ fontSize:30,fontWeight:900,color:"#fff",fontFamily:"'Outfit'",lineHeight:1 }}>{job.inHand}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:10,color:"rgba(255,255,255,0.4)" }}>Gross (with DA)</div>
                      <div style={{ fontSize:14,fontWeight:700,color:"rgba(255,255,255,0.75)" }}>{job.salary}</div>
                    </div>
                  </div>
                </div>
                {/* Benefits chips */}
                <div style={{ background:"rgba(59,130,246,0.06)",padding:"12px 16px",borderTop:"1px solid rgba(59,130,246,0.12)" }}>
                  <div style={{ fontSize:10,fontWeight:600,color:"var(--text-faint)",marginBottom:8,letterSpacing:0.5 }}>INCLUDED PERKS</div>
                  <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                    {job.benefits.map((b,i)=>(
                      <span key={i} style={{ background:"rgba(245,158,11,0.1)",color:"#FCD34D",fontSize:10,padding:"4px 9px",borderRadius:7,fontWeight:600,border:"1px solid rgba(245,158,11,0.15)" }}>✓ {b}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 2. LIFE AFTER SELECTION ── */}
              <div style={{ background:"var(--bg-card-2)",borderRadius:16,border:"1px solid rgba(34,197,94,0.15)",overflow:"hidden" }}>
                <div style={{ padding:"12px 16px 0",display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:32,height:32,borderRadius:10,background:"rgba(34,197,94,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>🏠</div>
                  <div style={{ fontSize:12,fontWeight:700,color:"#4ADE80" }}>Life After Selection</div>
                </div>
                {/* Lifestyle as bullet points */}
                <div style={{ padding:"10px 16px 14px" }}>
                  {job.lifestyle.split(". ").filter(s=>s.trim().length>4).map((sentence,i)=>(
                    <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:8 }}>
                      <span style={{ color:"#4ADE80",fontSize:12,flexShrink:0,marginTop:1 }}>→</span>
                      <span style={{ fontSize:12,color:"var(--text-body)",lineHeight:1.55 }}>{sentence.trim().replace(/\.$/,"")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 3. TYPICAL DAY TIMELINE ── */}
              <div style={{ background:"var(--bg-card-2)",borderRadius:16,border:"1px solid rgba(167,139,250,0.15)",overflow:"hidden" }}>
                <div style={{ padding:"12px 16px 0",display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:32,height:32,borderRadius:10,background:"rgba(167,139,250,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>🌅</div>
                  <div style={{ fontSize:12,fontWeight:700,color:"#C4B5FD" }}>A Typical Day</div>
                </div>
                <div style={{ padding:"12px 16px 14px",position:"relative",paddingLeft:44 }}>
                  {/* Vertical line */}
                  <div style={{ position:"absolute",left:28,top:12,bottom:14,width:1.5,background:"linear-gradient(to bottom,rgba(167,139,250,0.5),rgba(167,139,250,0.05))",borderRadius:2 }} />
                  {job.dayInLife.split("\n").filter(Boolean).map((line,i,arr)=>{
                    const dashIdx = line.indexOf(" — ");
                    const time = dashIdx>-1 ? line.slice(0,dashIdx) : line;
                    const desc = dashIdx>-1 ? line.slice(dashIdx+3) : "";
                    const isLast = i===arr.length-1;
                    return (
                      <div key={i} style={{ position:"relative",marginBottom:isLast?0:12 }}>
                        {/* Dot */}
                        <div style={{ position:"absolute",left:-20,top:4,width:9,height:9,borderRadius:"50%",background:isLast?"#A78BFA":"var(--bg-card-2)",border:"2px solid #A78BFA",boxShadow:isLast?"0 0 8px rgba(167,139,250,0.5)":"none" }} />
                        <div style={{ fontSize:11,fontWeight:700,color:"#C4B5FD",marginBottom:1 }}>{time}</div>
                        {desc && <div style={{ fontSize:12,color:"var(--text-body)",lineHeight:1.45 }}>{desc}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── 4. WHY PEOPLE CHOOSE THIS ── */}
              <div style={{ background:"var(--bg-card-2)",borderRadius:16,border:"1px solid rgba(20,184,166,0.15)",overflow:"hidden" }}>
                <div style={{ padding:"12px 16px 0",display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:32,height:32,borderRadius:10,background:"rgba(20,184,166,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>💡</div>
                  <div style={{ fontSize:12,fontWeight:700,color:"#2DD4BF" }}>Why People Choose This</div>
                </div>
                <div style={{ padding:"10px 16px 14px" }}>
                  {job.whyChoose.split(". ").filter(s=>s.trim().length>4).map((sentence,i)=>(
                    <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:8 }}>
                      <span style={{ color:"#2DD4BF",fontSize:14,flexShrink:0,lineHeight:1.3 }}>★</span>
                      <span style={{ fontSize:12,color:"var(--text-body)",lineHeight:1.55 }}>{sentence.trim().replace(/\.$/,"")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 5. REALITY CHECK ── */}
              <div style={{ background:"var(--bg-card-2)",borderRadius:16,border:"1px solid rgba(251,146,60,0.2)",overflow:"hidden" }}>
                <div style={{ padding:"12px 16px 0",display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:32,height:32,borderRadius:10,background:"rgba(251,146,60,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>⚡</div>
                  <div>
                    <div style={{ fontSize:12,fontWeight:700,color:"#FB923C" }}>Reality Check</div>
                    <div style={{ fontSize:10,color:"var(--text-faint)" }}>Be prepared for these</div>
                  </div>
                </div>
                <div style={{ padding:"10px 16px 14px" }}>
                  {job.challenges.split(". ").filter(s=>s.trim().length>4).map((sentence,i)=>(
                    <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:8 }}>
                      <span style={{ color:"#FB923C",fontSize:12,flexShrink:0,marginTop:1 }}>!</span>
                      <span style={{ fontSize:12,color:"var(--text-body)",lineHeight:1.55 }}>{sentence.trim().replace(/\.$/,"")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 6. GROWTH PATH ── */}
              <div style={{ background:"var(--bg-card-2)",borderRadius:16,border:"1px solid rgba(59,130,246,0.15)",overflow:"hidden" }}>
                <div style={{ padding:"12px 16px 10px",display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:32,height:32,borderRadius:10,background:"rgba(59,130,246,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>📈</div>
                  <div>
                    <div style={{ fontSize:12,fontWeight:700,color:"#60A5FA" }}>Growth Path</div>
                    <div style={{ fontSize:10,color:"var(--text-faint)" }}>Your salary over the years</div>
                  </div>
                </div>
                <div style={{ padding:"0 12px 14px",display:"flex",flexDirection:"column",gap:6 }}>
                  {job.promotionPath.map((p,i)=>{
                    const isFirst = i===0;
                    const isLast = i===job.promotionPath.length-1;
                    return (
                      <div key={i} style={{
                        display:"flex",alignItems:"center",justifyContent:"space-between",
                        borderRadius:10,padding:"10px 12px",
                        background: isFirst ? "rgba(59,130,246,0.1)" : isLast ? "rgba(20,184,166,0.08)" : "rgba(255,255,255,0.03)",
                        border: isFirst ? "1px solid rgba(59,130,246,0.25)" : isLast ? "1px solid rgba(20,184,166,0.2)" : "1px solid var(--border)",
                      }}>
                        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                          {/* Step indicator */}
                          <div style={{ width:6,height:6,borderRadius:"50%",background: isFirst?"#3B82F6":isLast?"#14B8A6":"var(--text-faint)",flexShrink:0 }} />
                          <div>
                            <div style={{ fontSize:12,fontWeight:700,color:"var(--text-dark)" }}>{p.title}</div>
                            <div style={{ fontSize:10,color:"var(--text-faint)" }}>{p.years}</div>
                          </div>
                        </div>
                        <div style={{ fontSize:13,fontWeight:800,color:isFirst?"#60A5FA":isLast?"#2DD4BF":"var(--text-light)",fontFamily:"'Outfit'" }}>{p.salary}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* IMPACT TAB — impact content only */}
          {tab==="impact" && (
            <div className="anim-fade">
              <div style={{
                background:"rgba(59,130,246,0.06)",borderRadius:16,padding:"20px 18px",
                border:"1px solid rgba(59,130,246,0.15)",marginBottom:16,
              }}>
                <div style={{ fontSize:28,marginBottom:10,textAlign:"center" }}>🇮🇳</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"var(--text-dark)",textAlign:"center",marginBottom:10 }}>How You Serve the Nation</h3>
                <p style={{ fontSize:13,color:"var(--text-body)",lineHeight:1.8 }}>{job.impact}</p>
              </div>

              {/* Why people choose this */}
              <div style={{ fontSize:11,fontWeight:700,color:"#22C55E",letterSpacing:1,textTransform:"uppercase",marginBottom:10,display:"flex",alignItems:"center",gap:6 }}>
                <span style={{ width:3,height:14,background:"#22C55E",borderRadius:2,display:"inline-block" }} />
                💡 Why People Choose This
              </div>
              <div style={{ fontSize:13,color:"var(--text-body)",lineHeight:1.8,background:"rgba(34,197,94,0.05)",borderRadius:12,padding:"14px",border:"1px solid rgba(34,197,94,0.1)",marginBottom:8 }}>
                {job.whyChoose}
              </div>
            </div>
          )}

          <Link href="/interview" style={{ textDecoration:"none" }}>
            <div style={{ width:"100%",padding:"14px",marginTop:20,background:"linear-gradient(90deg,#3B82F6,#14B8A6)",borderRadius:12,fontSize:14,fontWeight:700,color:"#fff",textAlign:"center",boxShadow:"0 4px 16px rgba(59,130,246,0.35)" }}>
              🎯 Practice Interview for This Role
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Block({ color,icon,title,text }:{ color:string;icon:string;title:string;text:string }) {
  return (
    <div style={{ borderRadius:12,padding:"14px",marginBottom:12,background:`${color}06`,borderLeft:`3px solid ${color}` }}>
      <div style={{ fontSize:10,fontWeight:700,color,letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>{icon} {title}</div>
      <div style={{ fontSize:12,color:"var(--text-body)",lineHeight:1.7,whiteSpace:"pre-line" }}>{text}</div>
    </div>
  );
}

function JobsInner() {
  const params = useSearchParams();
  const [filter,setFilter] = useState("all");
  const [sel,setSel] = useState<Job|null>(null);
  useEffect(()=>{ const id=params.get("id"); if(id){ const f=JOBS.find(j=>j.id===id); if(f) setSel(f); } },[params]);
  const list = filter==="all"?JOBS:JOBS.filter(j=>j.category===filter);

  return (
    <main style={{ minHeight:"100vh",background:"var(--bg)",paddingBottom:76 }}>
      <header style={{ position:"sticky",top:0,zIndex:40,padding:"12px 16px",background:"rgba(13,17,23,0.97)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
          <Link href="/" style={{ color:"var(--text-light)",fontSize:13,textDecoration:"none" }}>←</Link>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"var(--text-dark)" }}>Explore Careers</h1>
        </div>
        <div className="no-scroll" style={{ display:"flex",gap:5,overflowX:"auto" }}>
          <Pill label={`All (${JOBS.length})`} on={filter==="all"} color="#0C7C59" click={()=>setFilter("all")} />
          {JOB_CATEGORIES.map(c=>{ const n=JOBS.filter(j=>j.category===c.id).length; return n?<Pill key={c.id} label={`${c.icon} ${c.label}`} on={filter===c.id} color={c.color} click={()=>setFilter(c.id)} />:null; })}
        </div>
      </header>
      <div style={{ maxWidth:560,margin:"0 auto",padding:"14px 16px" }}>
        <p style={{ fontSize:12,color:"var(--text-light)",marginBottom:14 }}>Tap any career to see the complete roadmap, lifestyle, and how you serve the nation.</p>
        {list.map(job=>(
          <div key={job.id} onClick={()=>setSel(job)} style={{ background:"var(--bg-card)",borderRadius:14,padding:"16px",border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)",cursor:"pointer",marginBottom:10,transition:"box-shadow 0.2s" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",gap:5,marginBottom:4 }}>
                  {job.isNew && <span style={{ background:"#0C7C59",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:8 }}>NEW</span>}
                  {job.isHot && <span style={{ background:"#dc2626",color:"#fff",fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:8 }}>🔥 TRENDING</span>}
                </div>
                <div style={{ fontSize:15,fontWeight:700,color:"var(--text-dark)",lineHeight:1.3 }}>{job.title}</div>
                <div style={{ fontSize:11,color:"var(--text-light)",marginTop:2 }}>{job.org}</div>
              </div>
              <div style={{ textAlign:"right",flexShrink:0,marginLeft:12 }}>
                <div style={{ fontSize:18,fontWeight:800,color:"var(--accent)",fontFamily:"'Outfit'" }}>{job.vacancies.toLocaleString()}</div>
                <div style={{ fontSize:9,color:"var(--text-light)",textTransform:"uppercase" }}>posts</div>
              </div>
            </div>
            <div style={{ display:"flex",gap:12,marginTop:8 }}>
              <span style={{ fontSize:11,color:"var(--text-body)" }}>💰 {job.inHand}/mo</span>
              <span style={{ fontSize:11,color:"var(--text-body)" }}>📅 {job.lastDate}</span>
            </div>
            <div style={{ fontSize:11,color:"var(--accent)",marginTop:8,fontWeight:600 }}>Roadmap · Lifestyle · Impact →</div>
          </div>
        ))}
      </div>
      {sel && <JobSheet job={sel} onClose={()=>setSel(null)} />}
      <BottomNav />
    </main>
  );
}

function Pill({ label,on,color,click }:{ label:string;on:boolean;color:string;click:()=>void }) {
  return <button onClick={click} style={{ padding:"5px 13px",borderRadius:14,fontSize:11,fontWeight:600,border:"none",cursor:"pointer",flexShrink:0,whiteSpace:"nowrap",background:on?color:"rgba(255,255,255,0.06)",color:on?"#fff":"var(--text-light)",transition:"all 0.2s" }}>{label}</button>;
}

export default function JobsPage() { return <Suspense><JobsInner /></Suspense>; }
