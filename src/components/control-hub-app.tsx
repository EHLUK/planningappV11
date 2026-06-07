"use client";

import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { parseXerToPlanningActivities } from "@/lib/xer";

type ProgrammeSourceKey = "current" | "previous" | "baseline";

type ProgrammeSource = {
  fileName: string;
  loadedAt: string;
};

type ContractRecord = {
  id: string;
  name: string;
  code: string;
  client: string;
  contractor: string;
  necOption: string;
  startingDate: string;
  completionDate: string;
  reportingPeriod: string;
  status: string;
  contractManager: string;
  planner: string;
  commercialLead: string;
  projectManager: string;
  disciplines: string;
  areas: string;
  aiTone: string;
  reportBranding: string;
  sources: Record<ProgrammeSourceKey, ProgrammeSource | null>;
};

type SectionKey = "overview" | "setup" | "programme" | "planning" | "mywork" | "resources" | "delivery" | "commercial" | "reports" | "admin";
type PlanViewKey = "board" | "gantt" | "areas" | "list";

type PlanningActivity = {
  id: string;
  title: string;
  owner: string;
  area: string;
  start: string;
  finish: string;
  status: string;
  source: "Programme" | "Added";
  startDate?: string;
  finishDate?: string;
  durationDays?: number;
  percentComplete?: number;
  totalFloatDays?: number;
  baselineFinishDate?: string;
  actualFinishDate?: string;
};

type ResourcePerson = {
  id: string;
  name: string;
  role: string;
  discipline: string;
  dailyCapacity: string;
  availability: string;
};

type ConstraintItem = {
  id: string;
  activityId: string;
  title: string;
  type: string;
  owner: string;
  due: string;
  status: string;
};

type DailyAction = {
  id: string;
  title: string;
  owner: string;
  due: string;
  status: string;
  linkedActivity: string;
};

type CommitmentItem = {
  id: string;
  title: string;
  owner: string;
  due: string;
  status: string;
  linkedActivity: string;
};

type HandoffItem = {
  id: string;
  title: string;
  fromOwner: string;
  toOwner: string;
  due: string;
  status: string;
  linkedActivity: string;
};

type CommercialRecord = {
  id: string;
  type: "EWN" | "CE" | "PMI" | "Clause 32";
  reference: string;
  title: string;
  owner: string;
  status: string;
  due: string;
  linkedActivity: string;
};

type AuditEvent = {
  id: string;
  when: string;
  action: string;
  detail: string;
};

type NewActivityDraft = {
  title: string;
  owner: string;
  area: string;
  start: string;
  finish: string;
  status: string;
};

type PlanningFilters = {
  search: string;
  owner: string;
  status: string;
  area: string;
};

type BulkPlanningDraft = {
  owner: string;
  status: string;
  startDate: string;
};

const storageKey = "contract-control-hub-contracts-v1";
const planningStorageKey = "contract-control-hub-planning-v1";
const peopleStorageKey = "contract-control-hub-people-v1";
const constraintsStorageKey = "contract-control-hub-constraints-v1";
const actionsStorageKey = "contract-control-hub-actions-v1";
const commitmentsStorageKey = "contract-control-hub-commitments-v1";
const handoffsStorageKey = "contract-control-hub-handoffs-v1";
const commercialStorageKey = "contract-control-hub-commercial-v1";
const auditStorageKey = "contract-control-hub-audit-v1";

const emptySources: Record<ProgrammeSourceKey, ProgrammeSource | null> = {
  current: null,
  previous: null,
  baseline: null
};

const defaultContracts: ContractRecord[] = [
  {
    id: "contract-demo-001",
    name: "Example Infrastructure Contract",
    code: "CONTRACT-001",
    client: "Client organisation",
    contractor: "Exentec Hargreaves Ltd",
    necOption: "NEC ECC Option C",
    startingDate: "",
    completionDate: "17 May 2030",
    reportingPeriod: "Weekly",
    status: "Setup draft",
    contractManager: "To confirm",
    planner: "To confirm",
    commercialLead: "To confirm",
    projectManager: "To confirm",
    disciplines: "Design, Procurement, Manufacture, Site, Handover",
    areas: "HVAC, EC&I, Mechanical, Qualification, PDMS, DPRN, Site Work",
    aiTone: "Formal NEC programme narrative, British English, factual and transparent",
    reportBranding: "Exentec Hargreaves standard",
    sources: emptySources
  }
];

const sourceMeta: Array<{ key: ProgrammeSourceKey; title: string; type: string; detail: string }> = [
  {
    key: "current",
    title: "Current Programme",
    type: "CURRENT",
    detail: "Live programme submission used for planning, health checks, and reporting."
  },
  {
    key: "previous",
    title: "Previous Submission",
    type: "PREVIOUS",
    detail: "Last submission or accepted programme used for movement analysis."
  },
  {
    key: "baseline",
    title: "Baseline Programme",
    type: "BASELINE",
    detail: "Contractual baseline used for key date and completion comparison."
  }
];

const setupSteps = ["Identity", "NEC", "Dates", "Team", "Mappings", "AI & Reports"];

const reportTypes = [
  "Planning Workspace Report",
  "Schedule Integrity Report",
  "Clause 32 Narrative",
  "Baseline Comparison",
  "Weekly Look-Ahead",
  "Blocker and Ownership Pack"
];

const planViews: Array<{ key: PlanViewKey; label: string }> = [
  { key: "board", label: "Board" },
  { key: "gantt", label: "Gantt" },
  { key: "areas", label: "Areas" },
  { key: "list", label: "List" }
];

const defaultLookaheadActivities: PlanningActivity[] = [
  { id: "A121640", title: "GGR Extract System P and ID", owner: "Design", area: "HVAC", start: "23 Mar", finish: "23 Mar", status: "Critical", source: "Programme", startDate: "2026-03-23", finishDate: "2026-03-23", durationDays: 1 },
  { id: "A100560", title: "DX P and ID Review", owner: "Unassigned", area: "DX Site", start: "24 Mar", finish: "25 Mar", status: "Critical", source: "Programme", startDate: "2026-03-24", finishDate: "2026-03-25", durationDays: 2 },
  { id: "A109410", title: "Roof Clash Tracker Response", owner: "EC&I", area: "Design", start: "26 Mar", finish: "26 Mar", status: "At risk", source: "Programme", startDate: "2026-03-26", finishDate: "2026-03-26", durationDays: 1 },
  { id: "A96290", title: "P and ID Design Issue", owner: "Procurement", area: "Procurement", start: "27 Mar", finish: "27 Mar", status: "Blocked", source: "Programme", startDate: "2026-03-27", finishDate: "2026-03-27", durationDays: 1 }
];

const defaultPeople: ResourcePerson[] = [
  { id: "person-design-lead", name: "Design Lead", role: "Owner", discipline: "Design", dailyCapacity: "1", availability: "Available" },
  { id: "person-procurement-lead", name: "Procurement Lead", role: "Owner", discipline: "Procurement", dailyCapacity: "1", availability: "Available" },
  { id: "person-site-lead", name: "Site Lead", role: "Owner", discipline: "Site", dailyCapacity: "1", availability: "Available" }
];

const defaultConstraints: ConstraintItem[] = [
  { id: "constraint-design-release", activityId: "A109410", title: "Design response required before issue", type: "Design", owner: "Design Lead", due: "24 Mar", status: "Open" },
  { id: "constraint-procurement-hold", activityId: "A96290", title: "Procurement hold pending final information", type: "Procurement", owner: "Procurement Lead", due: "25 Mar", status: "Open" }
];

const defaultActions: DailyAction[] = [
  { id: "action-owner-assignment", title: "Confirm owner for unassigned DX review", owner: "Design Lead", due: "Today", status: "Open", linkedActivity: "A100560" },
  { id: "action-access-check", title: "Confirm access readiness for site handoff", owner: "Site Lead", due: "Tomorrow", status: "Open", linkedActivity: "A96290" }
];

const defaultCommitments: CommitmentItem[] = [
  { id: "commitment-design-issue", title: "Issue design response for clash tracker", owner: "Design Lead", due: "Today", status: "Promised", linkedActivity: "A109410" },
  { id: "commitment-procurement-clearance", title: "Clear procurement hold point", owner: "Procurement Lead", due: "Tomorrow", status: "Promised", linkedActivity: "A96290" }
];

const defaultHandoffs: HandoffItem[] = [
  { id: "handoff-design-procurement", title: "Design information handoff to procurement", fromOwner: "Design Lead", toOwner: "Procurement Lead", due: "24 Mar", status: "Pending", linkedActivity: "A96290" }
];

const defaultCommercialRecords: CommercialRecord[] = [
  { id: "commercial-ewn-001", type: "EWN", reference: "EWN-001", title: "Design information risk to procurement release", owner: "Commercial Lead", status: "Draft", due: "Today", linkedActivity: "A96290" }
];

const navItems: Array<{ key: SectionKey; label: string }> = [
  { key: "overview", label: "Command Overview" },
  { key: "setup", label: "Contract Setup" },
  { key: "programme", label: "Programme" },
  { key: "planning", label: "Planning Workspace" },
  { key: "mywork", label: "My Work" },
  { key: "resources", label: "People & Resources" },
  { key: "delivery", label: "Delivery Control" },
  { key: "commercial", label: "Commercial and NEC" },
  { key: "reports", label: "Reports" },
  { key: "admin", label: "Admin" }
];

function makeBlankContract(): ContractRecord {
  return {
    id: `contract-${Date.now()}`,
    name: "New Contract",
    code: "",
    client: "",
    contractor: "Exentec Hargreaves Ltd",
    necOption: "NEC ECC Option C",
    startingDate: "",
    completionDate: "",
    reportingPeriod: "Weekly",
    status: "Setup draft",
    contractManager: "",
    planner: "",
    commercialLead: "",
    projectManager: "",
    disciplines: "",
    areas: "",
    aiTone: "Formal NEC programme narrative, British English, factual and transparent",
    reportBranding: "Exentec Hargreaves standard",
    sources: { ...emptySources }
  };
}

function formatNow() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date());
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function addDaysIso(isoDate: string, days: number) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

function formatPlanDate(isoDate: string) {
  if (!isoDate) return "To plan";
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
}

