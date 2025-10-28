# Money Tracker

A lightweight, single-page app to track earnings and spendings with charts and local persistence.

## Features
- Add income/expense with date, category, and note
- Filters: type, category, date range, search
- Pagination for transaction list
- LocalStorage persistence
- Export/Import JSON
- Sample data seeding
- Charts (Chart.js): Monthly Income vs Expense, Expense by Category

## Quick Start
1. Click "Seed Sample" to populate demo data (optional).
2. Add your transactions using the form.
3. Filter and browse the list; use Prev/Next for pagination.
4. Export data to JSON to back up; Import JSON to restore.

## Data & Privacy
- All data is stored locally in your browser via LocalStorage under key `money-tracker:v1`.
- Use "Reset" to clear all data.

## Tech Stack and framework used:
- TailwindCSS 
- Chart.js
- Vanilla JS, no build step required
