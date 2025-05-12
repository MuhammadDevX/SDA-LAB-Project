# Personal Finance Management System (Frontend)

This is the Next.js frontend for the Personal Finance Management System.

## Features
- Dashboard with financial overview, charts, and recommendations
- Transactions: list, add, and categorize
- Goals: set and track financial goals
- Reports: interactive financial charts

## Tech Stack
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Recharts](https://recharts.org/) (for charts)

## Setup
```bash
cd frontend
npm install
npm run dev
```

## Backend Integration
Currently, the app uses hardcoded sample data. Once the Flask backend is ready, update the data fetching logic in the components/pages to use API calls.

## Project Structure
- `/components`: Reusable UI components
- `/pages`: Main pages (Dashboard, Transactions, Goals, Reports)
- `/styles`: Global styles

## To Do
- Integrate with Flask backend
- Add authentication (optional) 