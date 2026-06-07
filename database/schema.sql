CREATE TABLE contracts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  client TEXT,
  contractor TEXT,
  nec_option TEXT,
  starting_date TIMESTAMPTZ,
  completion_date TIMESTAMPTZ,
  reporting_period TEXT,
  contract_manager TEXT,
  planner TEXT,
  commercial_lead TEXT,
  project_manager TEXT,
  disciplines TEXT,
  areas TEXT,
  ai_tone TEXT,
  report_branding TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE programme_uploads (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  source_type TEXT NOT NULL,
  upload_type TEXT NOT NULL CHECK (upload_type IN ('CURRENT', 'PREVIOUS', 'BASELINE')),
  data_date TIMESTAMPTZ,
  planned_completion TIMESTAMPTZ,
  source_uri TEXT,
  uploaded_by TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE contract_users (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT,
  discipline TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE contract_resources (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT,
  discipline TEXT,
  daily_capacity NUMERIC,
  availability TEXT NOT NULL DEFAULT 'Available',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE activities (
  id TEXT PRIMARY KEY,
  upload_id TEXT NOT NULL REFERENCES programme_uploads(id) ON DELETE CASCADE,
  activity_code TEXT NOT NULL,
  name TEXT NOT NULL,
  wbs_code TEXT,
  area TEXT,
  discipline TEXT,
  owner_name TEXT,
  start_date TIMESTAMPTZ,
  finish_date TIMESTAMPTZ,
  actual_start TIMESTAMPTZ,
  actual_finish TIMESTAMPTZ,
  percent_complete NUMERIC,
  duration_days NUMERIC,
  total_float_days NUMERIC,
  is_critical BOOLEAN NOT NULL DEFAULT false,
  is_milestone BOOLEAN NOT NULL DEFAULT false,
  raw_json JSONB
);

CREATE INDEX activities_upload_code_idx ON activities(upload_id, activity_code);

CREATE TABLE relationships (
  id TEXT PRIMARY KEY,
  upload_id TEXT NOT NULL REFERENCES programme_uploads(id) ON DELETE CASCADE,
  predecessor_id TEXT NOT NULL,
  successor_id TEXT NOT NULL,
  relation_type TEXT NOT NULL,
  lag_days NUMERIC
);

CREATE TABLE wbs_codes (
  id TEXT PRIMARY KEY,
  upload_id TEXT NOT NULL REFERENCES programme_uploads(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT,
  parent_code TEXT
);

CREATE TABLE key_dates (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  baseline_date TIMESTAMPTZ,
  current_date TIMESTAMPTZ,
  status TEXT
);

CREATE TABLE planning_assignments (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  activity_code TEXT NOT NULL,
  owner_name TEXT,
  planned_date TIMESTAMPTZ,
  planned_days NUMERIC,
  status TEXT NOT NULL DEFAULT 'planned',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE lookahead_activities (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  activity_code TEXT NOT NULL,
  title TEXT NOT NULL,
  owner_name TEXT,
  area TEXT,
  start_label TEXT,
  finish_label TEXT,
  status TEXT NOT NULL DEFAULT 'Planned',
  source TEXT NOT NULL DEFAULT 'Added',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE constraints (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  activity_code TEXT,
  title TEXT NOT NULL,
  type TEXT,
  owner_name TEXT,
  due_label TEXT,
  status TEXT NOT NULL DEFAULT 'Open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE daily_actions (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  owner_name TEXT,
  due_label TEXT,
  status TEXT NOT NULL DEFAULT 'Open',
  activity_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE commitments (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  owner_name TEXT,
  due_label TEXT,
  status TEXT NOT NULL DEFAULT 'Promised',
  activity_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE handoffs (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  from_owner TEXT,
  to_owner TEXT,
  due_label TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  activity_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_events (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  detail TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE activity_updates (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  activity_code TEXT NOT NULL,
  status_flag TEXT,
  percent_complete NUMERIC,
  note TEXT,
  forecast_finish TIMESTAMPTZ,
  recorded_by TEXT,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE blockers (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  activity_code TEXT NOT NULL,
  reason TEXT NOT NULL,
  action TEXT,
  owner_name TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  closed_at TIMESTAMPTZ
);

CREATE TABLE commercial_control_records (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL,
  reference TEXT NOT NULL,
  title TEXT NOT NULL,
  owner_name TEXT,
  status TEXT NOT NULL DEFAULT 'Draft',
  due_label TEXT,
  activity_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE compensation_events (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  reference TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  time_impact_days NUMERIC,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE early_warnings (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  reference TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reports (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL,
  title TEXT NOT NULL,
  source_uri TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE ai_outputs (
  id TEXT PRIMARY KEY,
  contract_id TEXT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  prompt_hash TEXT,
  output_text TEXT NOT NULL,
  created_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
