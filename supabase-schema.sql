-- ═══════════════════════════════════════════════════════════════════════════════
-- NaukriYatra — Supabase Database Schema
-- Run this in your Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════════════════

-- Practice sessions table — stores every completed practice session
CREATE TABLE IF NOT EXISTS practice_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  exam_name TEXT NOT NULL,
  stage_name TEXT NOT NULL,
  score_overall INTEGER DEFAULT 0,
  score_data JSONB DEFAULT '{}',
  question_count INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own sessions
CREATE POLICY "Users can view own sessions"
  ON practice_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own sessions
CREATE POLICY "Users can insert own sessions"
  ON practice_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id
  ON practice_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_practice_sessions_created_at
  ON practice_sessions(created_at DESC);
