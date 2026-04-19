'use client';

interface ShareButtonProps {
  title: string;
  slug: string;
}

export default function ShareButton({ title, slug }: ShareButtonProps) {
  const handleShare = () => {
    const text = `Just read: "${title}" on @NaukriYatra. Amazing insights into government job careers! Check it out → prepkar.vercel.app/life/${slug}`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <button
      onClick={handleShare}
      style={{
        background: '#2563EB',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: 8,
        border: 'none',
        fontSize: 14,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      Share This Story
    </button>
  );
}
