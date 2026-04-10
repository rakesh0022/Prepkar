"use client";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { STORIES } from "@/components/data";

export default function StoriesPage() {
  return (
    <main style={{ minHeight:"100vh",background:"var(--bg)",paddingBottom:76 }}>
      <header style={{ position:"sticky",top:0,zIndex:40,padding:"14px 16px",background:"rgba(250,251,253,0.95)",backdropFilter:"blur(16px)",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8 }}>
        <Link href="/" style={{ color:"var(--text-light)",fontSize:13,textDecoration:"none" }}>←</Link>
        <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"var(--text-dark)" }}>Success Stories</h1>
      </header>
      <div style={{ maxWidth:560,margin:"0 auto",padding:"20px 16px" }}>
        <p style={{ fontSize:13,color:"var(--text-body)",marginBottom:20,lineHeight:1.6 }}>Real people. Real struggles. Real selection. If they could do it — so can you.</p>
        {STORIES.map((s,i)=>(
          <div key={i} className="anim-up" style={{ background:"var(--bg-card)",borderRadius:16,padding:"20px 18px",border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)",marginBottom:12,animationDelay:`${i*0.06}s` }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
              <div style={{ width:48,height:48,borderRadius:14,fontSize:26,display:"flex",alignItems:"center",justifyContent:"center",background:`${s.color}10` }}>{s.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14,fontWeight:700,color:"var(--text-dark)" }}>{s.name}</div>
                <div style={{ fontSize:11,fontWeight:700,color:s.color }}>{s.achievement}</div>
                <div style={{ fontSize:11,color:"var(--text-light)" }}>Now: {s.now}</div>
              </div>
              <span style={{ fontSize:10,fontWeight:700,color:s.color,background:`${s.color}10`,padding:"3px 8px",borderRadius:6 }}>{s.tag}</span>
            </div>
            <blockquote style={{ fontSize:13,color:"var(--text-body)",fontStyle:"italic",lineHeight:1.7,borderLeft:`3px solid ${s.color}`,paddingLeft:14,margin:0 }}>&ldquo;{s.quote}&rdquo;</blockquote>
          </div>
        ))}
      </div>
      <BottomNav />
    </main>
  );
}
