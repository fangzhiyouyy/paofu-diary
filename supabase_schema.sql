-- 泡芙日记 · Supabase 数据库建表 SQL
-- 在 Supabase 项目 → SQL Editor 中执行以下语句

-- 1. 日记录表
CREATE TABLE IF NOT EXISTS daily_records (
  date DATE PRIMARY KEY,
  cycle_phase TEXT,
  day_of_cycle INTEGER,
  morning_dimensions JSONB,
  current_dimensions JSONB,
  panda_mood TEXT,
  panda_quote TEXT,
  outfit_color TEXT,
  outfit_name TEXT,
  menstruation_log JSONB
);

-- 2. 行为日志表
CREATE TABLE IF NOT EXISTS behaviors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  type TEXT NOT NULL,
  subtype TEXT,
  time TEXT,
  detail JSONB,
  effects JSONB,
  note TEXT
);

CREATE INDEX IF NOT EXISTS idx_behaviors_date ON behaviors(date);

-- 3. 周期配置表
CREATE TABLE IF NOT EXISTS cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  phases JSONB,
  history_avg_cycle_length INTEGER DEFAULT 28,
  history_avg_period_duration INTEGER DEFAULT 5
);

-- 4. 开启 RLS（个人使用，允许 anon 读写）
ALTER TABLE daily_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE behaviors ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;

-- 允许所有操作（无需认证——个人 App）
CREATE POLICY "Allow all" ON daily_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON behaviors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON cycles FOR ALL USING (true) WITH CHECK (true);
