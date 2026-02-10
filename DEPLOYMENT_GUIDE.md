# Production Deployment Guide

## 🎯 Deploy Backend to Railway + MongoDB Atlas

### Step 1: Setup MongoDB Atlas (FREE Database)

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google/GitHub or email
   
2. **Create a FREE Cluster**
   - Choose "M0 Sandbox" (FREE forever)
   - Select a region close to you
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Configure Database Access**
   - Click "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `invoice_admin`
   - Password: Generate secure password (SAVE THIS!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Click "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for Railway deployment)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://invoice_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://invoice_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/invoice-app?retryWrites=true&w=majority`

---

### Step 2: Deploy Backend to Railway (FREE Hosting)

1. **Create Railway Account**
   - Go to: https://railway.app/
   - Click "Start a New Project"
   - Sign in with GitHub

2. **Deploy from GitHub**
   - Click "Deploy from GitHub repo"
   - Select your repository: `InvoicePro`
   - Railway will detect Node.js automatically

3. **Configure Root Directory**
   - Click on your deployment
   - Go to "Settings" tab
   - Set "Root Directory" to: `backend`
   - Click "Save"

4. **Add Environment Variables**
   - Click "Variables" tab
   - Add these variables:

   ```
   MONGODB_URI=mongodb+srv://invoice_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/invoice-app?retryWrites=true&w=majority
   
   JWT_SECRET=your-super-secret-production-key-min-32-chars
   
   JWT_EXPIRES_IN=7d
   
   PORT=3001
   
   NODE_ENV=production
   
   FRONTEND_URL=https://neeraj3071.github.io
   ```

5. **Deploy**
   - Railway will automatically deploy
   - Wait for deployment to complete (2-3 minutes)
   - Click on "Deployments" to see logs

6. **Get Your API URL**
   - Go to "Settings" tab
   - Click "Generate Domain"
   - Your API URL will be something like:
   ```
   https://invoicepro-production-xxxx.up.railway.app
   ```
   - SAVE THIS URL!

---

### Step 3: Update Frontend to Use Production API

1. **Update `.env.local` file:**
   ```env
   VUE_APP_API_URL=https://your-railway-url.up.railway.app/api
   ```

2. **Update `backend/.env`** to add production frontend:
   ```env
   PRODUCTION_FRONTEND_URL=https://neeraj3071.github.io/InvoicePro
   ```

3. **Update CORS in backend** (already configured in server.js):
   The backend will automatically allow your GitHub Pages frontend.

---

### Step 4: Test Production API

```bash
# Health check
curl https://your-railway-url.up.railway.app/api/health

# Register user
curl -X POST https://your-railway-url.up.railway.app/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"test123"}'
```

---

### Step 5: Rebuild and Deploy Frontend

```bash
# Update environment variable
echo "VUE_APP_API_URL=https://your-railway-url.up.railway.app/api" > .env.production

# Build with production API URL
NODE_OPTIONS=--openssl-legacy-provider npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## 🎉 That's It!

Your full-stack app is now live:
- **Frontend:** https://neeraj3071.github.io/InvoicePro/
- **Backend API:** https://your-railway-url.up.railway.app/api
- **Database:** MongoDB Atlas (Free Tier)

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 Sandbox | **FREE** |
| Railway | Hobby Plan | **$5/month** (500 hours) |
| GitHub Pages | Free | **FREE** |

**Total: $5/month or FREE if under Railway's free tier usage**

---

## 🔧 Alternative: Deploy to Render (100% FREE)

If you want completely free hosting:

1. **Go to:** https://render.com/
2. **Sign up and create new Web Service**
3. **Connect your GitHub repo**
4. **Configure:**
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add Environment Variables** (same as Railway)
6. **Deploy!**

Render's free tier:
- ✅ Completely FREE
- ⚠️ Spins down after 15 min of inactivity
- ⚠️ Cold starts (first request takes 30-60 seconds)

---

## 📊 Monitoring Your App

### Railway Dashboard
- View logs in real-time
- Monitor CPU/Memory usage
- Check deployment status

### MongoDB Atlas
- Monitor database queries
- Check storage usage
- View connection metrics

---

## 🐛 Troubleshooting

### Can't connect to MongoDB:
- Check IP whitelist (should be 0.0.0.0/0 for Railway)
- Verify password in connection string
- Check database user permissions

### CORS errors:
- Update `FRONTEND_URL` in Railway variables
- Ensure frontend URL is correct (with https://)
- Check browser console for exact error

### Railway deployment failed:
- Check logs in Railway dashboard
- Verify `package.json` has `start` script
- Ensure `ROOT_DIRECTORY` is set to `backend`

---

## 🔐 Security Checklist

- ✅ Strong JWT_SECRET (min 32 characters)
- ✅ MongoDB Atlas network access configured
- ✅ Database user with limited permissions
- ✅ Environment variables in Railway (not in code)
- ✅ CORS configured for specific origins
- ✅ Rate limiting enabled
- ✅ Helmet.js security headers

---

Need help with any step? Let me know!