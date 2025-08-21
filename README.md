# Config-Driven Angular Form (with Mockoon API)

A tiny, **config-driven** Angular app that renders a form from a backend schema served by **Mockoon**.  
Kept intentionally simple: **one Angular component**, **three fields** (text, select, checkbox), and a submit that echoes your payload.

---

## Features

- Fetches form schema from `GET /api/form-config`
- Renders inputs dynamically (supports `text`, `select`, `checkbox`)
- Applies inline styles from the schema (`styles`, `labelStyles`, `buttonStyles`)
- Submits to `POST /api/submit` and shows the server echo

---

## Prerequisites

- Node.js (LTS)
- Angular CLI: `npm i -g @angular/cli`
- Mockoon (Desktop app) — or the Mockoon CLI

---

## Quick Start

### 1) Create the Angular app

```bash
ng new config-driven --standalone --style=css --routing=false
cd config-driven
npm i
