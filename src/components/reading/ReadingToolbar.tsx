"use client";

interface Props {
  textSize: 14 | 16 | 18;
  increase: () => void;
  decrease: () => void;
}

export default function ReadingToolbar({ textSize, increase, decrease }: Props) {
  const btnBase: React.CSSProperties = {
    width: 36, height: 36, borderRadius: "50%",
    background: "var(--bg-card)", border: "1px solid var(--border)",
    cursor: "pointer", color: "var(--text-body)",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "var(--shadow-sm)", fontWeight: 700,
  };

  return (
    <div
      style={{
        position: "fixed", bottom: 148, right: 16, zIndex: 50,
        display: "flex", flexDirection: "column", gap: 6, alignItems: "center",
      }}
    >
      <button
        onClick={increase}
        disabled={textSize >= 18}
        aria-label="Increase text size"
        style={{ ...btnBase, fontSize: 14, opacity: textSize >= 18 ? 0.35 : 1 }}
      >
        A+
      </button>
      <button
        onClick={decrease}
        disabled={textSize <= 14}
        aria-label="Decrease text size"
        style={{ ...btnBase, fontSize: 11, opacity: textSize <= 14 ? 0.35 : 1 }}
      >
        A−
      </button>
    </div>
  );
}
