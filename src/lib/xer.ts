export type XerPlanningActivity = {
  id: string;
  title: string;
  owner: string;
  area: string;
  start: string;
  finish: string;
  status: string;
  source: "Programme";
  startDate?: string;
  finishDate?: string;
  durationDays?: number;
  percentComplete?: number;
  totalFloatDays?: number;
};

type XerTable = {
  fields: string[];
  rows: Record<string, string>[];
};

const statusMap: Record<string, string> = {
  TK_NotStart: "Planned",
  TK_Active: "In progress",
  TK_Complete: "Complete"
};

export function parseXer(text: string) {
  const tables = new Map<string, XerTable>();
  let activeTable = "";
  let activeFields: string[] = [];

  text.split(/\r?\n/).forEach((line) => {
    if (!line) return;
    const parts = line.split("\t");
    const tag = parts[0];

    if (tag === "%T") {
      activeTable = parts[1] || "";
      activeFields = [];
      if (activeTable && !tables.has(activeTable)) {
        tables.set(activeTable, { fields: [], rows: [] });
      }
      return;
    }

    if (tag === "%F" && activeTable) {
      activeFields = parts.slice(1);
      const table = tables.get(activeTable);
      if (table) table.fields = activeFields;
      return;
    }

    if (tag === "%R" && activeTable) {
      const table = tables.get(activeTable);
      if (!table) return;
      const row: Record<string, string> = {};
      activeFields.forEach((field, index) => {
        row[field] = parts[index + 1] || "";
      });
      table.rows.push(row);
    }
  });

  return tables;
}

export function parseXerToPlanningActivities(text: string): XerPlanningActivity[] {
  const tables = parseXer(text);
  const tasks = tables.get("TASK")?.rows || [];
  const wbsRows = tables.get("PROJWBS")?.rows || [];
  const wbsById = new Map(wbsRows.map((row) => [row.wbs_id, row.wbs_name || row.wbs_short_name || row.wbs_id]));

  return tasks
    .filter((row) => row.task_code || row.task_name)
    .map((row) => {
      const startDate = normaliseXerDate(row.target_start_date || row.early_start_date || row.act_start_date || row.restart_date);
      const finishDate = normaliseXerDate(row.target_end_date || row.early_end_date || row.act_end_date || row.reend_date);
      const durationDays = hoursToDays(row.target_drtn_hr_cnt || row.remain_drtn_hr_cnt || row.orig_drtn_hr_cnt);
      const totalFloatDays = hoursToDays(row.total_float_hr_cnt);
      const percentComplete = toNumber(row.phys_complete_pct || row.complete_pct);
      const status = statusMap[row.status_code] || deriveStatus(row.status_code, percentComplete, totalFloatDays);
      const area = wbsById.get(row.wbs_id) || row.wbs_id || "Unmapped";

      return {
        id: row.task_code || row.task_id,
        title: row.task_name || row.task_code || row.task_id,
        owner: "Unassigned",
        area,
        start: formatDateLabel(startDate) || "To plan",
        finish: formatDateLabel(finishDate) || "To plan",
        status,
        source: "Programme",
        startDate,
        finishDate,
        durationDays,
        percentComplete,
        totalFloatDays
      };
    });
}

function normaliseXerDate(value: string) {
  if (!value) return "";
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return "";
  return `${match[1]}-${match[2]}-${match[3]}`;
}

function hoursToDays(value: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  return Math.max(1, Math.round(parsed / 8));
}

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function deriveStatus(statusCode: string, percentComplete?: number, totalFloatDays?: number) {
  if (percentComplete != null && percentComplete >= 100) return "Complete";
  if (statusCode && /active/i.test(statusCode)) return "In progress";
  if (totalFloatDays != null && totalFloatDays <= 0) return "Critical";
  return "Planned";
}

function formatDateLabel(isoDate: string) {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
}
