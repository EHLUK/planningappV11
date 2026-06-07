:root {
  --black: #000000;
  --white: #ffffff;
  --navy: #1a2d4e;
  --navy-2: #10213a;
  --blue: #2e7bbf;
  --blue-2: #006ba6;
  --light-blue: #00b5e2;
  --paper: #f4f6f9;
  --surface: #ffffff;
  --surface-2: #eaf2f8;
  --text: #333333;
  --muted: #6d7f98;
  --border: #d8e4f1;
  --green: #2e7d32;
  --red: #c62828;
  --amber: #f57c00;
  --shadow: 0 18px 50px rgba(26, 45, 78, 0.12);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--text);
  background: var(--paper);
  font-family: Arial, Helvetica, sans-serif;
}

button,
input {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 284px minmax(0, 1fr);
  background:
    linear-gradient(90deg, rgba(26, 45, 78, 0.04), transparent 32%),
    var(--paper);
}

.side-nav {
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 28px;
  padding: 24px 18px;
  background: var(--navy-2);
  color: var(--white);
  border-right: 4px solid var(--light-blue);
}

.brand-lockup {
  display: flex;
  gap: 14px;
  align-items: center;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}

.brand-card {
  width: 58px;
  min-width: 58px;
  height: 48px;
  display: grid;
  place-items: center;
  align-content: center;
  background: var(--white);
  color: var(--navy);
  line-height: 1;
  text-transform: lowercase;
}

.brand-card img {
  width: 48px;
  height: auto;
  display: block;
}

.brand-card span {
  font-size: 10px;
  font-weight: 700;
}

.brand-card strong {
  font-size: 8px;
  letter-spacing: 0;
}

.brand-lockup > div:last-child strong,
.brand-lockup > div:last-child small {
  display: block;
}

.brand-lockup > div:last-child strong {
  font-size: 15px;
  line-height: 1.25;
}

.brand-lockup > div:last-child small {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
  line-height: 1.4;
}

.main-nav {
  display: grid;
  gap: 6px;
  align-content: start;
}

.main-nav button {
  display: block;
  width: 100%;
  border: 0;
  border-left: 3px solid transparent;
  padding: 11px 12px;
  color: rgba(255, 255, 255, 0.72);
  background: transparent;
  text-decoration: none;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.main-nav button:hover,
.main-nav button.active {
  color: var(--white);
  background: rgba(255, 255, 255, 0.08);
  border-left-color: var(--light-blue);
}

.side-footer {
  border: 1px solid rgba(255, 255, 255, 0.16);
  padding: 14px;
  background: rgba(255, 255, 255, 0.06);
}

.side-footer span,
.side-footer strong,
.side-footer small {
  display: block;
}

.side-footer span {
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.side-footer strong {
  margin-top: 8px;
  font-size: 14px;
}

.side-footer small {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.7);
}

.workspace {
  min-width: 0;
  padding: 26px;
}

.top-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;
}

.eyebrow,
.mini-label {
  margin: 0;
  color: var(--blue);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  max-width: 920px;
  margin-bottom: 9px;
  color: var(--navy);
  font-size: clamp(30px, 3vw, 44px);
  font-weight: 400;
  line-height: 1.08;
}

h2 {
  margin: 5px 0 0;
  color: var(--navy);
  font-size: 17px;
  line-height: 1.25;
}

.hero-copy {
  max-width: 860px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.55;
}

.hero-logo {
  display: block;
  width: 132px;
  height: auto;
  margin: 4px 0 14px;
}

