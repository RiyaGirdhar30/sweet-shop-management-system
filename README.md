# Sweet Shop Management System

A full-stack Sweet Shop Management System built using **React**, **Node.js**, **Express**, and **MongoDB**.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Role-based access (Admin / User)

### Sweet Management
- View all sweets (public)
- Search sweets by name
- Admin can add and delete sweets
- Users can purchase sweets
- Quantity automatically decreases on purchase
- Purchase button disabled when out of stock

### Roles
- **Admin**
  - Add sweets
  - Delete sweets
- **User**
  - View sweets
  - Purchase sweets

## Tech Stack
- Frontend: React (SPA)
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Authentication: JWT

## How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```


Backend runs on http://localhost:5100
Frontend runs on http://localhost:3000

