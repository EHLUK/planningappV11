generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Contract {
  id              String   @id @default(cuid())
  name            String
  code            String
  client          String?
  contractor      String?
  necOption       String?
  startingDate    DateTime?
  completionDate  DateTime?
  reportingPeriod String?
  contractManager String?
  planner         String?
  commercialLead String?
  projectManager String?
  disciplines     String?
  areas           String?
  aiTone          String?
  reportBranding  String?
  status          String   @default("draft")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  users            ContractUser[]
  resources        ContractResource[]
  uploads          ProgrammeUpload[]
  keyDates         KeyDate[]
  planningUpdates  ActivityUpdate[]
  planningAssignments PlanningAssignment[]
  lookaheadActivities LookaheadActivity[]
  constraints      Constraint[]
  dailyActions     DailyAction[]
  commitments      Commitment[]
  handoffs         Handoff[]
  auditEvents      AuditEvent[]
  blockers         Blocker[]
  commercialRecords CommercialControlRecord[]
  compensationEvents CompensationEvent[]
  earlyWarnings    EarlyWarning[]
  reports          Report[]
  aiOutputs        AiOutput[]
}

model ContractUser {
  id         String   @id @default(cuid())
  contractId String
  name       String
  email      String?
  role       String?
  discipline String?
  active     Boolean  @default(true)
  createdAt  DateTime @default(now())

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model ContractResource {
  id            String   @id @default(cuid())
  contractId    String
  name          String
  role          String?
  discipline    String?
  dailyCapacity Float?
  availability  String   @default("Available")
  active        Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model ProgrammeUpload {
  id           String   @id @default(cuid())
  contractId   String
  fileName     String
  sourceType   String
  uploadType   ProgrammeUploadType
  dataDate     DateTime?
  plannedCompletion DateTime?
  sourceUri    String?
  uploadedBy   String?
  uploadedAt   DateTime @default(now())

  contract      Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
  activities    Activity[]
  relationships Relationship[]
  wbsCodes      WbsCode[]
}

model Activity {
  id             String   @id @default(cuid())
  uploadId       String
  activityCode   String
  name           String
  wbsCode        String?
  area           String?
  discipline     String?
  ownerName      String?
  startDate      DateTime?
  finishDate     DateTime?
  actualStart    DateTime?
  actualFinish   DateTime?
  percentComplete Float?
  durationDays   Float?
  totalFloatDays Float?
  isCritical     Boolean @default(false)
  isMilestone    Boolean @default(false)
  rawJson        Json?

  upload ProgrammeUpload @relation(fields: [uploadId], references: [id], onDelete: Cascade)
}

model Relationship {
  id             String @id @default(cuid())
  uploadId       String
  predecessorId  String
  successorId    String
  relationType   String
  lagDays        Float?

  upload ProgrammeUpload @relation(fields: [uploadId], references: [id], onDelete: Cascade)
}

model WbsCode {
  id       String @id @default(cuid())
  uploadId String
  code     String
  name     String?
  parentCode String?

  upload ProgrammeUpload @relation(fields: [uploadId], references: [id], onDelete: Cascade)
}

model KeyDate {
  id          String   @id @default(cuid())
  contractId  String
  name        String
  baselineDate DateTime?
  currentDate  DateTime?
  status       String?

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model PlanningAssignment {
  id           String   @id @default(cuid())
  contractId   String
  activityCode String
  ownerName    String?
  plannedDate  DateTime?
  plannedDays  Float?
  status       String   @default("planned")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model LookaheadActivity {
  id           String   @id @default(cuid())
  contractId   String
  activityCode String
  title        String
  ownerName    String?
  area         String?
  startLabel   String?
  finishLabel  String?
  status       String   @default("Planned")
  source       String   @default("Added")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model Constraint {
  id           String   @id @default(cuid())
  contractId   String
  activityCode String?
  title        String
  type         String?
  ownerName    String?
  dueLabel     String?
  status       String   @default("Open")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model DailyAction {
  id           String   @id @default(cuid())
  contractId   String
  title        String
  ownerName    String?
  dueLabel     String?
  status       String   @default("Open")
  activityCode String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model Commitment {
  id           String   @id @default(cuid())
  contractId   String
  title        String
  ownerName    String?
  dueLabel     String?
  status       String   @default("Promised")
  activityCode String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model Handoff {
  id           String   @id @default(cuid())
  contractId   String
  title        String
  fromOwner    String?
  toOwner      String?
  dueLabel     String?
  status       String   @default("Pending")
  activityCode String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model AuditEvent {
  id         String   @id @default(cuid())
  contractId String
  action     String
  detail     String
  createdAt  DateTime @default(now())

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model ActivityUpdate {
  id             String   @id @default(cuid())
  contractId     String
  activityCode   String
  statusFlag     String?
  percentComplete Float?
  note           String?
  forecastFinish DateTime?
  recordedBy     String?
  recordedAt     DateTime @default(now())

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model Blocker {
  id             String   @id @default(cuid())
  contractId     String
  activityCode   String
  reason         String
  action         String?
  ownerName      String?
  status         String   @default("open")
  createdAt      DateTime @default(now())
  closedAt       DateTime?

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model CommercialControlRecord {
  id           String   @id @default(cuid())
  contractId   String
  recordType   String
  reference    String
  title        String
  ownerName    String?
  status       String   @default("Draft")
  dueLabel     String?
  activityCode String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model CompensationEvent {
  id          String   @id @default(cuid())
  contractId  String
  reference   String
  title       String
  status      String
  timeImpactDays Float?
  description String?
  createdAt   DateTime @default(now())

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model EarlyWarning {
  id          String   @id @default(cuid())
  contractId  String
  reference   String
  title       String
  status      String
  description String?
  createdAt   DateTime @default(now())

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model Report {
  id          String   @id @default(cuid())
  contractId  String
  reportType  String
  title       String
  sourceUri   String?
  createdBy   String?
  createdAt   DateTime @default(now())

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

model AiOutput {
  id          String   @id @default(cuid())
  contractId  String
  feature     String
  promptHash  String?
  outputText  String
  createdBy   String?
  createdAt   DateTime @default(now())

  contract Contract @relation(fields: [contractId], references: [id], onDelete: Cascade)
}

enum ProgrammeUploadType {
  CURRENT
  PREVIOUS
  BASELINE
}