.top-actions,
.contract-meta,
.segmented,
.metric-tags,
.view-switch,
.plan-toolbar,
.date-navigator {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.primary-button,
.ghost-button,
.icon-button,
.segmented button,
.view-switch button,
.date-navigator button,
.stepper button,
.upload-button,
.text-button {
  min-height: 36px;
  border-radius: 6px;
  border: 1px solid var(--border);
  padding: 0 14px;
  color: var(--navy);
  background: var(--white);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.primary-button {
  border-color: var(--blue);
  background: var(--blue);
  color: var(--white);
  box-shadow: 0 10px 22px rgba(46, 123, 191, 0.2);
}

.ghost-button:hover,
.icon-button:hover,
.segmented button:hover,
.view-switch button:hover,
.stepper button:hover,
.upload-button:hover {
  border-color: var(--blue);
  color: var(--blue);
}

.compact {
  min-height: 32px;
}

.contract-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
  padding: 15px 18px;
  border: 1px solid var(--border);
  border-left: 5px solid var(--light-blue);
  background: var(--surface);
  box-shadow: 0 8px 26px rgba(26, 45, 78, 0.08);
}

.contract-picker {
  display: grid;
  gap: 7px;
  min-width: min(520px, 100%);
}

.contract-picker select {
  min-height: 40px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 12px;
  color: var(--navy);
  background: var(--white);
  font-size: 14px;
  font-weight: 800;
}

.contract-strip strong,
.contract-strip small {
  display: block;
}

.contract-strip strong {
  margin-top: 4px;
  color: var(--navy);
  font-size: 18px;
}

.contract-strip small {
  margin-top: 4px;
  color: var(--muted);
}

.contract-meta span,
.status-pill {
  display: inline-flex;
  align-items: center;
  min-height: 25px;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 10px;
  background: var(--white);
  color: var(--muted);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.status-pill.green {
  border-color: rgba(46, 125, 50, 0.24);
  color: var(--green);
  background: rgba(46, 125, 50, 0.08);
}

.status-pill.blue {
  border-color: rgba(46, 123, 191, 0.26);
  color: var(--blue);
  background: rgba(46, 123, 191, 0.08);
}

.status-pill.amber {
  border-color: rgba(245, 124, 0, 0.28);
  color: var(--amber);
  background: rgba(245, 124, 0, 0.08);
}

.status-pill.red {
  border-color: rgba(198, 40, 40, 0.28);
  color: var(--red);
  background: rgba(198, 40, 40, 0.08);
}

.kpi-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.kpi-card,
.panel,
.module-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  box-shadow: var(--shadow);
}

.kpi-card {
  min-height: 122px;
  padding: 18px;
  border-top: 4px solid var(--blue);
}

.kpi-card span,
.kpi-card strong,
.kpi-card small {
  display: block;
}

.kpi-card span {
  color: var(--navy);
  font-size: 32px;
  font-weight: 800;
  line-height: 1;
}

.kpi-card strong {
  margin-top: 13px;
  color: var(--navy);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.kpi-card small {
  margin-top: 8px;
  color: var(--muted);
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.module-card {
  min-height: 245px;
  display: grid;
  align-content: start;
  gap: 15px;
  padding: 18px;
  border-top: 4px solid var(--light-blue);
}

.module-card-top,
.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.module-card p {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

.metric-tags small {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 9px;
  color: var(--navy);
  background: var(--surface-2);
  font-size: 11px;
  font-weight: 800;
}

.command-panel {
  margin-bottom: 16px;
  border-top: 4px solid var(--navy);
}

.command-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.command-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;
}

.command-grid article {
  min-height: 96px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  background: #f8fbfe;
}

.command-grid span,
.command-grid strong,
.command-grid small {
  display: block;
}

.command-grid span {
  color: var(--navy);
  font-size: 26px;
  font-weight: 900;
  line-height: 1;
}

.command-grid strong {
  margin-top: 10px;
  color: var(--navy);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.command-grid small {
  margin-top: 7px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.35;
}

.priority-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr);
  gap: 14px;
  margin-top: 14px;
}

.priority-list,
.decision-brief {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  background: #eef7fc;
}

.priority-list {
  background: #f8fbfe;
}

.priority-item {
  display: grid;
  grid-template-columns: 34px 1fr;
  gap: 10px;
  align-items: start;
  margin-top: 10px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--amber);
  border-radius: 8px;
  padding: 11px;
  background: var(--white);
}

.priority-item > span {
  display: grid;
  place-items: center;
  min-height: 30px;
  border-radius: 6px;
  color: var(--white);
  background: var(--navy);
  font-size: 13px;
  font-weight: 900;
}

.priority-item strong,
.priority-item small,
.priority-item em {
  display: block;
}

.priority-item strong {
  color: var(--navy);
  font-size: 13px;
  line-height: 1.35;
}

.priority-item small {
  margin-top: 5px;
  color: var(--muted);
  font-size: 11px;
}

.priority-item em {
  width: fit-content;
  margin-top: 8px;
  border-radius: 999px;
  padding: 5px 8px;
  color: var(--blue);
  background: rgba(46, 123, 191, 0.1);
  font-size: 11px;
  font-style: normal;
  font-weight: 900;
}

.decision-brief ul {
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--navy);
}

