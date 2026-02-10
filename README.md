# InvoicePro - Professional Invoice Management App

A modern, full-featured invoice management application built with Vue.js 3, offering complete invoice lifecycle management with user authentication, print functionality, and responsive design.

## ✨ Features

### 🔐 Authentication System
- **User Registration** - Create new accounts with profile information
- **Secure Login** - Email/password authentication
- **Session Management** - Persistent login state with localStorage
- **User Profiles** - Display user initials and information

### 📄 Invoice Management
- **Create Invoices** - Professional invoice creation with multiple items
- **Edit Invoices** - Modify existing invoices
- **Delete Invoices** - Remove unwanted invoices
- **Status Management** - Mark as Draft, Pending, or Paid
- **Invoice Filtering** - Filter by status (Draft, Pending, Paid)

### 🖨️ Print Functionality
- **Print-Ready Design** - Clean, professional invoice printing
- **Automatic Element Hiding** - Removes UI elements during printing
- **Professional Layout** - Optimized for business use

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop and mobile
- **Clean Interface** - Professional and intuitive design
- **Landing Page** - Marketing page with call-to-action
- **Gradient Backgrounds** - Modern visual design

### 💾 Data Storage
- **localStorage Integration** - Local data persistence
- **User-Specific Data** - Each user has isolated invoice data
- **No Backend Required** - Fully client-side application

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/neeraj3071/InvoicePro.git
cd InvoicePro
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run serve
```

4. **Open your browser**
Navigate to `http://localhost:8080`

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
- **Authentication**: Custom localStorage-based system
- **Data Storage**: Browser localStorage

## 📱 Deployment

This application can be deployed to various platforms:

### Recommended Options:
- **Netlify** - Drag & drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
- **Vercel** - Use Vercel CLI: `vercel --prod`
- **GitHub Pages** - Configure GitHub Pages to serve from `dist` folder
- **Firebase Hosting** - Use Firebase CLI for deployment

## 🎯 Usage

### Getting Started
1. **Visit the landing page** and click "Get Started"
2. **Register** a new account with your details
3. **Create your first invoice** using the "New Invoice" button
4. **Manage your invoices** - edit, delete, or change status
5. **Print invoices** using the Print button on invoice details page

### Features Overview
- **Dashboard**: View all your invoices with filtering options
- **Invoice Creation**: Add multiple items, set due dates, client information
- **Status Management**: Track invoice lifecycle from draft to paid
- **Print Functionality**: Generate print-ready versions of invoices

## 🔐 Security Notes

This application uses localStorage for data persistence. For production use with sensitive data:
- Consider implementing server-side authentication
- Add password hashing and encryption
- Implement proper session management
- Add input validation and sanitization
- Use HTTPS in production

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

---

**Built with ❤️ using Vue.js**
