# Project Orchestrator: GitHub Pseudo-Resume Builder

## Agent Workflow & Execution Order

When the user asks to create, update, or generate their GitHub front-page, portfolio site, or pseudo-resume webpage, execute the following two-stage pipeline in strict sequence:

### Stage 1: Resume Audit & Enrichment (`resume-professional`)
1. Activate the **`resume-professional`** skill first.
2. Inspect the user's provided resume, profile files, and disclosed projects against the Required Resume Checklist.
3. If required information or project details are missing, pause and ask the user to disclose them before proceeding to frontend generation.
4. Once complete, produce the verified, structured resume dataset containing all identity links, summary, categorized skills, experience, education, and user-disclosed projects.

### Stage 2: Frontend Generation (`github-pseudo-resume-frontend`)
1. Pass the verified, updated dataset from Stage 1 directly to the **`github-pseudo-resume-frontend`** skill.
2. Build the simple, AI-readable GitHub front-page (`index.html` and `styles.css`) strictly using only the verified information produced in Stage 1.
3. Enforce all formatting constraints:
   - Zero em-dashes or en-dashes anywhere in the code or copy.
   - Plain paragraph text is allowed only in the Summary section; all other sections must use structured HTML (lists, definition lists, tables, and JSON-LD metadata).

## Handoff Rules
- Never skip Stage 1 or generate frontend placeholder data when resume or project disclosures are incomplete.
- Keep `resume-professional` focused exclusively on data accuracy and completeness, and `github-pseudo-resume-frontend` focused exclusively on clean, structured HTML/CSS presentation.