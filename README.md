# Config-Driven Angular Form (Mockoon Backend)

A tiny **config-driven** Angular app that renders a form from a JSON schema served by **Mockoon**.  
Kept intentionally simple: **one Angular component**, **three fields** (text, select, checkbox), and a submit that echoes your payload.

---

## Features
- Fetch schema from `GET /api/form-config`
- Render inputs dynamically (`text`, `select`, `checkbox`)
- Apply inline styles from schema (`styles`, `labelStyles`, `buttonStyles`)
- Submit to `POST /api/submit` and show server echo

---

## Prerequisites
- Node.js (LTS)
- Angular CLI (`npm i -g @angular/cli`)
- Mockoon (Desktop app) or Mockoon CLI

---

## Quick Start

### 1) Start Mockoon (Backend)
Create **two routes** in Mockoon and enable **CORS** (or add `Access-Control-Allow-Origin: *` to responses).

**Route A — GET `/api/form-config`**  
_Response body (3 fields):_
```json
{
  "title": "User Form",
  "buttonText": "Save",
  "buttonStyles": { "backgroundColor": "purple", "color": "white", "padding": "6px 12px" },
  "fields": [
    { "key": "name", "label": "Name", "type": "text", "placeholder": "Enter name", "required": true,
      "styles": { "padding": "6px", "border": "1px solid #d1d5db", "borderRadius": "6px" },
      "labelStyles": { "fontWeight": "600" } },
    { "key": "role", "label": "Role", "type": "select",
      "styles": { "padding": "6px", "border": "1px solid #d1d5db", "borderRadius": "6px" },
      "options": [
        { "label": "Engineer", "value": "eng" },
        { "label": "Manager",  "value": "mgr" }
      ] },
    { "key": "tos", "label": "Accept Terms", "type": "checkbox", "required": true }
  ]
}

### 2) Run the Angular App
bash
npm install
npm start
