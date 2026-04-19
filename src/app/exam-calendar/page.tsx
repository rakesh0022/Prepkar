'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import examCalendarData from '@/data/exam-calendar.json';

export default function ExamCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});

  // Calculate countdown timers
  useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date();
      const newTimeLeft: Record<string, string> = {};

      examCalendarData.forEach(exam => {
        const examDate = new Date(exam.examDate);
        const diff = examDate.getTime() - now.getTime();

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          newTimeLeft[exam.id] = `${days}d ${hours}h`;
        } else {
          newTimeLeft[exam.id] = 'Expired';
        }
      });

      setTimeLeft(newTimeLeft);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, []);

  const categories = Array.from(new Set(examCalendarData.map(e => e.category)));
  const categoryColors: Record<string, string> = {
    'SSC': '#22c55e',
    'Banking': '#3b82f6',
    'UPSC': '#ef4444',
    'Railway': '#f97316',
    'Defence': '#a855f7',
    'Insurance': '#06b6d4',
    'Education': '#6366f1',
  };

  const filteredExams = activeFilter 
    ? examCalendarData.filter(e => e.category === activeFilter)
    : examCalendarData;

  const examsInMonth = filteredExams.filter(e => {
    const examDate = new Date(e.examDate);
    return examDate.getMonth() === currentMonth.getMonth() && 
           examDate.getFullYear() === currentMonth.getFullYear();
  });

  // Get exams for a specific date
  const getExamsForDate = (dateStr: string) => {
    return filteredExams.filter(e => e.examDate === dateStr || e.examDate.startsWith(dateStr));
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];
  
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 76 }}>
      <div className="desktop-only" style={{ height: 56 }} />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)', color: 'white', padding: '32px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>📅 Exam Calendar 2026</h1>
        <p style={{ fontSize: '14px', opacity: 0.9 }}>View important exam dates, deadlines, and set reminders</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '24px 16px' }}>
        
        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '24px', paddingBottom: '8px' }}>
          <button
            onClick={() => setActiveFilter(null)}
            style={{
              padding: '8px 14px',
              borderRadius: '20px',
              border: activeFilter === null ? '2px solid #3b82f6' : '1px solid var(--border)',
              background: activeFilter === null ? '#eff6ff' : 'white',
              color: activeFilter === null ? '#3b82f6' : '#6b7280',
              fontWeight: activeFilter === null ? '600' : '500',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            All Exams
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '8px 14px',
                borderRadius: '20px',
                border: activeFilter === cat ? `2px solid ${categoryColors[cat]}` : '1px solid var(--border)',
                background: activeFilter === cat ? `${categoryColors[cat]}11` : 'white',
                color: activeFilter === cat ? categoryColors[cat] : '#6b7280',
                fontWeight: activeFilter === cat ? '600' : '500',
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Calendar */}
          <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px' }}>
            {/* Month Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <button
                onClick={prevMonth}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
              >
                ←
              </button>
              <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={nextMonth}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
              >
                →
              </button>
            </div>

            {/* Day Names */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', color: '#6b7280', fontSize: '12px', padding: '8px' }}>
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
              {days.map((day, idx) => {
                if (!day) return <div key={`empty-${idx}`} />;
                
                const dateStr = formatDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
                const examsOnDate = getExamsForDate(dateStr);
                const isToday = dateStr === formatDate(new Date());
                const isSelected = selectedDate === dateStr;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    style={{
                      position: 'relative',
                      padding: '8px',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #3b82f6' : '1px solid var(--border)',
                      background: isSelected ? '#eff6ff' : isToday ? '#f0fdf4' : 'white',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: isToday ? 'bold' : '500',
                      color: '#111827',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div>{day}</div>
                    {examsOnDate.length > 0 && (
                      <div style={{ display: 'flex', gap: '2px', marginTop: '2px', justifyContent: 'center' }}>
                        {examsOnDate.slice(0, 3).map(exam => (
                          <div
                            key={exam.id}
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: categoryColors[exam.category],
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#6b7280', marginBottom: '8px' }}>Categories:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {Object.entries(categoryColors).map(([cat, color]) => (
                  <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exam Details */}
          <div>
            {selectedDate ? (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', color: '#111827' }}>
                  Exams on {new Date(selectedDate + 'T00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </h3>
                
                {getExamsForDate(selectedDate).length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {getExamsForDate(selectedDate).map(exam => (
                      <div key={exam.id} style={{ borderLeft: `4px solid ${categoryColors[exam.category]}`, padding: '12px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                          {exam.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.5' }}>
                          <div>📝 {exam.description}</div>
                          <div style={{ marginTop: '4px' }}>
                            <span style={{ display: 'inline-block', backgroundColor: `${categoryColors[exam.category]}11`, color: categoryColors[exam.category], padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                              {exam.stage}
                            </span>
                          </div>
                          {exam.registrationEnd && (
                            <div style={{ marginTop: '4px' }}>
                              📅 Registration: {new Date(exam.registrationStart).toLocaleDateString()} - {new Date(exam.registrationEnd).toLocaleDateString()}
                            </div>
                          )}
                          {timeLeft[exam.id] && timeLeft[exam.id] !== 'Expired' && (
                            <div style={{ marginTop: '4px', fontWeight: 'bold', color: '#dc2626' }}>
                              ⏱️ {timeLeft[exam.id]}
                            </div>
                          )}
                        </div>
                        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
                          <a 
                            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(exam.name)}&dates=${exam.examDate.replace(/-/g, '')}/${exam.examDate.replace(/-/g, '')}&details=${encodeURIComponent(exam.description)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '12px',
                              padding: '6px 10px',
                              background: '#3b82f6',
                              color: 'white',
                              borderRadius: '4px',
                              textDecoration: 'none',
                              fontWeight: '600',
                            }}
                          >
                            🔔 Add to Calendar
                          </a>
                          <a
                            href={exam.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '12px',
                              padding: '6px 10px',
                              background: '#f3f4f6',
                              color: '#111827',
                              borderRadius: '4px',
                              textDecoration: 'none',
                              fontWeight: '600',
                            }}
                          >
                            📖 Official Link
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>
                    No exams scheduled for this date
                  </div>
                )}
              </div>
            ) : (
              <div style={{ backgroundColor: '#f0f9ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0369a1', marginBottom: '8px' }}>
                  📌 Select a Date
                </div>
                <div style={{ fontSize: '13px', color: '#0c4a6e' }}>
                  Click on any date in the calendar to view exam details and set reminders
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#111827' }}>⏰ Upcoming Exams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            {filteredExams
              .filter(e => new Date(e.examDate) > new Date())
              .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
              .slice(0, 8)
              .map(exam => (
                <div
                  key={exam.id}
                  style={{
                    backgroundColor: '#f9fafb',
                    borderLeft: `4px solid ${categoryColors[exam.category]}`,
                    padding: '12px',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                    {exam.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
                    📅 {new Date(exam.examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  {timeLeft[exam.id] && (
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: timeLeft[exam.id] === 'Expired' ? '#9ca3af' : '#dc2626',
                    }}>
                      {timeLeft[exam.id]}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
