-- ═══════════════════════════════════════════════════════════════════════════════
-- NaukriYatra — Supabase Database Schema v2
-- Run this in Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════════════════

-- Practice sessions table
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

ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own sessions') THEN
    CREATE POLICY "Users can view own sessions" ON practice_sessions FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own sessions') THEN
    CREATE POLICY "Users can insert own sessions" ON practice_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  razorpay_payment_id TEXT,
  razorpay_order_id TEXT,
  amount INTEGER DEFAULT 0,
  currency TEXT DEFAULT 'INR',
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  free_tests_used INTEGER DEFAULT 0,
  free_tests_reset_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own subscription') THEN
    CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert own subscription') THEN
    CREATE POLICY "Users can insert own subscription" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own subscription') THEN
    CREATE POLICY "Users can update own subscription" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_created_at ON practice_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);

-- Waitlist / Exam Reminders table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'mentorship',
  exam_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(email, type)
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Anyone can insert into waitlist (no auth required)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can join waitlist') THEN
    CREATE POLICY "Anyone can join waitlist" ON waitlist FOR INSERT WITH CHECK (true);
  END IF;
END $$;