function daysBetween(startIso: string, finishIso: string) {
  const start = new Date(`${startIso}T00:00:00`);
  const finish = new Date(`${finishIso}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(finish.getTime())) return 0;
  return Math.round((finish.getTime() - start.getTime()) / 86400000);
}

function isComplete(value: string) {
  return value.trim().length > 0 && value.trim().toLowerCase() !== "to confirm";
}

export function ControlHubApp() {
  const [contracts, setContracts] = useState<ContractRecord[]>(defaultContracts);
  const [planningByContract, setPlanningByContract] = useState<Record<string, PlanningActivity[]>>({
    "contract-demo-001": defaultLookaheadActivities
  });
  const [peopleByContract, setPeopleByContract] = useState<Record<string, ResourcePerson[]>>({
    "contract-demo-001": defaultPeople
  });
  const [constraintsByContract, setConstraintsByContract] = useState<Record<string, ConstraintItem[]>>({
    "contract-demo-001": defaultConstraints
  });
  const [actionsByContract, setActionsByContract] = useState<Record<string, DailyAction[]>>({
    "contract-demo-001": defaultActions
  });
  const [commitmentsByContract, setCommitmentsByContract] = useState<Record<string, CommitmentItem[]>>({
    "contract-demo-001": defaultCommitments
  });
  const [handoffsByContract, setHandoffsByContract] = useState<Record<string, HandoffItem[]>>({
    "contract-demo-001": defaultHandoffs
  });
  const [commercialByContract, setCommercialByContract] = useState<Record<string, CommercialRecord[]>>({
    "contract-demo-001": defaultCommercialRecords
  });
  const [auditByContract, setAuditByContract] = useState<Record<string, AuditEvent[]>>({
    "contract-demo-001": [
      { id: "audit-initial", when: "Initial setup", action: "Workspace created", detail: "Initial local planning workspace created" }
    ]
  });
  const [selectedId, setSelectedId] = useState(defaultContracts[0].id);
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");
  const [activeStep, setActiveStep] = useState(setupSteps[0]);
  const [activePlanView, setActivePlanView] = useState<PlanViewKey>("board");
  const [planStartDate, setPlanStartDate] = useState("2026-03-23");
  const [planWindowDays, setPlanWindowDays] = useState(7);
  const [planningFilters, setPlanningFilters] = useState<PlanningFilters>({
    search: "",
    owner: "All",
    status: "All",
    area: "All"
  });
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [bulkDraft, setBulkDraft] = useState<BulkPlanningDraft>({
    owner: "Keep",
    status: "Keep",
    startDate: ""
  });
  const [selectedWorker, setSelectedWorker] = useState("Design Lead");
  const [toast, setToast] = useState("");
  const [hasLoadedLocalData, setHasLoadedLocalData] = useState(false);
  const [newActivity, setNewActivity] = useState<NewActivityDraft>({
    title: "",
    owner: "Unassigned",
    area: "",
    start: "",
    finish: "",
    status: "Planned"
  });
  const [newPerson, setNewPerson] = useState({
    name: "",
    role: "Owner",
    discipline: "Design",
    dailyCapacity: "1",
    availability: "Available"
  });
  const [newConstraint, setNewConstraint] = useState({
    activityId: "",
    title: "",
    type: "Design",
    owner: "Unassigned",
    due: "",
    status: "Open"
  });
  const [newAction, setNewAction] = useState({
    title: "",
    owner: "Unassigned",
    due: "Today",
    status: "Open",
    linkedActivity: ""
  });
  const [newCommitment, setNewCommitment] = useState({
    title: "",
    owner: "Unassigned",
    due: "Today",
    status: "Promised",
    linkedActivity: ""
  });
  const [newHandoff, setNewHandoff] = useState({
    title: "",
    fromOwner: "Unassigned",
    toOwner: "Unassigned",
    due: "Today",
    status: "Pending",
    linkedActivity: ""
  });
  const [newCommercialRecord, setNewCommercialRecord] = useState({
    type: "EWN" as CommercialRecord["type"],
    reference: "",
    title: "",
    owner: "Commercial Lead",
    status: "Draft",
    due: "Today",
    linkedActivity: ""
  });
  const [fieldUpdate, setFieldUpdate] = useState({
    activityId: "",
    status: "Planned",
    note: ""
  });
  const [reportSelection, setReportSelection] = useState<Record<string, boolean>>(
    Object.fromEntries(reportTypes.map((report) => [report, true]))
  );

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as ContractRecord[];
        if (Array.isArray(parsed) && parsed.length) {
          setContracts(parsed);
          setSelectedId(parsed[0].id);
        }
      }
      const savedPlanning = window.localStorage.getItem(planningStorageKey);
      if (savedPlanning) {
        const parsedPlanning = JSON.parse(savedPlanning) as Record<string, PlanningActivity[]>;
        if (parsedPlanning && typeof parsedPlanning === "object") {
          setPlanningByContract(parsedPlanning);
        }
      }
      const savedPeople = window.localStorage.getItem(peopleStorageKey);
      if (savedPeople) {
        const parsedPeople = JSON.parse(savedPeople) as Record<string, ResourcePerson[]>;
        if (parsedPeople && typeof parsedPeople === "object") {
          setPeopleByContract(parsedPeople);
        }
      }
      const savedConstraints = window.localStorage.getItem(constraintsStorageKey);
      if (savedConstraints) {
        const parsedConstraints = JSON.parse(savedConstraints) as Record<string, ConstraintItem[]>;
        if (parsedConstraints && typeof parsedConstraints === "object") {
          setConstraintsByContract(parsedConstraints);
        }
      }
      const savedActions = window.localStorage.getItem(actionsStorageKey);
      if (savedActions) {
        const parsedActions = JSON.parse(savedActions) as Record<string, DailyAction[]>;
        if (parsedActions && typeof parsedActions === "object") {
          setActionsByContract(parsedActions);
        }
      }
      const savedCommitments = window.localStorage.getItem(commitmentsStorageKey);
      if (savedCommitments) {
        const parsedCommitments = JSON.parse(savedCommitments) as Record<string, CommitmentItem[]>;
        if (parsedCommitments && typeof parsedCommitments === "object") {
          setCommitmentsByContract(parsedCommitments);
        }
      }
      const savedHandoffs = window.localStorage.getItem(handoffsStorageKey);
      if (savedHandoffs) {
        const parsedHandoffs = JSON.parse(savedHandoffs) as Record<string, HandoffItem[]>;
        if (parsedHandoffs && typeof parsedHandoffs === "object") {
          setHandoffsByContract(parsedHandoffs);
        }
      }
      const savedCommercial = window.localStorage.getItem(commercialStorageKey);
      if (savedCommercial) {
        const parsedCommercial = JSON.parse(savedCommercial) as Record<string, CommercialRecord[]>;
        if (parsedCommercial && typeof parsedCommercial === "object") {
          setCommercialByContract(parsedCommercial);
        }
      }
      const savedAudit = window.localStorage.getItem(auditStorageKey);
      if (savedAudit) {
        const parsedAudit = JSON.parse(savedAudit) as Record<string, AuditEvent[]>;
        if (parsedAudit && typeof parsedAudit === "object") {
          setAuditByContract(parsedAudit);
        }
      }
    } catch {
      setToast("Saved contract data could not be loaded");
    } finally {
      setHasLoadedLocalData(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedLocalData) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(contracts));
      window.localStorage.setItem(planningStorageKey, JSON.stringify(planningByContract));
      window.localStorage.setItem(peopleStorageKey, JSON.stringify(peopleByContract));
      window.localStorage.setItem(constraintsStorageKey, JSON.stringify(constraintsByContract));
      window.localStorage.setItem(actionsStorageKey, JSON.stringify(actionsByContract));
      window.localStorage.setItem(commitmentsStorageKey, JSON.stringify(commitmentsByContract));
      window.localStorage.setItem(handoffsStorageKey, JSON.stringify(handoffsByContract));
      window.localStorage.setItem(commercialStorageKey, JSON.stringify(commercialByContract));
      window.localStorage.setItem(auditStorageKey, JSON.stringify(auditByContract));
    } catch {
      setToast("Contract data could not be saved locally");
    }
  }, [contracts, planningByContract, peopleByContract, constraintsByContract, actionsByContract, commitmentsByContract, handoffsByContract, commercialByContract, auditByContract, hasLoadedLocalData]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selected = contracts.find((contract) => contract.id === selectedId) || contracts[0];

  const readiness = useMemo(() => {
    const checks = [
      { label: "Contract identity", pass: isComplete(selected.name) && isComplete(selected.code) },
      { label: "Client and contractor", pass: isComplete(selected.client) && isComplete(selected.contractor) },
      { label: "NEC option", pass: isComplete(selected.necOption) },
      { label: "Completion Date", pass: isComplete(selected.completionDate) },
      { label: "Project team", pass: isComplete(selected.planner) && isComplete(selected.commercialLead) },
      { label: "WBS / area mapping", pass: isComplete(selected.areas) && isComplete(selected.disciplines) },
      { label: "Current programme", pass: Boolean(selected.sources.current) },
      { label: "Baseline programme", pass: Boolean(selected.sources.baseline) }
    ];
    const passed = checks.filter((check) => check.pass).length;
    return {
      checks,
      passed,
      score: Math.round((passed / checks.length) * 100)
    };
  }, [selected]);

  const missingInfo = readiness.checks.filter((check) => !check.pass);
  const loadedSources = sourceMeta.filter((source) => selected.sources[source.key]).length;
  const selectedReports = Object.values(reportSelection).filter(Boolean).length;
  const planningActivities = planningByContract[selected.id] || [];
  const people = peopleByContract[selected.id] || [];
  const constraints = constraintsByContract[selected.id] || [];
  const dailyActions = actionsByContract[selected.id] || [];
  const commitments = commitmentsByContract[selected.id] || [];
  const handoffs = handoffsByContract[selected.id] || [];
  const commercialRecords = commercialByContract[selected.id] || [];
  const auditEvents = auditByContract[selected.id] || [];
  const openConstraints = constraints.filter((constraint) => constraint.status !== "Closed");
  const openActions = dailyActions.filter((action) => action.status !== "Closed");
  const liveCommitments = commitments.filter((commitment) => commitment.status === "Promised");
  const liveHandoffs = handoffs.filter((handoff) => handoff.status !== "Complete");
  const planDates = useMemo(() => {
    return Array.from({ length: planWindowDays }, (_, index) => {
      const iso = addDaysIso(planStartDate, index);
      return {
        iso,
        label: formatPlanDate(iso),
        day: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(new Date(`${iso}T00:00:00`))
      };
    });
  }, [planStartDate, planWindowDays]);
  const adherence = useMemo(() => {
    const dateSet = new Set(planDates.map((date) => date.iso));
    const visibleWindowActivities = planningActivities.filter((activity) => activity.startDate && dateSet.has(activity.startDate));
    const completed = visibleWindowActivities.filter((activity) => activity.status === "Complete").length;
    const blocked = visibleWindowActivities.filter((activity) => activity.status === "Blocked").length;
    const atRisk = visibleWindowActivities.filter((activity) => activity.status === "At risk").length;
    const unassigned = visibleWindowActivities.filter((activity) => activity.owner === "Unassigned").length;
    const late = visibleWindowActivities.filter((activity) => activity.finishDate && activity.finishDate < toIsoDate(new Date()) && activity.status !== "Complete").length;
    const score = visibleWindowActivities.length ? Math.round((completed / visibleWindowActivities.length) * 100) : 0;
    return {
      total: visibleWindowActivities.length,
      completed,
      blocked,
      atRisk,
      unassigned,
      late,
      score
    };
  }, [planningActivities, planDates]);
  const ownerOptions = useMemo(() => {
    const rawOwners = [
      "Unassigned",
      ...people.map((person) => person.name),
      selected.contractManager,
      selected.planner,
      selected.commercialLead,
      selected.projectManager,
      "Design",
      "EC&I",
      "Mechanical",
      "Procurement",
      "Manufacture",
      "Site",
      "Handover"
    ];
    return Array.from(new Set(rawOwners.map((owner) => owner.trim()).filter(Boolean)));
  }, [people, selected]);

  const areaOptions = useMemo(() => {
    return Array.from(new Set(planningActivities.map((activity) => activity.area || "Unmapped"))).sort();
  }, [planningActivities]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(planningActivities.map((activity) => activity.status || "Planned"))).sort();
  }, [planningActivities]);

  const filteredPlanningActivities = useMemo(() => {
    const search = planningFilters.search.trim().toLowerCase();
    return planningActivities.filter((activity) => {
      const searchable = `${activity.id} ${activity.title} ${activity.owner} ${activity.area} ${activity.status}`.toLowerCase();
      const matchesSearch = !search || searchable.includes(search);
      const matchesOwner = planningFilters.owner === "All" || activity.owner === planningFilters.owner;
      const matchesStatus = planningFilters.status === "All" || activity.status === planningFilters.status;
      const matchesArea = planningFilters.area === "All" || activity.area === planningFilters.area;
      return matchesSearch && matchesOwner && matchesStatus && matchesArea;
    });
  }, [planningActivities, planningFilters]);

  const priorityActivities = useMemo(() => {
    const statusWeight: Record<string, number> = {
      Blocked: 100,
      Critical: 80,
      "At risk": 70,
      "In progress": 35,
      Planned: 20,
      Complete: 0
    };
    return planningActivities
      .map((activity) => {
        const linkedConstraintCount = openConstraints.filter((constraint) => constraint.activityId === activity.id).length;
        const linkedActionCount = openActions.filter((action) => action.linkedActivity === activity.id).length;
        const isUnassigned = activity.owner === "Unassigned" ? 35 : 0;
        const score = (statusWeight[activity.status] || 15) + linkedConstraintCount * 30 + linkedActionCount * 10 + isUnassigned;
        const reasons = [
          activity.status === "Blocked" ? "blocked" : "",
          activity.status === "Critical" ? "critical" : "",
          activity.status === "At risk" ? "at risk" : "",
          linkedConstraintCount ? `${linkedConstraintCount} constraint${linkedConstraintCount === 1 ? "" : "s"}` : "",
          linkedActionCount ? `${linkedActionCount} action${linkedActionCount === 1 ? "" : "s"}` : "",
          activity.owner === "Unassigned" ? "unassigned" : ""
        ].filter(Boolean);
        return { activity, score, reasons };
      })
      .filter((item) => item.score > 0 && item.activity.status !== "Complete")
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [planningActivities, openActions, openConstraints]);

  useEffect(() => {
    if (ownerOptions.length && !ownerOptions.includes(selectedWorker)) {
      setSelectedWorker(ownerOptions[0]);
    }
  }, [ownerOptions, selectedWorker]);

  function updateSelected(field: keyof ContractRecord, value: string) {
    setContracts((current) =>
      current.map((contract) =>
        contract.id === selected.id ? { ...contract, [field]: value } : contract
      )
    );
  }

  function recordAudit(action: string, detail: string) {
    setAuditByContract((current) => ({
      ...current,
      [selected.id]: [
        { id: `audit-${Date.now()}`, when: formatNow(), action, detail },
        ...(current[selected.id] || [])
      ].slice(0, 40)
    }));
  }

  function createContract() {
    const contract = makeBlankContract();
    setContracts((current) => [contract, ...current]);
    setSelectedId(contract.id);
    setPlanningByContract((current) => ({ ...current, [contract.id]: [] }));
    setPeopleByContract((current) => ({ ...current, [contract.id]: [] }));
    setConstraintsByContract((current) => ({ ...current, [contract.id]: [] }));
    setActionsByContract((current) => ({ ...current, [contract.id]: [] }));
    setCommitmentsByContract((current) => ({ ...current, [contract.id]: [] }));
    setHandoffsByContract((current) => ({ ...current, [contract.id]: [] }));
    setCommercialByContract((current) => ({ ...current, [contract.id]: [] }));
    setAuditByContract((current) => ({
      ...current,
      [contract.id]: [{ id: `audit-${Date.now()}`, when: formatNow(), action: "Contract created", detail: "New contract workspace created" }]
    }));
    setActiveSection("setup");
    setActiveStep("Identity");
    setToast("New contract created");
  }

  async function handleSourceUpload(key: ProgrammeSourceKey, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const loadedAt = formatNow();
    setContracts((current) =>
      current.map((contract) =>
        contract.id === selected.id
          ? {
              ...contract,
              sources: {
                ...contract.sources,
                [key]: { fileName: file.name, loadedAt }
              }
            }
          : contract
      )
    );

    if (file.name.toLowerCase().endsWith(".xer")) {
      try {
        const text = await file.text();
        const parsedActivities = parseXerToPlanningActivities(text);
        if (key === "current") {
          setPlanningByContract((current) => ({ ...current, [selected.id]: parsedActivities }));
          if (parsedActivities[0]?.startDate) setPlanStartDate(parsedActivities[0].startDate);
          setToast(`${parsedActivities.length} activities parsed from ${file.name}`);
          recordAudit("Current XER parsed", `${parsedActivities.length} activities loaded from ${file.name}`);
          return;
        }
        if (key === "baseline") {
          const baselineById = new Map(parsedActivities.map((activity) => [activity.id, activity.finishDate || ""]));
          setPlanningByContract((current) => ({
            ...current,
            [selected.id]: (current[selected.id] || []).map((activity) => ({
              ...activity,
              baselineFinishDate: baselineById.get(activity.id) || activity.baselineFinishDate
            }))
          }));
          setToast(`${parsedActivities.length} baseline activities parsed`);
          recordAudit("Baseline XER parsed", `${parsedActivities.length} baseline activities loaded from ${file.name}`);
          return;
        }
      } catch {
        setToast("File linked, but the XER could not be parsed");
      }
    }

    recordAudit("Programme source linked", `${file.name} linked as ${key}`);
    setToast(`${file.name} linked to ${selected.code || selected.name}`);
  }

  function clearSource(key: ProgrammeSourceKey) {
    setContracts((current) =>
      current.map((contract) =>
        contract.id === selected.id
          ? { ...contract, sources: { ...contract.sources, [key]: null } }
          : contract
      )
    );
    recordAudit("Programme source removed", `${key} source removed`);
    setToast("Programme source removed");
  }

  function updatePlanningActivity(id: string, field: keyof PlanningActivity, value: string) {
    setPlanningByContract((current) => ({
      ...current,
      [selected.id]: (current[selected.id] || []).map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    }));
    recordAudit("Planning activity updated", `${id} ${String(field)} changed to ${value}`);
  }

  function scheduleActivity(id: string, startDate: string) {
    const activity = planningActivities.find((item) => item.id === id);
    if (!activity) return;
    const duration = Math.max(1, activity.durationDays || 1);
    const finishDate = addDaysIso(startDate, duration - 1);
    const ownerCapacity = people.find((person) => person.name === activity.owner);
    const capacity = Number(ownerCapacity?.dailyCapacity || 1);
    const sameDayLoad = planningActivities.filter((item) =>
      item.id !== id && item.owner === activity.owner && item.startDate === startDate && item.status !== "Complete"
    ).length;
    const isOverCapacity = activity.owner !== "Unassigned" && sameDayLoad >= capacity;

    setPlanningByContract((current) => ({
      ...current,
      [selected.id]: (current[selected.id] || []).map((item) =>
        item.id === id
          ? {
              ...item,
              startDate,
              finishDate,
              start: formatPlanDate(startDate),
              finish: formatPlanDate(finishDate)
            }
          : item
      )
    }));
    recordAudit("Activity scheduled", `${id} planned ${formatPlanDate(startDate)} to ${formatPlanDate(finishDate)}${isOverCapacity ? " with capacity override" : ""}`);
    setToast(isOverCapacity ? "Scheduled with capacity override warning" : "Activity scheduled");
  }

  function toggleActivitySelection(id: string) {
    setSelectedActivityIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function clearActivitySelection() {
    setSelectedActivityIds([]);
    setToast("Selection cleared");
  }

  function applyBulkPlanningUpdate() {
    if (!selectedActivityIds.length) {
      setToast("Select activities first");
      return;
    }

    setPlanningByContract((current) => ({
      ...current,
      [selected.id]: (current[selected.id] || []).map((activity) => {
        if (!selectedActivityIds.includes(activity.id)) return activity;
        const duration = Math.max(1, activity.durationDays || 1);
        const finishDate = bulkDraft.startDate ? addDaysIso(bulkDraft.startDate, duration - 1) : activity.finishDate;
        return {
          ...activity,
          owner: bulkDraft.owner === "Keep" ? activity.owner : bulkDraft.owner,
          status: bulkDraft.status === "Keep" ? activity.status : bulkDraft.status,
          startDate: bulkDraft.startDate || activity.startDate,
          finishDate,
          start: bulkDraft.startDate ? formatPlanDate(bulkDraft.startDate) : activity.start,
          finish: bulkDraft.startDate && finishDate ? formatPlanDate(finishDate) : activity.finish
        };
      })
    }));
    recordAudit("Bulk planning update", `${selectedActivityIds.length} activities updated`);
    setToast(`${selectedActivityIds.length} activities updated`);
    setSelectedActivityIds([]);
  }

  function resetPlanningFilters() {
    setPlanningFilters({ search: "", owner: "All", status: "All", area: "All" });
    setToast("Planning filters cleared");
  }

  async function copyMeetingPack() {
    const lines = [
      `${selected.code || selected.name} - planning meeting pack`,
      `Generated: ${formatNow()}`,
      "",
      `Setup readiness: ${readiness.score}%`,
      `Live activities: ${planningActivities.filter((activity) => activity.status !== "Complete").length}`,
      `Blocked / constrained: ${openConstraints.length}`,
      `Open actions: ${openActions.length}`,
      `Open commitments: ${liveCommitments.length}`,
      `Live handoffs: ${liveHandoffs.length}`,
      "",
      "Top priorities:",
      ...priorityActivities.map((item, index) =>
        `${index + 1}. ${item.activity.id} - ${item.activity.title} | Owner: ${item.activity.owner} | Status: ${item.activity.status} | Reason: ${item.reasons.join(", ") || "programme focus"}`
      )
    ];

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setToast("Meeting pack copied");
    } catch {
      setToast("Meeting pack ready, but clipboard is unavailable in this browser");
    }
  }

  function addPlanningActivity() {
    if (!newActivity.title.trim()) {
      setToast("Add an activity title first");
      return;
    }

    const nextNumber = String(planningActivities.length + 1).padStart(3, "0");
    const activity: PlanningActivity = {
      id: `ADD-${nextNumber}`,
      title: newActivity.title.trim(),
      owner: newActivity.owner || "Unassigned",
      area: newActivity.area.trim() || "Unmapped",
      start: newActivity.start.trim() || "To plan",
      finish: newActivity.finish.trim() || "To plan",
      status: newActivity.status || "Planned",
      source: "Added"
    };

    setPlanningByContract((current) => ({
      ...current,
      [selected.id]: [...(current[selected.id] || []), activity]
    }));
    setNewActivity({ title: "", owner: "Unassigned", area: "", start: "", finish: "", status: "Planned" });
    recordAudit("Planning activity added", `${activity.id} - ${activity.title}`);
    setToast(`${activity.id} added to the look-ahead plan`);
  }

  function addPerson() {
    if (!newPerson.name.trim()) {
      setToast("Add a person name first");
      return;
    }

    const person: ResourcePerson = {
      id: `person-${Date.now()}`,
      name: newPerson.name.trim(),
      role: newPerson.role,
      discipline: newPerson.discipline,
      dailyCapacity: newPerson.dailyCapacity || "1",
      availability: newPerson.availability
    };

    setPeopleByContract((current) => ({
      ...current,
      [selected.id]: [...(current[selected.id] || []), person]
    }));
    setNewPerson({ name: "", role: "Owner", discipline: "Design", dailyCapacity: "1", availability: "Available" });
    recordAudit("Person added", `${person.name} added as ${person.role}`);
    setToast(`${person.name} added to this contract`);
  }

  function addConstraint() {
    if (!newConstraint.title.trim()) {
      setToast("Add a constraint description first");
      return;
    }

    const constraint: ConstraintItem = {
      id: `constraint-${Date.now()}`,
      activityId: newConstraint.activityId || "Unlinked",
      title: newConstraint.title.trim(),
      type: newConstraint.type,
      owner: newConstraint.owner,
      due: newConstraint.due || "To confirm",
      status: newConstraint.status
    };

    setConstraintsByContract((current) => ({
      ...current,
      [selected.id]: [...(current[selected.id] || []), constraint]
    }));
    setNewConstraint({ activityId: "", title: "", type: "Design", owner: "Unassigned", due: "", status: "Open" });
    recordAudit("Constraint added", `${constraint.title} linked to ${constraint.activityId}`);
    setToast("Constraint added");
  }

  function addDailyAction() {
    if (!newAction.title.trim()) {
      setToast("Add an action first");
      return;
    }

    const action: DailyAction = {
      id: `action-${Date.now()}`,
      title: newAction.title.trim(),
      owner: newAction.owner,
      due: newAction.due || "Today",
      status: newAction.status,
      linkedActivity: newAction.linkedActivity || "Unlinked"
    };

    setActionsByContract((current) => ({
      ...current,
      [selected.id]: [...(current[selected.id] || []), action]
    }));
    setNewAction({ title: "", owner: "Unassigned", due: "Today", status: "Open", linkedActivity: "" });
    recordAudit("Daily action added", `${action.title} assigned to ${action.owner}`);
    setToast("Daily action added");
  }

  function addCommercialRecord() {
    if (!newCommercialRecord.title.trim()) {
      setToast("Add a commercial record title first");
      return;
    }

    const record: CommercialRecord = {
      id: `commercial-${Date.now()}`,
      type: newCommercialRecord.type,
      reference: newCommercialRecord.reference.trim() || `${newCommercialRecord.type}-${String(commercialRecords.length + 1).padStart(3, "0")}`,
      title: newCommercialRecord.title.trim(),
      owner: newCommercialRecord.owner,
      status: newCommercialRecord.status,
      due: newCommercialRecord.due || "Today",
      linkedActivity: newCommercialRecord.linkedActivity || "Unlinked"
    };

    setCommercialByContract((current) => ({
      ...current,
      [selected.id]: [...(current[selected.id] || []), record]
    }));
    setNewCommercialRecord({ type: "EWN", reference: "", title: "", owner: "Commercial Lead", status: "Draft", due: "Today", linkedActivity: "" });
    recordAudit("Commercial record added", `${record.reference} - ${record.title}`);
    setToast(`${record.reference} added`);
  }

  function updateCommercialStatus(id: string, status: string) {
    setCommercialByContract((current) => ({
      ...current,
      [selected.id]: (current[selected.id] || []).map((record) =>
        record.id === id ? { ...record, status } : record
      )
    }));
    recordAudit("Commercial record updated", `${id} set to ${status}`);
    setToast(`Commercial record set to ${status}`);
  }

  function updateDailyActionStatus(id: string, status: string) {
    setActionsByContract((current) => ({
      ...current,
      [selected.id]: (current[selected.id] || []).map((action) =>
        action.id === id ? { ...action, status } : action
      )
    }));
    recordAudit("Daily action updated", `${id} set to ${status}`);
    setToast(`Action set to ${status}`);
  }

  function addCommitment() {
    if (!newCommitment.title.trim()) {
      setToast("Add a commitment first");
      return;
    }

    const commitment: CommitmentItem = {
      id: `commitment-${Date.now()}`,
      title: newCommitment.title.trim(),
      owner: newCommitment.owner,
      due: newCommitment.due || "Today",
      status: newCommitment.status,
      linkedActivity: newCommitment.linkedActivity || "Unlinked"
    };

    setCommitmentsByContract((current) => ({
      ...current,
      [selected.id]: [...(current[selected.id] || []), commitment]
    }));
    setNewCommitment({ title: "", owner: "Unassigned", due: "Today", status: "Promised", linkedActivity: "" });
    recordAudit("Commitment added", `${commitment.title} promised by ${commitment.owner}`);
    setToast("Commitment added");
  }

  function updateCommitmentStatus(id: string, status: string) {
    setCommitmentsByContract((current) => ({
      ...current,
      [selected.id]: (current[selected.id] || []).map((commitment) =>
        commitment.id === id ? { ...commitment, status } : commitment
      )
    }));
    recordAudit("Commitment updated", `${id} set to ${status}`);
    setToast(`Commitment marked ${status}`);
  }

  function addHandoff() {
    if (!newHandoff.title.trim()) {
      setToast("Add a handoff description first");
      return;
    }

    const handoff: HandoffItem = {
      id: `handoff-${Date.now()}`,
      title: newHandoff.title.trim(),
      fromOwner: newHandoff.fromOwner,
      toOwner: newHandoff.toOwner,
      due: newHandoff.due || "Today",
      status: newHandoff.status,
      linkedActivity: newHandoff.linkedActivity || "Unlinked"
    };

    setHandoffsByContract((current) => ({
      ...current,
      [selected.id]: [...(current[selected.id] || []), handoff]
    }));
    setNewHandoff({ title: "", fromOwner: "Unassigned", toOwner: "Unassigned", due: "Today", status: "Pending", linkedActivity: "" });
    recordAudit("Handoff added", `${handoff.title} from ${handoff.fromOwner} to ${handoff.toOwner}`);
    setToast("Handoff added");
  }

  function updateHandoffStatus(id: string, status: string) {
    setHandoffsByContract((current) => ({
      ...current,
      [selected.id]: (current[selected.id] || []).map((handoff) =>
        handoff.id === id ? { ...handoff, status } : handoff
      )
    }));
    recordAudit("Handoff updated", `${id} set to ${status}`);
    setToast(`Handoff set to ${status}`);
  }

  function closeConstraint(id: string) {
    setConstraintsByContract((current) => ({
      ...current,
      [selected.id]: (current[selected.id] || []).map((constraint) =>
        constraint.id === id ? { ...constraint, status: "Closed" } : constraint
      )
    }));
    recordAudit("Constraint closed", `${id} closed`);
    setToast("Constraint closed");
  }

  function submitFieldUpdate() {
    if (!fieldUpdate.activityId) {
      setToast("Select an activity to update");
      return;
    }
    updatePlanningActivity(fieldUpdate.activityId, "status", fieldUpdate.status);
    recordAudit("Field update recorded", `${fieldUpdate.activityId} set to ${fieldUpdate.status}${fieldUpdate.note ? ` - ${fieldUpdate.note}` : ""}`);
    setFieldUpdate({ activityId: "", status: "Planned", note: "" });
    setToast("Activity update recorded");
  }

  function selectSection(key: SectionKey) {
    setActiveSection(key);
    document.getElementById(key)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="app-shell">
      <aside className="side-nav" aria-label="Main navigation">
        <div className="brand-lockup">
          <div className="brand-card">
            <img src="/exentec-hargreaves-logo.png" alt="Exentec Hargreaves" />
          </div>
          <div>
            <strong>Contract Control Hub</strong>
            <small>Programme, planning and NEC control</small>
          </div>
        </div>

        <nav className="main-nav">
          {navItems.map((item) => (
            <button
              className={activeSection === item.key ? "active" : ""}
              key={item.key}
              onClick={() => selectSection(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="side-footer">
          <span>Environment</span>
          <strong>Local foundation</strong>
          <small>Ready for database connection</small>
        </div>
      </aside>

      <section className="workspace">
        <header className="top-bar" id="overview">
          <div>
            <p className="eyebrow">Multi-contract platform</p>
            <img className="hero-logo" src="/exentec-hargreaves-logo.png" alt="Exentec Hargreaves" />
            <h1>Exentec Hargreaves Contract Control Hub</h1>
            <p className="hero-copy">
              A contract-first control platform for NEC programme management, weekly planning,
              commercial records, reporting, and AI-supported narratives.
            </p>
          </div>
          <div className="top-actions">
            <button className="ghost-button" type="button" onClick={() => setToast("Prototype import is next in the build")}>
              Import Prototype Data
            </button>
            <button className="primary-button" type="button" onClick={createContract}>
              Create Contract
            </button>
          </div>
        </header>

        <section className="contract-strip" aria-label="Selected contract">
          <label className="contract-picker">
            <span className="mini-label">Selected contract</span>
            <select value={selected.id} onChange={(event) => setSelectedId(event.target.value)}>
              {contracts.map((contract) => (
                <option key={contract.id} value={contract.id}>
                  {contract.code || "No code"} - {contract.name}
                </option>
              ))}
            </select>
          </label>
          <div className="contract-meta">
            <span>{selected.status}</span>
            <span>{readiness.score}% setup ready</span>
            <span>{loadedSources}/3 programme sources</span>
          </div>
        </section>

        <section className="kpi-row" aria-label="Portfolio summary">
          <article className="kpi-card">
            <span>{contracts.length}</span>
            <strong>Contracts</strong>
            <small>Configured in this workspace</small>
          </article>
          <article className="kpi-card">
            <span>{readiness.score}%</span>
            <strong>Setup Readiness</strong>
            <small>{missingInfo.length} missing checks</small>
          </article>
          <article className="kpi-card">
            <span>{loadedSources}/3</span>
            <strong>Programme Sources</strong>
            <small>Current, previous, baseline</small>
          </article>
          <article className="kpi-card">
            <span>{selectedReports}</span>
            <strong>Report Pack</strong>
            <small>Selected outputs</small>
          </article>
        </section>

        <section className="module-grid" aria-label="Control modules">
          {[
            {
              title: "Contract Setup",
              state: "Live",
              section: "setup" as SectionKey,
              text: "Create any contract, define NEC settings, project team, key dates, WBS mappings, reporting rules, and AI terminology."
            },
            {
              title: "Programme Management",
              state: "Next",
              section: "programme" as SectionKey,
              text: "Load current, previous, and baseline XER files, then store parsed activities, relationships, WBS, float, and milestones."
            },
            {
              title: "Planning Workspace",
              state: "Mapped",
              section: "planning" as SectionKey,
              text: "Weekly board, Gantt, area view, list view, owner allocation, auto planning, activity updates, blockers, and capacity checks."
            },
            {
              title: "My Work",
              state: "Field",
              section: "mywork" as SectionKey,
              text: "Personal work queue for each owner, with one-click status updates, blockers, actions, commitments, and handoffs."
            },
            {
              title: "Commercial and NEC",
              state: "Modelled",
              section: "commercial" as SectionKey,
              text: "Early warnings, compensation events, PM instructions, Clause 32 submissions, and acceptance history."
            }
          ].map((module) => (
            <article className="module-card" key={module.title}>
              <div className="module-card-top">
                <div>
                  <span className="mini-label">{module.state}</span>
                  <h2>{module.title}</h2>
                </div>
                <button className="icon-button" type="button" onClick={() => selectSection(module.section)}>
                  Open
                </button>
              </div>
              <p>{module.text}</p>
            </article>
          ))}
        </section>

        <CommandPrioritiesPanel
          actions={openActions}
          commitments={liveCommitments}
          constraints={openConstraints}
          handoffs={liveHandoffs}
          missingInfo={missingInfo.map((item) => item.label)}
          planningActivities={planningActivities}
          priorityActivities={priorityActivities}
          readinessScore={readiness.score}
          onCopyMeetingPack={copyMeetingPack}
          onOpenPlanning={() => selectSection("planning")}
        />

        <section className="two-column" id="setup">
          <article className="panel setup-panel">
            <div className="panel-header">
              <div>
                <span className="mini-label">Contract setup</span>
                <h2>Setup Wizard</h2>
              </div>
              <span className={readiness.score >= 85 ? "status-pill green" : "status-pill amber"}>
                {readiness.score}% ready
              </span>
            </div>

            <div className="stepper" aria-label="Setup steps">
              {setupSteps.map((step) => (
                <button
                  className={activeStep === step ? "active" : ""}
                  key={step}
                  onClick={() => setActiveStep(step)}
                  type="button"
                >
                  {step}
                </button>
              ))}
            </div>

            <ContractSetupFields activeStep={activeStep} selected={selected} updateSelected={updateSelected} />

            <div className="form-actions">
              <button className="primary-button" type="button" onClick={() => setToast("Contract setup saved locally")}>
                Save Setup
              </button>
              <button className="ghost-button" type="button" onClick={() => selectSection("programme")}>
                Continue to Programme
              </button>
            </div>
          </article>

          <article className="panel readiness-panel">
            <div className="panel-header">
              <div>
                <span className="mini-label">Readiness</span>
                <h2>Data Quality Checks</h2>
              </div>
              <span className="status-pill blue">{readiness.passed}/8 complete</span>
            </div>

            <div className="check-list">
              {readiness.checks.map((check) => (
                <div className={check.pass ? "check-row pass" : "check-row fail"} key={check.label}>
                  <span>{check.pass ? "OK" : "NEEDS"}</span>
                  <strong>{check.label}</strong>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="panel programme-panel" id="programme">
          <div className="panel-header">
            <div>
              <span className="mini-label">Programme controls</span>
              <h2>Programme Upload Centre</h2>
            </div>
            <span className="status-pill blue">{loadedSources}/3 linked</span>
          </div>

          <div className="source-grid">
            {sourceMeta.map((source) => {
              const loaded = selected.sources[source.key];
              return (
                <article className={loaded ? "source-card loaded" : "source-card"} key={source.key}>
                  <span>{source.type}</span>
                  <strong>{source.title}</strong>
                  <p>{source.detail}</p>
                  {loaded ? (
                    <div className="source-status">
                      <small>{loaded.fileName}</small>
                      <small>Linked {loaded.loadedAt}</small>
                      <button className="text-button" type="button" onClick={() => clearSource(source.key)}>
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="upload-button">
                      Link file
                      <input accept=".xer,.xml,.csv,.xlsx" onChange={(event) => handleSourceUpload(source.key, event)} type="file" />
                    </label>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="planning-layout" id="planning">
          <article className="panel planning-board">
            <div className="panel-header">
              <div>
                <span className="mini-label">Weekly planning</span>
                <h2>Live Look-Ahead Planning</h2>
              </div>
              <div className="plan-toolbar">
                <div className="segmented">
                  <button className={planWindowDays === 7 ? "active" : ""} type="button" onClick={() => setPlanWindowDays(7)}>1W</button>
                  <button className={planWindowDays === 28 ? "active" : ""} type="button" onClick={() => setPlanWindowDays(28)}>4W</button>
                  <button className={planWindowDays === 112 ? "active" : ""} type="button" onClick={() => setPlanWindowDays(112)}>16W</button>
                </div>
                <div className="date-navigator">
                  <button type="button" onClick={() => setPlanStartDate(addDaysIso(planStartDate, -7))}>Previous</button>
                  <input value={planStartDate} onChange={(event) => setPlanStartDate(event.target.value)} type="date" />
                  <button type="button" onClick={() => setPlanStartDate(addDaysIso(planStartDate, 7))}>Next</button>
                </div>
                <div className="view-switch">
                  {planViews.map((view) => (
                    <button
                      className={activePlanView === view.key ? "active" : ""}
                      key={view.key}
                      onClick={() => setActivePlanView(view.key)}
                      type="button"
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AddActivityPanel
              activity={newActivity}
              ownerOptions={ownerOptions}
              setActivity={setNewActivity}
              onAdd={addPlanningActivity}
            />

            <ScheduleAdherencePanel adherence={adherence} />

            <BulkPlanningActions
              bulkDraft={bulkDraft}
              ownerOptions={ownerOptions}
              selectedCount={selectedActivityIds.length}
              setBulkDraft={setBulkDraft}
              onApply={applyBulkPlanningUpdate}
              onClear={clearActivitySelection}
            />

            <PlanningFiltersBar
              areaOptions={areaOptions}
              filters={planningFilters}
              filteredCount={filteredPlanningActivities.length}
              ownerOptions={ownerOptions}
              setFilters={setPlanningFilters}
              statusOptions={statusOptions}
              totalCount={planningActivities.length}
              onReset={resetPlanningFilters}
            />

            {activePlanView === "board" ? (
              <BoardView
                activities={filteredPlanningActivities}
                ownerOptions={ownerOptions}
                planDates={planDates}
                selectedActivityIds={selectedActivityIds}
                onSchedule={scheduleActivity}
                onSelect={toggleActivitySelection}
                onUpdate={updatePlanningActivity}
              />
            ) : null}
            {activePlanView === "gantt" ? <GanttView activities={filteredPlanningActivities} /> : null}
            {activePlanView === "areas" ? <AreaView activities={filteredPlanningActivities} /> : null}
            {activePlanView === "list" ? (
              <ListView
                activities={filteredPlanningActivities}
                ownerOptions={ownerOptions}
                selectedActivityIds={selectedActivityIds}
                onSelect={toggleActivitySelection}
                onUpdate={updatePlanningActivity}
              />
            ) : null}
          </article>

          <article className="panel capacity-panel">
            <div className="panel-header">
              <div>
                <span className="mini-label">Daily coordination</span>
                <h2>Meeting Mode</h2>
              </div>
              <span className="status-pill blue">4 week window</span>
            </div>
            <MeetingModePanel
              actions={dailyActions}
              constraints={constraints}
              fieldUpdate={fieldUpdate}
              newAction={newAction}
              ownerOptions={ownerOptions}
              planningActivities={planningActivities}
              setFieldUpdate={setFieldUpdate}
              setNewAction={setNewAction}
              onAddAction={addDailyAction}
              onSubmitUpdate={submitFieldUpdate}
            />
            <div className="panel-subsection">
              <h3>AI Narrative Inputs</h3>
              <div className="missing-list">
                {missingInfo.length ? (
                  missingInfo.map((item) => <span key={item.label}>{item.label}</span>)
                ) : (
                  <span>All core AI inputs are available</span>
                )}
              </div>
            </div>
          </article>
        </section>

        <section className="panel my-work-panel" id="mywork">
          <div className="panel-header">
            <div>
              <span className="mini-label">Team execution</span>
              <h2>My Work Console</h2>
            </div>
            <span className="status-pill blue">{planningActivities.filter((activity) => activity.owner === selectedWorker).length} assigned</span>
          </div>
          <MyWorkPanel
            actions={dailyActions}
            commitments={commitments}
            constraints={constraints}
            ownerOptions={ownerOptions}
            planningActivities={planningActivities}
            selectedWorker={selectedWorker}
            setSelectedWorker={setSelectedWorker}
            onActionStatus={updateDailyActionStatus}
            onActivityStatus={(id, status) => updatePlanningActivity(id, "status", status)}
          />
        </section>

        <section className="panel constraints-panel">
          <div className="panel-header">
            <div>
              <span className="mini-label">Constraints</span>
              <h2>Constraint Register</h2>
            </div>
            <span className="status-pill amber">{constraints.filter((item) => item.status !== "Closed").length} open</span>
          </div>
          <ConstraintsPanel
            constraints={constraints}
            newConstraint={newConstraint}
            ownerOptions={ownerOptions}
            planningActivities={planningActivities}
            setNewConstraint={setNewConstraint}
            onAdd={addConstraint}
            onClose={closeConstraint}
          />
        </section>

        <section className="panel people-panel" id="resources">
          <div className="panel-header">
            <div>
              <span className="mini-label">People and resources</span>
              <h2>Allocation Register</h2>
            </div>
            <span className="status-pill blue">{people.length} people</span>
          </div>
          <PeopleResourcePanel
            people={people}
            newPerson={newPerson}
            setNewPerson={setNewPerson}
            onAdd={addPerson}
            planningActivities={planningActivities}
          />
        </section>

        <section className="two-column delivery-grid" id="delivery">
          <article className="panel">
            <div className="panel-header">
              <div>
                <span className="mini-label">Delivery reliability</span>
                <h2>Commitments Log</h2>
              </div>
              <span className="status-pill amber">{commitments.filter((item) => item.status === "Promised").length} promised</span>
            </div>
            <CommitmentsPanel
              commitments={commitments}
              newCommitment={newCommitment}
              ownerOptions={ownerOptions}
              planningActivities={planningActivities}
              setNewCommitment={setNewCommitment}
              onAdd={addCommitment}
              onStatus={updateCommitmentStatus}
            />
          </article>

          <article className="panel">
            <div className="panel-header">
              <div>
                <span className="mini-label">Interface control</span>
                <h2>Handoffs</h2>
              </div>
              <span className="status-pill blue">{handoffs.filter((item) => item.status !== "Complete").length} live</span>
            </div>
            <HandoffsPanel
              handoffs={handoffs}
              newHandoff={newHandoff}
              ownerOptions={ownerOptions}
              planningActivities={planningActivities}
              setNewHandoff={setNewHandoff}
              onAdd={addHandoff}
              onStatus={updateHandoffStatus}
            />
          </article>
        </section>

        <section className="two-column">
          <article className="panel" id="commercial">
            <div className="panel-header">
              <div>
                <span className="mini-label">Commercial and NEC</span>
                <h2>Control Registers</h2>
              </div>
              <span className="status-pill amber">{commercialRecords.filter((record) => record.status !== "Closed").length} open</span>
            </div>
            <CommercialRegisterPanel
              commercialRecords={commercialRecords}
              newRecord={newCommercialRecord}
              ownerOptions={ownerOptions}
              planningActivities={planningActivities}
              setNewRecord={setNewCommercialRecord}
              onAdd={addCommercialRecord}
              onStatus={updateCommercialStatus}
            />
          </article>

          <article className="panel discussion-panel">
            <div className="panel-header">
              <div>
                <span className="mini-label">Leadership view</span>
                <h2>Discussion Points</h2>
              </div>
              <span className="status-pill green">Auto-ready</span>
            </div>
            <div className="discussion-list">
              <article>
                <strong>Biggest movement</strong>
                <p>Programme movement will calculate once current and baseline files are parsed into the database.</p>
              </article>
              <article>
                <strong>Biggest risk</strong>
                <p>{missingInfo.length ? `${missingInfo.length} setup checks are missing before reporting can be trusted.` : "Setup is ready for reporting."}</p>
              </article>
              <article>
                <strong>Best opportunity</strong>
                <p>The contract-first setup lets this become a reusable platform for any NEC contract.</p>
              </article>
            </div>
          </article>
        </section>

        <section className="panel reports-panel" id="reports">
          <div className="panel-header">
            <div>
              <span className="mini-label">Reports and AI</span>
              <h2>Report Pack Builder</h2>
            </div>
            <button
              className="primary-button compact"
              type="button"
              onClick={() => setToast(`${selectedReports} report outputs selected for ${selected.code || selected.name}`)}
            >
              Generate Pack
            </button>
          </div>
          <div className="report-grid">
            {reportTypes.map((report) => (
              <label className="report-card selectable" key={report}>
                <input
                  checked={reportSelection[report]}
                  onChange={(event) => setReportSelection((current) => ({ ...current, [report]: event.target.checked }))}
                  type="checkbox"
                />
                <strong>{report}</strong>
                <small>Branded dashboard and PDF output</small>
              </label>
            ))}
          </div>
        </section>

        <section className="panel admin-panel" id="admin">
          <div className="panel-header">
            <div>
              <span className="mini-label">Implementation</span>
              <h2>Build Status</h2>
            </div>
            <span className="status-pill blue">Foundation complete</span>
          </div>
          <div className="build-status">
            <div>
              <strong>Database schema</strong>
              <span>PostgreSQL and Prisma models are prepared.</span>
            </div>
            <div>
              <strong>Local persistence</strong>
              <span>Contract setup and programme source status save in browser storage for now.</span>
            </div>
            <div>
              <strong>Next build</strong>
              <span>Connect API routes to Prisma, then migrate XER parsing from the HTML prototype.</span>
            </div>
          </div>
          <AuditTrail events={auditEvents} />
        </section>
      </section>

      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}

function ContractSetupFields({
  activeStep,
  selected,
  updateSelected
}: {
  activeStep: string;
  selected: ContractRecord;
  updateSelected: (field: keyof ContractRecord, value: string) => void;
}) {
  const fieldsByStep: Record<string, Array<[keyof ContractRecord, string]>> = {
    Identity: [
      ["name", "Contract name"],
      ["code", "Contract code"],
      ["client", "Client"],
      ["contractor", "Contractor"]
    ],
    NEC: [
      ["necOption", "NEC option"],
      ["status", "Contract status"]
    ],
    Dates: [
      ["startingDate", "Starting date"],
      ["completionDate", "Completion Date"],
      ["reportingPeriod", "Reporting period"]
    ],
    Team: [
      ["contractManager", "Contract manager"],
      ["planner", "Planner"],
      ["commercialLead", "Commercial lead"],
      ["projectManager", "Project Manager"]
    ],
    Mappings: [
      ["disciplines", "Disciplines"],
      ["areas", "Areas / WBS groups"]
    ],
    "AI & Reports": [
      ["aiTone", "AI narrative style"],
      ["reportBranding", "Report branding"]
    ]
  };

  return (
    <form className="setup-form">
      {fieldsByStep[activeStep].map(([field, label]) => (
        <label className={field === "aiTone" || field === "areas" || field === "disciplines" ? "wide-field" : ""} key={field}>
          <span>{label}</span>
          <input value={String(selected[field] || "")} onChange={(event) => updateSelected(field, event.target.value)} />
        </label>
      ))}
    </form>
  );
}

function CommandPrioritiesPanel({
  actions,
  commitments,
  constraints,
  handoffs,
  missingInfo,
  planningActivities,
  priorityActivities,
  readinessScore,
  onCopyMeetingPack,
  onOpenPlanning
}: {
  actions: DailyAction[];
  commitments: CommitmentItem[];
  constraints: ConstraintItem[];
  handoffs: HandoffItem[];
  missingInfo: string[];
  planningActivities: PlanningActivity[];
  priorityActivities: Array<{ activity: PlanningActivity; score: number; reasons: string[] }>;
  readinessScore: number;
  onCopyMeetingPack: () => void;
  onOpenPlanning: () => void;
}) {
  const liveActivities = planningActivities.filter((activity) => activity.status !== "Complete");
  const unassigned = liveActivities.filter((activity) => activity.owner === "Unassigned").length;
  const blocked = liveActivities.filter((activity) => activity.status === "Blocked").length;
  const critical = liveActivities.filter((activity) => activity.status === "Critical").length;
  const controlScore = Math.max(
    0,
    Math.min(100, readinessScore - constraints.length * 4 - unassigned * 3 - blocked * 8 - commitments.length * 2)
  );

  return (
    <section className="panel command-panel">
      <div className="panel-header">
        <div>
          <span className="mini-label">Command priorities</span>
          <h2>What needs attention next</h2>
        </div>
        <div className="command-actions">
          <span className={controlScore >= 75 ? "status-pill green" : controlScore >= 50 ? "status-pill amber" : "status-pill red"}>
            {controlScore}% control score
          </span>
          <button className="ghost-button compact" type="button" onClick={onCopyMeetingPack}>Copy Meeting Pack</button>
          <button className="primary-button compact" type="button" onClick={onOpenPlanning}>Open Planning</button>
        </div>
      </div>

      <div className="command-grid">
        <article>
          <span>{blocked}</span>
          <strong>Blocked</strong>
          <small>Activities needing intervention</small>
        </article>
        <article>
          <span>{critical}</span>
          <strong>Critical</strong>
          <small>Critical status in the look-ahead</small>
        </article>
        <article>
          <span>{unassigned}</span>
          <strong>Unassigned</strong>
          <small>Ownership gaps to close</small>
        </article>
        <article>
          <span>{constraints.length}</span>
          <strong>Constraints</strong>
          <small>Open blockers / release items</small>
        </article>
        <article>
          <span>{actions.length}</span>
          <strong>Actions</strong>
          <small>Open daily actions</small>
        </article>
        <article>
          <span>{handoffs.length}</span>
          <strong>Handoffs</strong>
          <small>Live interface transfers</small>
        </article>
      </div>

      <div className="priority-layout">
        <div className="priority-list">
          <div className="column-heading">
            <span className="mini-label">Challenge list</span>
            <strong>Top activities to discuss</strong>
          </div>
          {priorityActivities.length ? (
            priorityActivities.map((item, index) => (
              <article className="priority-item" key={item.activity.id}>
                <span>{index + 1}</span>
                <div>
                  <strong>{item.activity.id} - {item.activity.title}</strong>
                  <small>{item.activity.owner} | {item.activity.area} | {item.activity.status}</small>
                  <em>{item.reasons.join(", ") || "programme focus"}</em>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-panel compact-empty">
              <strong>No urgent activity priorities</strong>
              <span>Current look-ahead records do not show blocked, critical or unassigned work.</span>
            </div>
          )}
        </div>

        <div className="decision-brief">
          <div className="column-heading">
            <span className="mini-label">Meeting prompts</span>
            <strong>Questions to ask</strong>
          </div>
          <ul>
            <li>Who owns each unassigned activity before the next update?</li>
            <li>Which open constraints require escalation today?</li>
            <li>Which commitments are at risk of being missed?</li>
            <li>Are any blockers likely to create an EWN, CE, or Clause 32 update?</li>
            <li>What information is still missing before reports can be trusted?</li>
          </ul>
          {missingInfo.length ? (
            <div className="missing-callout">
              <strong>Missing setup inputs</strong>
              <span>{missingInfo.join(", ")}</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function PlanningFiltersBar({
  areaOptions,
  filters,
  filteredCount,
  ownerOptions,
  setFilters,
  statusOptions,
  totalCount,
  onReset
}: {
  areaOptions: string[];
  filters: PlanningFilters;
  filteredCount: number;
  ownerOptions: string[];
  setFilters: (filters: PlanningFilters) => void;
  statusOptions: string[];
  totalCount: number;
  onReset: () => void;
}) {
  return (
    <div className="planning-filters">
      <div>
        <span className="mini-label">Planning filters</span>
        <strong>{filteredCount} of {totalCount} visible</strong>
      </div>
      <input
        placeholder="Search activity, owner, area, status"
        value={filters.search}
        onChange={(event) => setFilters({ ...filters, search: event.target.value })}
      />
      <select value={filters.owner} onChange={(event) => setFilters({ ...filters, owner: event.target.value })}>
        <option>All</option>
        {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
      </select>
      <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
        <option>All</option>
        {statusOptions.map((status) => <option key={status}>{status}</option>)}
      </select>
      <select value={filters.area} onChange={(event) => setFilters({ ...filters, area: event.target.value })}>
        <option>All</option>
        {areaOptions.map((area) => <option key={area}>{area}</option>)}
      </select>
      <button className="ghost-button compact" type="button" onClick={onReset}>Clear</button>
    </div>
  );
}

function AddActivityPanel({
  activity,
  ownerOptions,
  setActivity,
  onAdd
}: {
  activity: NewActivityDraft;
  ownerOptions: string[];
  setActivity: (activity: NewActivityDraft) => void;
  onAdd: () => void;
}) {
  return (
    <div className="add-activity-panel">
      <div>
        <span className="mini-label">Add activity</span>
        <strong>Create an additional look-ahead activity</strong>
      </div>
      <input
        placeholder="Activity title"
        value={activity.title}
        onChange={(event) => setActivity({ ...activity, title: event.target.value })}
      />
      <select value={activity.owner} onChange={(event) => setActivity({ ...activity, owner: event.target.value })}>
        {ownerOptions.map((owner) => (
          <option key={owner}>{owner}</option>
        ))}
      </select>
      <input
        placeholder="Area"
        value={activity.area}
        onChange={(event) => setActivity({ ...activity, area: event.target.value })}
      />
      <input
        placeholder="Start e.g. 24 Mar"
        value={activity.start}
        onChange={(event) => setActivity({ ...activity, start: event.target.value })}
      />
      <input
        placeholder="Finish e.g. 25 Mar"
        value={activity.finish}
        onChange={(event) => setActivity({ ...activity, finish: event.target.value })}
      />
      <select value={activity.status} onChange={(event) => setActivity({ ...activity, status: event.target.value })}>
        {["Planned", "Critical", "At risk", "Blocked", "Complete"].map((status) => (
          <option key={status}>{status}</option>
        ))}
      </select>
      <button className="primary-button compact" type="button" onClick={onAdd}>
        Add to Plan
      </button>
    </div>
  );
}

function ScheduleAdherencePanel({
  adherence
}: {
  adherence: { total: number; completed: number; blocked: number; atRisk: number; unassigned: number; late: number; score: number };
}) {
  return (
    <div className="adherence-panel">
      <div>
        <span className="mini-label">Schedule adherence</span>
        <strong>{adherence.score}%</strong>
        <small>{adherence.completed} complete from {adherence.total} planned in window</small>
      </div>
      <div className="adherence-metrics">
        <span>{adherence.blocked} blocked</span>
        <span>{adherence.atRisk} at risk</span>
        <span>{adherence.unassigned} unassigned</span>
        <span>{adherence.late} late</span>
      </div>
    </div>
  );
}

function BulkPlanningActions({
  bulkDraft,
  ownerOptions,
  selectedCount,
  setBulkDraft,
  onApply,
  onClear
}: {
  bulkDraft: BulkPlanningDraft;
  ownerOptions: string[];
  selectedCount: number;
  setBulkDraft: (draft: BulkPlanningDraft) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <div className={selectedCount ? "bulk-actions active" : "bulk-actions"}>
      <div>
        <span className="mini-label">Bulk planning</span>
        <strong>{selectedCount} selected</strong>
      </div>
      <select value={bulkDraft.owner} onChange={(event) => setBulkDraft({ ...bulkDraft, owner: event.target.value })}>
        <option>Keep</option>
        {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
      </select>
      <select value={bulkDraft.status} onChange={(event) => setBulkDraft({ ...bulkDraft, status: event.target.value })}>
        {["Keep", "Planned", "In progress", "At risk", "Blocked", "Complete"].map((status) => <option key={status}>{status}</option>)}
      </select>
      <input value={bulkDraft.startDate} onChange={(event) => setBulkDraft({ ...bulkDraft, startDate: event.target.value })} type="date" />
      <button className="primary-button compact" type="button" onClick={onApply}>Apply</button>
      <button className="ghost-button compact" type="button" onClick={onClear}>Clear</button>
    </div>
  );
}

function BoardView({
  activities,
  ownerOptions,
  planDates,
  selectedActivityIds,
  onSchedule,
  onSelect,
  onUpdate
}: {
  activities: PlanningActivity[];
  ownerOptions: string[];
  planDates: Array<{ iso: string; label: string; day: string }>;
  selectedActivityIds: string[];
  onSchedule: (id: string, startDate: string) => void;
  onSelect: (id: string) => void;
  onUpdate: (id: string, field: keyof PlanningActivity, value: string) => void;
}) {
  const visibleDates = planDates.slice(0, Math.min(planDates.length, 10));
  const unplanned = activities.filter((activity) => activity.owner === "Unassigned" || !activity.startDate || activity.start === "To plan");

  return (
    <div className="board-grid">
      <div className="unplanned-column">
        <strong>Unplanned</strong>
        {unplanned.length ? (
          unplanned.map((activity) => (
            <ActivityTile
              activity={activity}
              isSelected={selectedActivityIds.includes(activity.id)}
              key={activity.id}
              ownerOptions={ownerOptions}
              onSelect={onSelect}
              onUpdate={onUpdate}
            />
          ))
        ) : (
          <small className="empty-state">No unplanned activities</small>
        )}
      </div>
      {visibleDates.map((date) => {
        const dayActivities = activities.filter((activity) => activity.startDate === date.iso || activity.finishDate === date.iso);
        return (
        <div
          className="day-column planned-day"
          key={date.iso}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            const id = event.dataTransfer.getData("text/plain");
            if (id) onSchedule(id, date.iso);
          }}
        >
          <div>
            <strong>{date.day}</strong>
            <span>{date.label}</span>
          </div>
          <small>{dayActivities.length} activities</small>
          <div className="day-stack">
            {dayActivities.map((activity) => (
              <ActivityTile
                activity={activity}
                compact
                isSelected={selectedActivityIds.includes(activity.id)}
                key={`${date.iso}-${activity.id}`}
                ownerOptions={ownerOptions}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            ))}
          </div>
          <em>Drop activity here</em>
        </div>
      )})}
    </div>
  );
}

function GanttView({ activities }: { activities: PlanningActivity[] }) {
  return (
    <div className="mini-gantt">
      <div className="gantt-scale">
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      {activities.map((activity, index) => (
        <div className="gantt-row" key={activity.id}>
          <div>
            <strong>{activity.id}</strong>
            <span>{activity.title}</span>
          </div>
          <i style={{ marginLeft: `${index * 13}%`, width: `${18 + index * 6}%` }} />
        </div>
      ))}
    </div>
  );
}

function AreaView({ activities }: { activities: PlanningActivity[] }) {
  const areas = Array.from(
    activities.reduce((map, activity) => {
      const area = activity.area || "Unmapped";
      map.set(area, (map.get(area) || 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([name, count]) => ({ name, count, status: count > 3 ? "High load" : "Ready" }));

  return (
    <div className="area-map">
      {areas.map((area) => (
        <article key={area.name}>
          <strong>{area.name}</strong>
          <span>{area.count} activities</span>
          <small>{area.status}</small>
        </article>
      ))}
    </div>
  );
}

function ListView({
  activities,
  ownerOptions,
  selectedActivityIds,
  onSelect,
  onUpdate
}: {
  activities: PlanningActivity[];
  ownerOptions: string[];
  selectedActivityIds: string[];
  onSelect: (id: string) => void;
  onUpdate: (id: string, field: keyof PlanningActivity, value: string) => void;
}) {
  return (
    <div className="plan-list">
      <div className="plan-list-head">
        <span>Activity</span>
        <span>Owner</span>
        <span>Area</span>
        <span>Start</span>
        <span>Finish</span>
        <span>Status</span>
      </div>
      {activities.map((activity) => (
        <div className="plan-list-row" key={activity.id}>
          <strong>
            <input checked={selectedActivityIds.includes(activity.id)} onChange={() => onSelect(activity.id)} type="checkbox" />
            {activity.id} - {activity.title}
          </strong>
          <select value={activity.owner} onChange={(event) => onUpdate(activity.id, "owner", event.target.value)}>
            {ownerOptions.map((owner) => (
              <option key={owner}>{owner}</option>
            ))}
          </select>
          <span>{activity.area}</span>
          <span>{activity.start}</span>
          <span>{activity.finish}</span>
          <select value={activity.status} onChange={(event) => onUpdate(activity.id, "status", event.target.value)}>
            {["Planned", "Critical", "At risk", "Blocked", "Complete"].map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

function PeopleResourcePanel({
  people,
  newPerson,
  setNewPerson,
  onAdd,
  planningActivities
}: {
  people: ResourcePerson[];
  newPerson: {
    name: string;
    role: string;
    discipline: string;
    dailyCapacity: string;
    availability: string;
  };
  setNewPerson: (person: {
    name: string;
    role: string;
    discipline: string;
    dailyCapacity: string;
    availability: string;
  }) => void;
  onAdd: () => void;
  planningActivities: PlanningActivity[];
}) {
  return (
    <>
      <div className="people-add-row">
        <input
          placeholder="Name"
          value={newPerson.name}
          onChange={(event) => setNewPerson({ ...newPerson, name: event.target.value })}
        />
        <select value={newPerson.role} onChange={(event) => setNewPerson({ ...newPerson, role: event.target.value })}>
          {["Owner", "Planner", "Commercial", "Supervisor", "Engineer", "Manager"].map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>
        <select value={newPerson.discipline} onChange={(event) => setNewPerson({ ...newPerson, discipline: event.target.value })}>
          {["Design", "EC&I", "Mechanical", "Procurement", "Manufacture", "Site", "Handover", "Commercial"].map((discipline) => (
            <option key={discipline}>{discipline}</option>
          ))}
        </select>
        <input
          placeholder="Daily capacity"
          value={newPerson.dailyCapacity}
          onChange={(event) => setNewPerson({ ...newPerson, dailyCapacity: event.target.value })}
        />
        <select value={newPerson.availability} onChange={(event) => setNewPerson({ ...newPerson, availability: event.target.value })}>
          {["Available", "Limited", "Unavailable"].map((availability) => (
            <option key={availability}>{availability}</option>
          ))}
        </select>
        <button className="primary-button compact" type="button" onClick={onAdd}>
          Add Person
        </button>
      </div>

      <div className="people-grid">
        {people.map((person) => {
          const assignedCount = planningActivities.filter((activity) => activity.owner === person.name).length;
          return (
            <article className="person-card" key={person.id}>
              <div>
                <strong>{person.name}</strong>
                <span>{person.role} | {person.discipline}</span>
              </div>
              <div className="person-metrics">
                <small>{assignedCount} assigned</small>
                <small>{person.dailyCapacity}/day capacity</small>
                <small>{person.availability}</small>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function MyWorkPanel({
  actions,
  commitments,
  constraints,
  ownerOptions,
  planningActivities,
  selectedWorker,
  setSelectedWorker,
  onActionStatus,
  onActivityStatus
}: {
  actions: DailyAction[];
  commitments: CommitmentItem[];
  constraints: ConstraintItem[];
  ownerOptions: string[];
  planningActivities: PlanningActivity[];
  selectedWorker: string;
  setSelectedWorker: (worker: string) => void;
  onActionStatus: (id: string, status: string) => void;
  onActivityStatus: (id: string, status: string) => void;
}) {
  const workerActivities = planningActivities.filter((activity) => activity.owner === selectedWorker);
  const activeActivities = workerActivities.filter((activity) => activity.status !== "Complete");
  const workerActions = actions.filter((action) => action.owner === selectedWorker && action.status !== "Closed");
  const workerConstraints = constraints.filter((constraint) => constraint.owner === selectedWorker && constraint.status !== "Closed");
  const workerCommitments = commitments.filter((commitment) => commitment.owner === selectedWorker && commitment.status === "Promised");

  return (
    <>
      <div className="my-work-toolbar">
        <label>
          <span>Choose owner</span>
          <select value={selectedWorker} onChange={(event) => setSelectedWorker(event.target.value)}>
            {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
          </select>
        </label>
        <div className="work-summary">
          <span><strong>{activeActivities.length}</strong> live activities</span>
          <span><strong>{workerConstraints.length}</strong> constraints</span>
          <span><strong>{workerActions.length}</strong> actions</span>
          <span><strong>{workerCommitments.length}</strong> commitments</span>
        </div>
      </div>

      <div className="my-work-grid">
        <div className="work-column large">
          <div className="column-heading">
            <span className="mini-label">Activity queue</span>
            <strong>What {selectedWorker} needs to move</strong>
          </div>
          {workerActivities.length ? (
            workerActivities.map((activity) => {
              const linkedConstraints = constraints.filter((constraint) => constraint.activityId === activity.id && constraint.status !== "Closed");
              return (
                <article className={`work-card ${activity.status.toLowerCase().replace(/\s+/g, "-")}`} key={activity.id}>
                  <div>
                    <span>{activity.id} | {activity.area}</span>
                    <strong>{activity.title}</strong>
                    <small>{activity.start} to {activity.finish} | {activity.source}</small>
                  </div>
                  <div className="work-card-status">
                    <span>{activity.status}</span>
                    {linkedConstraints.length ? <em>{linkedConstraints.length} open constraint</em> : <em>Clear to progress</em>}
                  </div>
                  <div className="work-card-actions">
                    {["In progress", "At risk", "Blocked", "Complete"].map((status) => (
                      <button key={status} type="button" onClick={() => onActivityStatus(activity.id, status)}>
                        {status}
                      </button>
                    ))}
                  </div>
                </article>
              );
            })
          ) : (
            <div className="empty-panel">
              <strong>No assigned activities</strong>
              <span>Select another owner or allocate work from the planning board.</span>
            </div>
          )}
        </div>

        <div className="work-column">
          <div className="column-heading">
            <span className="mini-label">Promises and actions</span>
            <strong>Today&apos;s follow-up</strong>
          </div>
          {[...workerCommitments, ...workerActions].length ? (
            <>
              {workerCommitments.map((commitment) => (
                <article className="mini-work-item" key={commitment.id}>
                  <strong>{commitment.title}</strong>
                  <span>{commitment.due} | {commitment.linkedActivity}</span>
                </article>
              ))}
              {workerActions.map((action) => (
                <article className="mini-work-item" key={action.id}>
                  <strong>{action.title}</strong>
                  <span>{action.due} | {action.linkedActivity}</span>
                  <button type="button" onClick={() => onActionStatus(action.id, "Closed")}>Close</button>
                </article>
              ))}
            </>
          ) : (
            <div className="empty-panel compact-empty">
              <strong>No open follow-ups</strong>
              <span>Use Meeting Mode to add owner actions.</span>
            </div>
          )}

          <div className="column-heading second">
            <span className="mini-label">Constraints</span>
            <strong>Items blocking this owner</strong>
          </div>
          {workerConstraints.length ? (
            workerConstraints.map((constraint) => (
              <article className="mini-work-item blocker-item" key={constraint.id}>
                <strong>{constraint.title}</strong>
                <span>{constraint.activityId} | {constraint.type} | due {constraint.due}</span>
              </article>
            ))
          ) : (
            <div className="empty-panel compact-empty">
              <strong>No owner constraints</strong>
              <span>No intervention is required at present.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CommitmentsPanel({
  commitments,
  newCommitment,
  ownerOptions,
  planningActivities,
  setNewCommitment,
  onAdd,
  onStatus
}: {
  commitments: CommitmentItem[];
  newCommitment: { title: string; owner: string; due: string; status: string; linkedActivity: string };
  ownerOptions: string[];
  planningActivities: PlanningActivity[];
  setNewCommitment: (commitment: { title: string; owner: string; due: string; status: string; linkedActivity: string }) => void;
  onAdd: () => void;
  onStatus: (id: string, status: string) => void;
}) {
  return (
    <>
      <div className="commitment-add-row">
        <input
          placeholder="Commitment made in the meeting"
          value={newCommitment.title}
          onChange={(event) => setNewCommitment({ ...newCommitment, title: event.target.value })}
        />
        <select value={newCommitment.owner} onChange={(event) => setNewCommitment({ ...newCommitment, owner: event.target.value })}>
          {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
        </select>
        <input
          placeholder="Due"
          value={newCommitment.due}
          onChange={(event) => setNewCommitment({ ...newCommitment, due: event.target.value })}
        />
        <select value={newCommitment.linkedActivity} onChange={(event) => setNewCommitment({ ...newCommitment, linkedActivity: event.target.value })}>
          <option value="">Link activity</option>
          {planningActivities.map((activity) => <option key={activity.id} value={activity.id}>{activity.id}</option>)}
        </select>
        <button className="primary-button compact" type="button" onClick={onAdd}>Add</button>
      </div>
      <div className="commitment-list">
        {commitments.map((commitment) => (
          <article className={`delivery-card ${commitment.status.toLowerCase()}`} key={commitment.id}>
            <div>
              <strong>{commitment.title}</strong>
              <span>{commitment.owner} | {commitment.due} | {commitment.linkedActivity}</span>
            </div>
            <div className="delivery-actions">
              <small>{commitment.status}</small>
              <button type="button" onClick={() => onStatus(commitment.id, "Met")}>Met</button>
              <button type="button" onClick={() => onStatus(commitment.id, "Missed")}>Missed</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function HandoffsPanel({
  handoffs,
  newHandoff,
  ownerOptions,
  planningActivities,
  setNewHandoff,
  onAdd,
  onStatus
}: {
  handoffs: HandoffItem[];
  newHandoff: { title: string; fromOwner: string; toOwner: string; due: string; status: string; linkedActivity: string };
  ownerOptions: string[];
  planningActivities: PlanningActivity[];
  setNewHandoff: (handoff: { title: string; fromOwner: string; toOwner: string; due: string; status: string; linkedActivity: string }) => void;
  onAdd: () => void;
  onStatus: (id: string, status: string) => void;
}) {
  return (
    <>
      <div className="handoff-add-row">
        <input
          placeholder="Handoff / interface"
          value={newHandoff.title}
          onChange={(event) => setNewHandoff({ ...newHandoff, title: event.target.value })}
        />
        <select value={newHandoff.fromOwner} onChange={(event) => setNewHandoff({ ...newHandoff, fromOwner: event.target.value })}>
          {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
        </select>
        <select value={newHandoff.toOwner} onChange={(event) => setNewHandoff({ ...newHandoff, toOwner: event.target.value })}>
          {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
        </select>
        <input
          placeholder="Due"
          value={newHandoff.due}
          onChange={(event) => setNewHandoff({ ...newHandoff, due: event.target.value })}
        />
        <select value={newHandoff.linkedActivity} onChange={(event) => setNewHandoff({ ...newHandoff, linkedActivity: event.target.value })}>
          <option value="">Link activity</option>
          {planningActivities.map((activity) => <option key={activity.id} value={activity.id}>{activity.id}</option>)}
        </select>
        <button className="primary-button compact" type="button" onClick={onAdd}>Add</button>
      </div>
      <div className="handoff-timeline">
        {handoffs.map((handoff) => (
          <article className={`delivery-card ${handoff.status.toLowerCase()}`} key={handoff.id}>
            <div>
              <strong>{handoff.title}</strong>
              <span>{handoff.fromOwner} to {handoff.toOwner} | {handoff.due} | {handoff.linkedActivity}</span>
            </div>
            <div className="delivery-actions">
              <small>{handoff.status}</small>
              <button type="button" onClick={() => onStatus(handoff.id, "Accepted")}>Accept</button>
              <button type="button" onClick={() => onStatus(handoff.id, "Blocked")}>Block</button>
              <button type="button" onClick={() => onStatus(handoff.id, "Complete")}>Complete</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function CommercialRegisterPanel({
  commercialRecords,
  newRecord,
  ownerOptions,
  planningActivities,
  setNewRecord,
  onAdd,
  onStatus
}: {
  commercialRecords: CommercialRecord[];
  newRecord: {
    type: CommercialRecord["type"];
    reference: string;
    title: string;
    owner: string;
    status: string;
    due: string;
    linkedActivity: string;
  };
  ownerOptions: string[];
  planningActivities: PlanningActivity[];
  setNewRecord: (record: {
    type: CommercialRecord["type"];
    reference: string;
    title: string;
    owner: string;
    status: string;
    due: string;
    linkedActivity: string;
  }) => void;
  onAdd: () => void;
  onStatus: (id: string, status: string) => void;
}) {
  const grouped = ["EWN", "CE", "PMI", "Clause 32"].map((type) => ({
    type,
    count: commercialRecords.filter((record) => record.type === type && record.status !== "Closed").length
  }));

  return (
    <>
      <div className="register-grid">
        {grouped.map((item) => (
          <div className="register-tile" key={item.type}>
            <strong>{item.type}</strong>
            <span>{item.count} open records</span>
          </div>
        ))}
      </div>

      <div className="commercial-add-row">
        <select value={newRecord.type} onChange={(event) => setNewRecord({ ...newRecord, type: event.target.value as CommercialRecord["type"] })}>
          {["EWN", "CE", "PMI", "Clause 32"].map((type) => <option key={type}>{type}</option>)}
        </select>
        <input
          placeholder="Reference"
          value={newRecord.reference}
          onChange={(event) => setNewRecord({ ...newRecord, reference: event.target.value })}
        />
        <input
          placeholder="Title / reason"
          value={newRecord.title}
          onChange={(event) => setNewRecord({ ...newRecord, title: event.target.value })}
        />
        <select value={newRecord.owner} onChange={(event) => setNewRecord({ ...newRecord, owner: event.target.value })}>
          {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
        </select>
        <input
          placeholder="Due"
          value={newRecord.due}
          onChange={(event) => setNewRecord({ ...newRecord, due: event.target.value })}
        />
        <select value={newRecord.linkedActivity} onChange={(event) => setNewRecord({ ...newRecord, linkedActivity: event.target.value })}>
          <option value="">Link activity</option>
          {planningActivities.map((activity) => <option key={activity.id} value={activity.id}>{activity.id}</option>)}
        </select>
        <button className="primary-button compact" type="button" onClick={onAdd}>Add</button>
      </div>

      <div className="commercial-list">
        {commercialRecords.map((record) => (
          <article className={`commercial-card ${record.type.toLowerCase().replace(/\s+/g, "-")}`} key={record.id}>
            <div>
              <span>{record.type} | {record.reference}</span>
              <strong>{record.title}</strong>
              <small>{record.owner} | Due {record.due} | {record.linkedActivity}</small>
            </div>
            <div className="delivery-actions">
              <small>{record.status}</small>
              <button type="button" onClick={() => onStatus(record.id, "Issued")}>Issued</button>
              <button type="button" onClick={() => onStatus(record.id, "Accepted")}>Accepted</button>
              <button type="button" onClick={() => onStatus(record.id, "Closed")}>Close</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function MeetingModePanel({
  actions,
  constraints,
  fieldUpdate,
  newAction,
  ownerOptions,
  planningActivities,
  setFieldUpdate,
  setNewAction,
  onAddAction,
  onSubmitUpdate
}: {
  actions: DailyAction[];
  constraints: ConstraintItem[];
  fieldUpdate: { activityId: string; status: string; note: string };
  newAction: { title: string; owner: string; due: string; status: string; linkedActivity: string };
  ownerOptions: string[];
  planningActivities: PlanningActivity[];
  setFieldUpdate: (update: { activityId: string; status: string; note: string }) => void;
  setNewAction: (action: { title: string; owner: string; due: string; status: string; linkedActivity: string }) => void;
  onAddAction: () => void;
  onSubmitUpdate: () => void;
}) {
  const openActions = actions.filter((action) => action.status !== "Closed");
  const openConstraints = constraints.filter((constraint) => constraint.status !== "Closed");

  return (
    <>
      <div className="coordination-list">
        <article>
          <strong>{openActions.length}</strong>
          <div>
            <span>Open actions</span>
            <small>Actions agreed in the daily planning conversation</small>
          </div>
        </article>
        <article>
          <strong>{openConstraints.length}</strong>
          <div>
            <span>Open constraints</span>
            <small>Items stopping or threatening planned work</small>
          </div>
        </article>
        <article>
          <strong>{planningActivities.filter((activity) => activity.owner === "Unassigned").length}</strong>
          <div>
            <span>Unassigned</span>
            <small>Activities requiring an owner before the plan is credible</small>
          </div>
        </article>
      </div>

      <div className="meeting-form">
        <h3>Add meeting action</h3>
        <input
          placeholder="Action"
          value={newAction.title}
          onChange={(event) => setNewAction({ ...newAction, title: event.target.value })}
        />
        <select value={newAction.owner} onChange={(event) => setNewAction({ ...newAction, owner: event.target.value })}>
          {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
        </select>
        <input
          placeholder="Due"
          value={newAction.due}
          onChange={(event) => setNewAction({ ...newAction, due: event.target.value })}
        />
        <select value={newAction.linkedActivity} onChange={(event) => setNewAction({ ...newAction, linkedActivity: event.target.value })}>
          <option value="">Link activity</option>
          {planningActivities.map((activity) => <option key={activity.id} value={activity.id}>{activity.id}</option>)}
        </select>
        <button className="primary-button compact" type="button" onClick={onAddAction}>Add Action</button>
      </div>

      <div className="meeting-form mobile-update-form">
        <h3>Mobile-style activity update</h3>
        <select value={fieldUpdate.activityId} onChange={(event) => setFieldUpdate({ ...fieldUpdate, activityId: event.target.value })}>
          <option value="">Select activity</option>
          {planningActivities.map((activity) => <option key={activity.id} value={activity.id}>{activity.id} - {activity.title}</option>)}
        </select>
        <select value={fieldUpdate.status} onChange={(event) => setFieldUpdate({ ...fieldUpdate, status: event.target.value })}>
          {["Planned", "In progress", "At risk", "Blocked", "Complete"].map((status) => <option key={status}>{status}</option>)}
        </select>
        <input
          placeholder="Short update note"
          value={fieldUpdate.note}
          onChange={(event) => setFieldUpdate({ ...fieldUpdate, note: event.target.value })}
        />
        <button className="ghost-button compact" type="button" onClick={onSubmitUpdate}>Record Update</button>
      </div>

      <div className="action-list">
        {openActions.slice(0, 4).map((action) => (
          <article key={action.id}>
            <strong>{action.title}</strong>
            <span>{action.owner} | {action.due} | {action.linkedActivity}</span>
          </article>
        ))}
      </div>
    </>
  );
}

function ConstraintsPanel({
  constraints,
  newConstraint,
  ownerOptions,
  planningActivities,
  setNewConstraint,
  onAdd,
  onClose
}: {
  constraints: ConstraintItem[];
  newConstraint: { activityId: string; title: string; type: string; owner: string; due: string; status: string };
  ownerOptions: string[];
  planningActivities: PlanningActivity[];
  setNewConstraint: (constraint: { activityId: string; title: string; type: string; owner: string; due: string; status: string }) => void;
  onAdd: () => void;
  onClose: (id: string) => void;
}) {
  return (
    <>
      <div className="constraint-add-row">
        <select value={newConstraint.activityId} onChange={(event) => setNewConstraint({ ...newConstraint, activityId: event.target.value })}>
          <option value="">Link activity</option>
          {planningActivities.map((activity) => <option key={activity.id} value={activity.id}>{activity.id}</option>)}
        </select>
        <input
          placeholder="Constraint / blocker"
          value={newConstraint.title}
          onChange={(event) => setNewConstraint({ ...newConstraint, title: event.target.value })}
        />
        <select value={newConstraint.type} onChange={(event) => setNewConstraint({ ...newConstraint, type: event.target.value })}>
          {["Design", "Access", "Procurement", "Permit", "Interface", "Information", "Resource"].map((type) => <option key={type}>{type}</option>)}
        </select>
        <select value={newConstraint.owner} onChange={(event) => setNewConstraint({ ...newConstraint, owner: event.target.value })}>
          {ownerOptions.map((owner) => <option key={owner}>{owner}</option>)}
        </select>
        <input
          placeholder="Due"
          value={newConstraint.due}
          onChange={(event) => setNewConstraint({ ...newConstraint, due: event.target.value })}
        />
        <button className="primary-button compact" type="button" onClick={onAdd}>Add Constraint</button>
      </div>
      <div className="constraint-grid">
        {constraints.map((constraint) => (
          <article key={constraint.id}>
            <div>
              <strong>{constraint.title}</strong>
              <span>{constraint.activityId} | {constraint.type}</span>
            </div>
            <div className="constraint-footer">
              <small>{constraint.owner} | Due {constraint.due} | {constraint.status}</small>
              {constraint.status !== "Closed" ? (
                <button type="button" onClick={() => onClose(constraint.id)}>Close</button>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function AuditTrail({ events }: { events: AuditEvent[] }) {
  return (
    <div className="audit-trail">
      <div className="panel-header compact-header">
        <div>
          <span className="mini-label">Audit trail</span>
          <h2>Recent Changes</h2>
        </div>
        <span className="status-pill blue">{events.length} events</span>
      </div>
      <div className="audit-list">
        {events.slice(0, 8).map((event) => (
          <article key={event.id}>
            <strong>{event.action}</strong>
            <span>{event.detail}</span>
            <small>{event.when}</small>
          </article>
        ))}
      </div>
    </div>
  );
}

function ActivityTile({
  activity,
  isSelected,
  ownerOptions,
  onSelect,
  onUpdate,
  compact
}: {
  activity: PlanningActivity;
  isSelected: boolean;
  ownerOptions: string[];
  onSelect: (id: string) => void;
  onUpdate: (id: string, field: keyof PlanningActivity, value: string) => void;
  compact?: boolean;
}) {
  return (
    <article
      className={`${compact ? "activity-tile compact-tile" : "activity-tile"}${isSelected ? " selected" : ""}`}
      draggable
      onDragStart={(event) => event.dataTransfer.setData("text/plain", activity.id)}
    >
      <label className="tile-selector">
        <input checked={isSelected} onChange={() => onSelect(activity.id)} type="checkbox" />
        <span>{activity.id} | {activity.source}</span>
      </label>
      <strong>{activity.title}</strong>
      <small>{activity.start} to {activity.finish} | {activity.area} | {activity.status}</small>
      {activity.totalFloatDays != null || activity.percentComplete != null ? (
        <small>{activity.percentComplete != null ? `${activity.percentComplete}%` : ""}{activity.percentComplete != null && activity.totalFloatDays != null ? " | " : ""}{activity.totalFloatDays != null ? `${activity.totalFloatDays}d float` : ""}</small>
      ) : null}
      <select value={activity.owner} onChange={(event) => onUpdate(activity.id, "owner", event.target.value)}>
        {ownerOptions.map((owner) => (
          <option key={owner}>{owner}</option>
        ))}
      </select>
    </article>
  );
}
