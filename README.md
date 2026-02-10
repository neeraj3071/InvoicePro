# InvoicePro - Professional Invoice Management App

A modern, cloud-based invoice management application built with Vue.js 3 and Firebase, offering complete invoice lifecycle management with secure authentication, real-time data sync, and print functionality.

## ✨ Features

### 🔐 Firebase Authentication
- **User Registration** - Create new accounts with Firebase Authentication
- **Secure Login** - Email/password authentication with Firebase
- **Session Management** - Automatic authentication state persistence
- **User Profiles** - Display user information and manage accounts

### 📄 Invoice Management
- **Create Invoices** - Professional invoice creation with multiple items
- **Edit Invoices** - Modify existing invoices in real-time
- **Delete Invoices** - Remove unwanted invoices
- **Status Management** - Mark as Draft, Pending, or Paid
- **Invoice Filtering** - Filter by status (Draft, Pending, Paid)
- **User-Specific Data** - Each user sees only their own invoices

### 🖨️ Print Functionality
- **Print-Ready Design** - Clean, professional invoice printing
- **Automatic Element Hiding** - Removes UI elements during printing
- **Professional Layout** - Optimized for business use

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop and mobile
- **Clean Interface** - Professional and intuitive design
- **Landing Page** - Marketing page with call-to-action
- **Gradient Backgrounds** - Modern visual design

### ☁️ Cloud Storage
- **Firebase Firestore** - Real-time cloud database
- **Automatic Sync** - Changes sync across devices instantly
- **Secure & Scalable** - Enterprise-grade security
- **Free Tier** - Generous free usage limits

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/vue-invoice-app.git
cd vue-invoice-app-master
```

2. **Install dependencies**
```bash
npm install
```

3. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable **Authentication** → **Email/Password**
   - Create **Firestore Database** → Start in **test mode**
   - Copy your Firebase configuration

4. **Update Firebase Configuration**
   - Open `src/firebase/firebaseInit.js`
   - Replace the `firebaseConfig` with your credentials:
```javascript
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

5. **Start development server**
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run serve
```

6. **Open your browser**
Navigate to `http://localhost:8083`

### Build for Production

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 🔧 Technology Stack

- **Frontend Framework**: Vue.js 3
- **State Management**: Vuex 4
- **Routing**: Vue Router 4
- **Styling**: SCSS/Sass
- **Build Tool**: Vue CLI 4
- **Backend**: Firebase (Authentication + Firestore)
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Hosting**: Firebase Hosting (recommended)

## 📱 Deployment

### Deploy to Firebase Hosting (Recommended)

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase**
```bash
firebase init
```
   - Select **Hosting**
   - Choose your Firebase project
   - Set public directory to `dist`
   - Configure as single-page app: **Yes**
   - Don't overwrite `index.html`

4. **Build and Deploy**
```bash
npm run build
firebase deploy
```

### Other Deployment Options:
- **Netlify** - Connect GitHub repo for auto-deployment
- **Vercel** - Use Vercel CLI: `vercel --prod`
- **GitHub Pages** - Deploy from `dist` folder

## 🎯 Usage

### Getting Started
1. **Visit the landing page** and click "Get Started"
2. **Register** a new account (creates Firebase user)
3. **Login** with your credentials
4. **Create your first invoice** using the "New Invoice" button
5. **Manage your invoices** - edit, delete, or change status
6. **Print invoices** using the Print button on invoice details page

### Features Overview
- **Dashboard**: View all your invoices with filtering options
- **Invoice Creation**: Add multiple items, set due dates, client information
- **Status Management**: Track invoice lifecycle from draft to paid
- **Print Functionality**: Generate print-ready versions of invoices
- **Cloud Sync**: Access your invoices from any device

## 🔐 Security Features

- ✅ **Firebase Authentication** - Industry-standard security
- ✅ **Firestore Security Rules** - Database access control
- ✅ **Encrypted Data Transfer** - HTTPS by default
- ✅ **User Data Isolation** - Users can only access their own data
- ✅ **Email Normalization** - Consistent email handling

### Recommended Production Settings:
1. Update Firestore Security Rules (replace test mode):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /invoices/{invoice} {
      allow read, write: if request.auth != null && 
                          request.auth.uid == resource.data.userId;
    }
  }
}
```

2. Enable Firebase App Check for additional security
3. Set up proper error monitoring
4. Configure CORS if needed

## 💰 Firebase Free Tier

InvoicePro is designed to work within Firebase's generous free tier:

- **Authentication**: Unlimited users
- **Firestore**: 
  - 1GB storage
  - 50,000 reads/day
  - 20,000 writes/day
- **Hosting**: 10GB storage, 360MB/day transfer

Perfect for personal use or small businesses!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

If you have any questions or need support, please open an issue on GitHub.

## 🔗 Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Vue.js Documentation](https://vuejs.org/)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

---

**Built with ❤️ using Vue.js and Firebase**
