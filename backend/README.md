# Invoice API Backend

REST API for Vue Invoice Management Application built with Node.js, Express, and MongoDB.

## Features

- ✅ User authentication with JWT
- ✅ Secure password hashing with bcrypt
- ✅ Full CRUD operations for invoices
- ✅ User-specific invoice management
- ✅ Rate limiting and security headers
- ✅ MongoDB with Mongoose ODM
- ✅ Input validation
- ✅ Error handling

## API Endpoints

### User Routes

#### Register User
```
POST /api/users/register
Body: { firstName, lastName, email, password }
```

#### Login User
```
POST /api/users/login
Body: { email, password }
```

#### Get Current User Profile
```
GET /api/users/me
Headers: { Authorization: "Bearer <token>" }
```

#### Update User Profile
```
PUT /api/users/me
Headers: { Authorization: "Bearer <token>" }
Body: { firstName, lastName }
```

#### Verify Token
```
POST /api/users/verify-token
Headers: { Authorization: "Bearer <token>" }
```

### Invoice Routes (All require authentication)

#### Get All Invoices
```
GET /api/invoices
GET /api/invoices?status=paid|pending|draft
Headers: { Authorization: "Bearer <token>" }
```

#### Get Single Invoice
```
GET /api/invoices/:invoiceId
Headers: { Authorization: "Bearer <token>" }
```

#### Create Invoice
```
POST /api/invoices
Headers: { Authorization: "Bearer <token>" }
Body: { invoice data }
```

#### Update Invoice
```
PUT /api/invoices/:invoiceId
Headers: { Authorization: "Bearer <token>" }
Body: { updated invoice data }
```

#### Delete Invoice
```
DELETE /api/invoices/:invoiceId
Headers: { Authorization: "Bearer <token>" }
```

#### Update Invoice Status
```
PATCH /api/invoices/:invoiceId/status
Headers: { Authorization: "Bearer <token>" }
Body: { status: "paid"|"pending"|"draft" }
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Edit `.env` file with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/invoice-app
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

3. Start MongoDB (if using local):
```bash
mongod
```

4. Run the server:
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

5. Server will start on `http://localhost:3001`

## MongoDB Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Testing the API

### Using curl:
```bash
# Health check
curl http://localhost:3001/api/health

# Register user
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

## Project Structure

```
backend/
├── models/
│   ├── User.js          # User schema
│   └── Invoice.js       # Invoice schema
├── routes/
│   ├── userRoutes.js    # User endpoints
│   └── invoiceRoutes.js # Invoice endpoints
├── middleware/
│   └── auth.js          # JWT authentication
├── .env                 # Environment variables
├── server.js            # Express server setup
└── package.json         # Dependencies
```

## Security Features

- Password hashing with bcrypt (12 salt rounds)
- JWT token-based authentication
- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Input validation
- MongoDB injection protection

## Development

```bash
# Install nodemon globally
npm install -g nodemon

# Run with auto-reload
npm run dev
```

## Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

### Deploy to Railway
1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

## License

MIT