.decision-brief li {
  margin-bottom: 9px;
  color: var(--navy);
  font-size: 12px;
  line-height: 1.45;
}

.missing-callout {
  display: grid;
  gap: 6px;
  margin-top: 14px;
  border-left: 4px solid var(--amber);
  border-radius: 6px;
  padding: 11px;
  background: var(--white);
}

.missing-callout strong {
  color: var(--navy);
  font-size: 12px;
}

.missing-callout span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
}

.two-column,
.planning-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.65fr);
  gap: 16px;
  margin-bottom: 16px;
}

.panel {
  padding: 20px;
}

.panel-header {
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border);
}

.setup-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px;
  margin-top: 16px;
}

.setup-form label {
  display: grid;
  gap: 6px;
}

.wide-field {
  grid-column: 1 / -1;
}

.setup-form label span {
  color: var(--muted);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.setup-form input {
  width: 100%;
  min-height: 40px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 9px 10px;
  color: var(--text);
  background: var(--white);
  font-size: 13px;
}

.setup-form input:focus {
  border-color: var(--blue);
  outline: 3px solid rgba(46, 123, 191, 0.12);
}

.stepper {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  margin-top: 16px;
}

.stepper button {
  min-height: 34px;
  padding: 0 10px;
  background: var(--white);
  color: var(--muted);
  font-size: 11px;
}

.stepper button.active {
  border-color: var(--blue);
  background: var(--blue);
  color: var(--white);
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.check-list {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.check-row {
  display: grid;
  grid-template-columns: 62px 1fr;
  gap: 10px;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px;
  background: #f8fbfe;
}

.check-row span {
  display: inline-grid;
  place-items: center;
  min-height: 24px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 900;
}

.check-row strong {
  color: var(--navy);
  font-size: 13px;
}

.check-row.pass span {
  color: var(--green);
  background: rgba(46, 125, 50, 0.1);
}

.check-row.fail span {
  color: var(--amber);
  background: rgba(245, 124, 0, 0.1);
}

.contract-list {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.contract-card {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 13px;
  background: linear-gradient(180deg, var(--white), #f8fbfe);
}

.contract-card strong,
.contract-card small {
  display: block;
}

.contract-card strong {
  color: var(--navy);
  font-size: 13px;
}

.contract-card small {
  margin-top: 5px;
  color: var(--muted);
  font-size: 12px;
}

.contract-card span {
  color: var(--green);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.programme-panel,
.reports-panel,
.admin-panel,
.people-panel,
.constraints-panel {
  margin-bottom: 16px;
}

.source-grid,
.report-grid,
.register-grid,
.build-status,
.people-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
  margin-top: 16px;
}

.source-card,
.report-card,
.register-tile,
.build-status div,
.person-card {
  min-height: 122px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 15px;
  background: #f8fbfe;
}

.source-card span {
  color: var(--blue);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.source-card strong,
.source-card small,
.report-card strong,
.report-card small,
.register-tile strong,
.register-tile span,
.build-status strong,
.build-status span {
  display: block;
}

.source-card strong,
.report-card strong,
.register-tile strong,
.build-status strong,
.person-card strong {
  margin-top: 8px;
  color: var(--navy);
  font-size: 14px;
}

.source-card p {
  margin: 9px 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
}

.source-card small,
.report-card small,
.build-status span,
.person-card span,
.person-card small {
  color: var(--muted);
  font-size: 12px;
}

.people-add-row {
  display: grid;
  grid-template-columns: minmax(180px, 1.4fr) repeat(4, minmax(130px, 1fr)) auto;
  gap: 8px;
  align-items: end;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
  overflow-x: auto;
}

.people-add-row input,
.people-add-row select,
.meeting-form input,
.meeting-form select,
.constraint-add-row input,
.constraint-add-row select {
  min-height: 34px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 9px;
  color: var(--navy);
  background: var(--white);
  font-size: 12px;
  font-weight: 800;
}

.person-card {
  display: grid;
  gap: 12px;
  align-content: start;
  border-top: 4px solid var(--light-blue);
}

.person-card strong,
.person-card span {
  display: block;
}

.person-card span {
  margin-top: 5px;
}

.person-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.person-metrics small {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 5px 8px;
  background: var(--white);
  font-weight: 800;
}

.source-card.loaded {
  border-color: rgba(46, 125, 50, 0.28);
  border-top: 4px solid var(--green);
}

.source-status {
  display: grid;
  gap: 6px;
  margin-top: 10px;
}

.upload-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 32px;
  margin-top: 8px;
  border-color: var(--blue);
  color: var(--blue);
  background: var(--white);
}

.upload-button input {
  display: none;
}

.text-button {
  width: fit-content;
  min-height: 26px;
  border: 0;
  padding: 0;
  color: var(--red);
  background: transparent;
}

.planning-board {
  overflow: hidden;
}

.segmented {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 3px;
  background: var(--surface-2);
}

.segmented button {
  min-height: 28px;
  border: 0;
  background: transparent;
}

.segmented button.active {
  background: var(--blue);
  color: var(--white);
}

.plan-toolbar {
  justify-content: flex-end;
}

.date-navigator {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 3px;
  background: var(--white);
}

.date-navigator button {
  min-height: 28px;
  border: 0;
  background: transparent;
  color: var(--muted);
}

.date-navigator input {
  min-height: 28px;
  border: 0;
  border-radius: 5px;
  padding: 0 8px;
  color: var(--navy);
  background: var(--surface-2);
  font-size: 11px;
  font-weight: 900;
}

.view-switch {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 3px;
  background: var(--white);
}

.view-switch button {
  min-height: 28px;
  border: 0;
  background: transparent;
  color: var(--muted);
}

.view-switch button.active {
  background: var(--navy);
  color: var(--white);
}

.board-grid {
  display: grid;
  grid-template-columns: 230px;
  grid-auto-columns: minmax(160px, 1fr);
  grid-auto-flow: column;
  gap: 10px;
  margin-top: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.add-activity-panel {
  display: grid;
  grid-template-columns: minmax(210px, 1.2fr) minmax(220px, 1.5fr) repeat(5, minmax(110px, 1fr)) auto;
  gap: 8px;
  align-items: end;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
  overflow-x: auto;
}

.planning-filters {
  display: grid;
  grid-template-columns: minmax(160px, 0.8fr) minmax(260px, 1.4fr) repeat(3, minmax(120px, 0.8fr)) auto;
  gap: 8px;
  align-items: end;
  margin-top: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: var(--white);
}

.planning-filters > div strong {
  display: block;
  margin-top: 4px;
  color: var(--navy);
  font-size: 13px;
}

.planning-filters input,
.planning-filters select {
  min-height: 34px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 9px;
  color: var(--navy);
  background: #f8fbfe;
  font-size: 12px;
  font-weight: 800;
}

.planning-filters input:focus,
.planning-filters select:focus {
  border-color: var(--blue);
  outline: 3px solid rgba(46, 123, 191, 0.12);
}

.add-activity-panel > div strong {
  display: block;
  margin-top: 4px;
  color: var(--navy);
  font-size: 13px;
}

.adherence-panel,
.bulk-actions {
  display: grid;
  gap: 10px;
  margin-top: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
}

.adherence-panel {
  grid-template-columns: minmax(160px, 0.6fr) minmax(0, 1.4fr);
  align-items: center;
}

.adherence-panel strong {
  display: block;
  margin-top: 5px;
  color: var(--navy);
  font-size: 28px;
  line-height: 1;
}

.adherence-panel small {
  display: block;
  margin-top: 7px;
  color: var(--muted);
  font-size: 12px;
}

.adherence-metrics {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.adherence-metrics span {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 10px;
  color: var(--navy);
  background: var(--white);
  font-size: 12px;
  font-weight: 900;
}

.bulk-actions {
  grid-template-columns: minmax(130px, 0.8fr) repeat(3, minmax(120px, 1fr)) auto auto;
  align-items: end;
  opacity: 0.72;
}

.bulk-actions.active {
  border-color: rgba(46, 123, 191, 0.34);
  background: rgba(46, 123, 191, 0.08);
  opacity: 1;
}

.bulk-actions strong {
  display: block;
  margin-top: 4px;
  color: var(--navy);
  font-size: 13px;
}

.bulk-actions input,
.bulk-actions select,
.commercial-add-row input,
.commercial-add-row select {
  min-height: 34px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 9px;
  color: var(--navy);
  background: var(--white);
  font-size: 12px;
  font-weight: 800;
}

.add-activity-panel input,
.add-activity-panel select,
.activity-tile select,
.plan-list-row select {
  min-height: 34px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 9px;
  color: var(--navy);
  background: var(--white);
  font-size: 12px;
  font-weight: 800;
}

.unplanned-column,
.day-column {
  min-height: 310px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #eef7fc;
  padding: 12px;
}

.unplanned-column {
  background: #e8f1f8;
}

.unplanned-column > strong {
  display: block;
  margin-bottom: 10px;
  color: var(--navy);
  font-size: 13px;
}

.activity-tile {
  border-left: 4px solid var(--red);
  border-radius: 8px;
  padding: 11px;
  margin-bottom: 10px;
  background: var(--white);
  box-shadow: 0 8px 18px rgba(26, 45, 78, 0.08);
}

.activity-tile.selected {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(46, 123, 191, 0.13), 0 8px 18px rgba(26, 45, 78, 0.08);
}

.tile-selector {
  display: flex;
  align-items: center;
  gap: 7px;
}

.tile-selector input,
.plan-list-row input[type="checkbox"] {
  width: 15px;
  height: 15px;
  accent-color: var(--blue);
}

.activity-tile span,
.activity-tile strong,
.activity-tile small {
  display: block;
}

.activity-tile span {
  color: var(--blue);
  font-size: 11px;
  font-weight: 800;
}

.activity-tile strong {
  margin-top: 7px;
  color: var(--black);
  font-size: 13px;
  line-height: 1.35;
}

.activity-tile small {
  margin-top: 9px;
  color: var(--muted);
  font-size: 11px;
}

.activity-tile select {
  width: 100%;
  margin-top: 9px;
}

.compact-tile {
  padding: 9px;
  margin-bottom: 0;
}

.compact-tile strong {
  font-size: 11px;
}

.compact-tile small {
  font-size: 10px;
}

.day-column {
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 12px;
}

.day-column div strong,
.day-column div span,
.day-column small,
.day-column em {
  display: block;
}

.day-column div strong {
  color: var(--navy);
  font-size: 13px;
}

.day-column div span,
.day-column small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 12px;
}

.day-column em {
  align-self: end;
  border-top: 1px solid var(--border);
  padding-top: 10px;
  color: var(--blue);
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
}

.day-stack {
  display: grid;
  gap: 8px;
  align-content: start;
}

.empty-state {
  display: block;
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 12px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  font-weight: 800;
}

.load-list {
  display: grid;
  gap: 14px;
  margin-top: 16px;
}

.missing-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.missing-list span {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 10px;
  color: var(--navy);
  background: var(--surface-2);
  font-size: 12px;
  font-weight: 800;
}

.load-row {
  display: grid;
  grid-template-columns: 96px 1fr 24px;
  gap: 10px;
  align-items: center;
}

.load-row span,
.load-row strong {
  color: var(--navy);
  font-size: 12px;
  font-weight: 800;
}

.load-row div {
  height: 9px;
  border-radius: 999px;
  background: var(--surface-2);
  overflow: hidden;
}

.load-row i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--light-blue);
}

.mini-gantt {
  display: grid;
  gap: 10px;
  margin-top: 16px;
  min-width: 720px;
  overflow-x: auto;
}

.gantt-scale {
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  gap: 8px;
  padding-left: 210px;
}

.gantt-scale span {
  color: var(--muted);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.gantt-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 10px;
  align-items: center;
  min-height: 50px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px;
  background: #f8fbfe;
}

.gantt-row strong,
.gantt-row span {
  display: block;
}

.gantt-row strong {
  color: var(--blue);
  font-size: 11px;
}

.gantt-row span {
  margin-top: 4px;
  color: var(--navy);
  font-size: 12px;
  font-weight: 800;
}

.gantt-row i {
  display: block;
  height: 18px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--blue), var(--light-blue));
}

.area-map {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.area-map article {
  min-height: 128px;
  border: 1px solid var(--border);
  border-left: 5px solid var(--light-blue);
  border-radius: 8px;
  padding: 14px;
  background: #f8fbfe;
}

.area-map strong,
.area-map span,
.area-map small {
  display: block;
}

.area-map strong {
  color: var(--navy);
  font-size: 16px;
}

.area-map span {
  margin-top: 12px;
  color: var(--blue);
  font-size: 22px;
  font-weight: 900;
}

.area-map small {
  margin-top: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 800;
}

.plan-list {
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: auto;
}

.plan-list-head,
.plan-list-row {
  display: grid;
  grid-template-columns: minmax(260px, 2fr) repeat(5, minmax(100px, 1fr));
  gap: 10px;
  align-items: center;
  min-width: 900px;
  padding: 11px 12px;
}

.plan-list-head {
  background: var(--surface-2);
  color: var(--muted);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.plan-list-row {
  border-top: 1px solid var(--border);
  background: var(--white);
  color: var(--muted);
  font-size: 12px;
}

.plan-list-row select {
  width: 100%;
}

.plan-list-row strong {
  color: var(--navy);
}

.plan-list-row em {
  width: fit-content;
  border-radius: 999px;
  padding: 5px 9px;
  color: var(--blue);
  background: rgba(46, 123, 191, 0.09);
  font-style: normal;
  font-weight: 900;
}

.coordination-list {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.coordination-list article {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 12px;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
}

.coordination-list article > strong {
  display: grid;
  place-items: center;
  min-height: 44px;
  border-radius: 8px;
  color: var(--white);
  background: var(--blue);
  font-size: 20px;
}

.coordination-list span,
.coordination-list small {
  display: block;
}

.coordination-list span {
  color: var(--navy);
  font-size: 13px;
  font-weight: 900;
}

.coordination-list small {
  margin-top: 4px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.35;
}

.meeting-form,
.constraint-add-row {
  display: grid;
  gap: 8px;
  margin-top: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
}

.meeting-form h3 {
  margin: 0;
  color: var(--navy);
  font-size: 13px;
}

.action-list,
.constraint-grid,
.audit-list {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.action-list article,
.constraint-grid article,
.audit-list article {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 11px;
  background: var(--white);
}

.action-list strong,
.action-list span,
.constraint-grid strong,
.constraint-grid span,
.constraint-grid small,
.audit-list strong,
.audit-list span,
.audit-list small {
  display: block;
}

.action-list strong,
.constraint-grid strong,
.audit-list strong {
  color: var(--navy);
  font-size: 13px;
}

.action-list span,
.constraint-grid span,
.constraint-grid small,
.audit-list span,
.audit-list small {
  margin-top: 5px;
  color: var(--muted);
  font-size: 11px;
}

.constraint-add-row {
  grid-template-columns: minmax(120px, 0.8fr) minmax(260px, 1.6fr) repeat(3, minmax(130px, 1fr)) auto;
  align-items: end;
  overflow-x: auto;
}

.constraint-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.constraint-grid article {
  border-left: 4px solid var(--amber);
}

.constraint-footer,
.delivery-actions,
.work-card-actions,
.work-summary {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.constraint-footer {
  justify-content: space-between;
  margin-top: 8px;
}

.constraint-footer button,
.delivery-actions button,
.work-card-actions button,
.mini-work-item button {
  min-height: 28px;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 0 10px;
  color: var(--navy);
  background: var(--white);
  font-size: 11px;
  font-weight: 900;
  cursor: pointer;
}

.constraint-footer button:hover,
.delivery-actions button:hover,
.work-card-actions button:hover,
.mini-work-item button:hover {
  border-color: var(--blue);
  color: var(--blue);
}

.my-work-panel,
.delivery-grid {
  margin-bottom: 16px;
}

.my-work-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
}

.my-work-toolbar label {
  display: grid;
  gap: 6px;
  min-width: 260px;
}

.my-work-toolbar label span {
  color: var(--muted);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.my-work-toolbar select,
.commitment-add-row input,
.commitment-add-row select,
.handoff-add-row input,
.handoff-add-row select {
  min-height: 34px;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0 9px;
  color: var(--navy);
  background: var(--white);
  font-size: 12px;
  font-weight: 800;
}

.work-summary {
  justify-content: flex-end;
}

.work-summary span {
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 7px 10px;
  color: var(--muted);
  background: var(--white);
  font-size: 12px;
  font-weight: 800;
}

.work-summary strong {
  color: var(--navy);
}

.my-work-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(330px, 0.6fr);
  gap: 14px;
  margin-top: 14px;
}

.work-column {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 14px;
  background: #eef7fc;
}

.work-column.large {
  background: #f8fbfe;
}

.column-heading {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.column-heading strong {
  color: var(--navy);
  font-size: 13px;
}

.column-heading.second {
  margin-top: 18px;
}

.work-card,
.mini-work-item,
.delivery-card {
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  border-radius: 8px;
  padding: 12px;
  background: var(--white);
  box-shadow: 0 8px 20px rgba(26, 45, 78, 0.06);
}

.work-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  margin-top: 10px;
}

.work-card.blocked,
.delivery-card.missed,
.delivery-card.blocked {
  border-left-color: var(--red);
}

.work-card.at-risk,
.work-card.critical,
.delivery-card.promised,
.delivery-card.pending {
  border-left-color: var(--amber);
}

.work-card.complete,
.delivery-card.met,
.delivery-card.accepted,
.delivery-card.complete {
  border-left-color: var(--green);
}

.work-card span,
.work-card strong,
.work-card small,
.work-card-status span,
.work-card-status em,
.mini-work-item strong,
.mini-work-item span,
.delivery-card strong,
.delivery-card span,
.delivery-card small {
  display: block;
}

.work-card span,
.mini-work-item span,
.delivery-card span {
  color: var(--muted);
  font-size: 11px;
}

.work-card strong,
.mini-work-item strong,
.delivery-card strong {
  margin-top: 5px;
  color: var(--navy);
  font-size: 13px;
  line-height: 1.35;
}

.work-card small {
  margin-top: 7px;
  color: var(--muted);
  font-size: 11px;
}

.work-card-status {
  min-width: 132px;
  text-align: right;
}

.work-card-status span {
  color: var(--navy);
  font-size: 12px;
  font-weight: 900;
}

.work-card-status em {
  margin-top: 6px;
  color: var(--blue);
  font-size: 11px;
  font-style: normal;
  font-weight: 800;
}

.work-card-actions {
  grid-column: 1 / -1;
}

.mini-work-item {
  display: grid;
  gap: 7px;
  margin-top: 10px;
}

.blocker-item {
  border-left-color: var(--red);
}

.empty-panel {
  display: grid;
  gap: 7px;
  margin-top: 10px;
  border: 1px dashed var(--border);
  border-radius: 8px;
  padding: 16px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.65);
}

.empty-panel strong {
  color: var(--navy);
  font-size: 13px;
}

.empty-panel span {
  font-size: 12px;
}

.compact-empty {
  padding: 12px;
}

.commitment-add-row,
.handoff-add-row {
  display: grid;
  gap: 8px;
  margin-top: 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
}

.commitment-add-row {
  grid-template-columns: minmax(180px, 1.5fr) minmax(120px, 0.9fr) minmax(90px, 0.7fr) minmax(120px, 0.9fr) auto;
}

.handoff-add-row {
  grid-template-columns: minmax(180px, 1.4fr) repeat(4, minmax(105px, 0.9fr)) auto;
}

.commitment-list,
.handoff-timeline {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.delivery-card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.delivery-actions {
  justify-content: flex-end;
}

.delivery-actions small {
  border-radius: 999px;
  padding: 6px 9px;
  color: var(--navy);
  background: var(--surface-2);
  font-weight: 900;
}

.audit-trail {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.compact-header {
  padding-bottom: 12px;
}

.panel-subsection {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.panel-subsection h3 {
  margin: 0;
  color: var(--navy);
  font-size: 14px;
}

.register-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.register-tile {
  min-height: 84px;
}

.register-tile span {
  margin-top: 10px;
  color: var(--muted);
  font-size: 12px;
}

.commercial-add-row {
  display: grid;
  grid-template-columns: minmax(90px, 0.6fr) minmax(100px, 0.7fr) minmax(180px, 1.4fr) repeat(3, minmax(110px, 0.8fr)) auto;
  gap: 8px;
  margin-top: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 12px;
  background: #f8fbfe;
  overflow-x: auto;
}

.commercial-list {
  display: grid;
  gap: 10px;
  margin-top: 14px;
}

.commercial-card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  border-radius: 8px;
  padding: 12px;
  background: var(--white);
}

.commercial-card.ewn {
  border-left-color: var(--amber);
}

.commercial-card.ce {
  border-left-color: var(--red);
}

.commercial-card.clause-32 {
  border-left-color: var(--green);
}

.commercial-card span,
.commercial-card strong,
.commercial-card small {
  display: block;
}

.commercial-card span {
  color: var(--blue);
  font-size: 11px;
  font-weight: 900;
}

.commercial-card strong {
  margin-top: 6px;
  color: var(--navy);
  font-size: 13px;
}

.commercial-card small {
  margin-top: 6px;
  color: var(--muted);
  font-size: 11px;
}

.discussion-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.discussion-list article {
  border-left: 4px solid var(--light-blue);
  padding-left: 12px;
}

.discussion-list strong {
  color: var(--navy);
  font-size: 13px;
}

.discussion-list p {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
}

.report-grid {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.report-card {
  min-height: 110px;
  border-top: 4px solid var(--blue);
}

.report-card.selectable {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 10px;
  align-content: start;
  cursor: pointer;
}

.report-card.selectable input {
  width: 16px;
  height: 16px;
  margin: 2px 0 0;
  accent-color: var(--blue);
}

.report-card strong {
  line-height: 1.35;
}

.report-card.selectable small {
  grid-column: 2;
}

.build-status {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.build-status div {
  min-height: 96px;
}

.toast {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 50;
  max-width: min(420px, calc(100vw - 44px));
  border-left: 5px solid var(--light-blue);
  border-radius: 8px;
  padding: 13px 16px;
  color: var(--navy);
  background: var(--white);
  box-shadow: 0 16px 40px rgba(26, 45, 78, 0.18);
  font-size: 13px;
  font-weight: 800;
}

@media (max-width: 1320px) {
  .module-grid,
  .report-grid,
  .command-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .side-nav {
    position: static;
    height: auto;
  }

  .main-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .top-bar,
  .contract-strip {
    flex-direction: column;
  }

  .kpi-row,
  .module-grid,
  .two-column,
  .planning-layout,
  .my-work-grid,
  .priority-layout,
  .source-grid,
  .report-grid,
  .register-grid,
  .build-status,
  .people-grid,
  .constraint-grid,
  .area-map,
  .setup-form,
  .planning-filters,
  .adherence-panel,
  .bulk-actions,
  .commercial-add-row,
  .stepper {
    grid-template-columns: 1fr;
  }

  .workspace {
    padding: 18px;
  }

  .my-work-toolbar,
  .delivery-card,
  .commercial-card,
  .command-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .adherence-metrics {
    justify-content: flex-start;
  }

  .commitment-add-row,
  .handoff-add-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .main-nav {
    grid-template-columns: 1fr;
  }

  .top-actions {
    width: 100%;
  }

  .top-actions button {
    flex: 1;
  }
}
