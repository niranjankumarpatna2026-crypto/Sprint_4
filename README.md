# AI Cover Letter Generator

An AI-powered SaaS utility that generates personalized
professional cover letters using Google Gemini.

## Features

- Candidate information form
- Job role input
- Target company input
- Skills input
- Resume PDF upload
- PDF text extraction
- Gemini AI integration
- Prompt engineering
- Loading state
- Error handling
- Markdown rendering
- HTML sanitization
- Copy to Clipboard
- Environment variable security

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- marked
- DOMPurify

### Backend

- Node.js
- Express
- Multer
- pdf-parse
- Google Gemini API

## Architecture

React → Express → PDF Parser → Gemini API → React

## Environment Variables

Create:

server/.env

GEMINI_API_KEY=your_key
GEMINI_MODEL=gemini-3.7-flash

Never commit `.env`.

## Run Frontend

cd client
npm install
npm run dev

## Run Backend

cd server
npm install
npm run dev