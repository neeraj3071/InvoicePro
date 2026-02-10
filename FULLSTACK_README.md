# 🚀 Vue Invoice App - Full Stack Edition

A complete full-stack invoice management application with Vue.js frontend and Node.js + Express + MongoDB backend.

## 📋 Features

### Frontend (Vue.js)
- ✅ **Modern Landing Page** with professional design
- ✅ **User Authentication** (Login/Register)
- ✅ **Invoice Management** (Create, Read, Update, Delete)
- ✅ **Print Functionality** for professional invoices
- ✅ **Responsive Design** works on all devices
- ✅ **Real-time Updates** with Vuex state management

### Backend (Node.js + Express + MongoDB)
- ✅ **RESTful API** with JWT authentication
- ✅ **Secure Password Hashing** with bcrypt
- ✅ **User Management** with profile endpoints
- ✅ **Invoice CRUD Operations** (user-specific)
- ✅ **MongoDB Database** for data persistence
- ✅ **Rate Limiting** and security headers
- ✅ **Input Validation** and error handling

## 🏗️ Tech Stack

**Frontend:**
- Vue.js 3
- Vuex 4 (State Management)
- Vue Router 4
- Axios (HTTP Client)
- SCSS/Sass

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcrypt.js
- Helmet (Security)
- CORS

## 📂 Project Structure

```
vue-invoice-app-master/
├── src/                      # Vue frontend
│   ├── components/
│   ├── views/
│   ├── store/               # Vuex store
│   ├── services/
│   │   └── api.js          # Backend API client
│   ├── auth/
│   │   └── authService.js  # Authentication service
│   └── App.vue
│
├── backend/                 # Node.js backend
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Invoice.js      # Invoice schema
│   ├── routes/
│   │   ├── userRoutes.js   # User endpoints
│   │   └── invoiceRoutes.js # Invoice endpoints
│   ├── middleware/
│   │   └── auth.js         # JWT auth middleware
│   ├── server.js           # Express server
│   └── .env                # Environment config
│
├── public/
├── dist/                    # Production build
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/neeraj3071/InvoicePro.git
cd InvoicePro
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

4. **Configure environment variables:**

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/invoice-app
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

Create `.env.local` in the root directory:
```env
VUE_APP_API_URL=http://localhost:3001/api
```

### 🔥 Running the Application

#### Option 1: Run Both Servers Separately

**Terminal 1 - Backend API:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run serve
```
Frontend will run on `http://localhost:8080`

#### Option 2: Install MongoDB

**Local MongoDB:**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
```

**MongoDB Atlas (Cloud - Recommended):**
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

## 📡 API Endpoints

### User Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login user | No |
| GET | `/api/users/me` | Get current user profile | Yes |
| PUT | `/api/users/me` | Update user profile | Yes |
| POST | `/api/users/verify-token` | Verify JWT token | Yes |

### Invoice Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/invoices` | Get all user invoices | Yes |
| GET | `/api/invoices?status=paid` | Filter by status | Yes |
| GET | `/api/invoices/:invoiceId` | Get single invoice | Yes |
| POST | `/api/invoices` | Create new invoice | Yes |
| PUT | `/api/invoices/:invoiceId` | Update invoice | Yes |
| DELETE | `/api/invoices/:invoiceId` | Delete invoice | Yes |
| PATCH | `/api/invoices/:invoiceId/status` | Update invoice status | Yes |

### Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Check API status | No |

## 🧪 Testing the API

### Using curl:

**Register User:**
```bash
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Invoices (with token):**
```bash
curl -X GET http://localhost:3001/api/invoices \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🎨 Features Walkthrough

### 1. User Registration
- Navigate to `http://localhost:8080`
- Click "Get Started" or "Sign Up"
- Fill in registration form
- Create your account

### 2. Create Invoice
- After login, click "New Invoice"
- Fill in billing and client details
- Add invoice items
- Save as draft or mark as pending

### 3. Manage Invoices
- View all invoices on the dashboard
- Click on an invoice to view details
- Edit, delete, or update status
- Mark invoices as paid/pending

### 4. Print Invoice
- Open an invoice
- Click "Print Invoice" button
- Preview and print professional invoice

## 🔒 Security Features

- **Password Hashing:** bcrypt with 12 salt rounds
- **JWT Authentication:** Secure token-based auth
- **Rate Limiting:** 100 requests per 15 minutes
- **CORS Protection:** Configured for specific origins
- **Helmet.js:** Security headers enabled
- **Input Validation:** Mongoose schema validation
- **MongoDB Injection Protection:** Built-in with Mongoose

## 📦 Production Deployment

### Build Frontend:
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

### Deploy Backend:

**Heroku:**
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret
git push heroku main
```

**Railway/Render:**
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Deploy Frontend:

**GitHub Pages:**
```bash
npm run deploy
```

**Netlify/Vercel:**
1. Connect repository
2. Set build command: `NODE_OPTIONS=--openssl-legacy-provider npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VUE_APP_API_URL=your-backend-url`

## 🛠️ Development

### Frontend Development:
```bash
npm run serve
```

### Backend Development (with auto-reload):
```bash
cd backend
npm run dev
```

### Lint Fix:
```bash
npm run lint
```

## 📊 Database Schema

### User Schema:
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Invoice Schema:
```javascript
{
  invoiceId: String (unique),
  userId: ObjectId (ref: User),
  billerStreetAddress: String,
  billerCity: String,
  billerZipCode: String,
  billerState: String,
  billerCountry: String,
  clientName: String,
  clientEmail: String,
  clientStreetAddress: String,
  clientCity: String,
  clientZipCode: String,
  clientState: String,
  clientCountry: String,
  invoiceDate: String,
  invoiceDateUnix: Number,
  paymentTerms: String,
  paymentDueDate: String,
  paymentDueDateUnix: Number,
  productDescription: String,
  invoiceItemList: [{
    itemName: String,
    qty: Number,
    price: Number,
    total: Number
  }],
  invoiceTotal: Number,
  invoicePending: Boolean,
  invoiceDraft: Boolean,
  invoicePaid: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error:
```bash
# Start MongoDB service
brew services start mongodb-community

# Or use MongoDB Atlas connection string
```

### Port Already in Use:
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

### CORS Error:
- Check `FRONTEND_URL` in `backend/.env`
- Verify `VUE_APP_API_URL` in `.env.local`

### Authentication Issues:
- Clear browser localStorage
- Generate new JWT_SECRET
- Check token expiration in backend logs

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review the API documentation

## 🎯 Roadmap

- [ ] Email notifications for invoices
- [ ] PDF export functionality
- [ ] Multiple currency support
- [ ] Invoice templates
- [ ] Client management dashboard
- [ ] Payment gateway integration
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)

---

**Live Demo:** https://neeraj3071.github.io/InvoicePro/

**Built with ❤️ using Vue.js, Node.js, Express, and MongoDB**