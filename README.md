# 🚀 SVG Holder Backend API

A robust Node.js backend API for the SVG Holder application, built with Express.js and MongoDB.

## ✨ Features

- **🔄 RESTful API** - Complete CRUD operations for SVG management
- **📁 File Upload** - Handle SVG file uploads with Multer
- **🔍 Search Functionality** - Search SVGs by name or description
- **🛡️ CORS Enabled** - Cross-origin request support
- **📊 MongoDB Integration** - Scalable data storage with Mongoose
- **⚡ Health Check** - API status monitoring endpoint

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** connection string

### Installation

1. **Clone the repository**
   ```bash
   git clone <backend-repo-url>
   cd svgholder-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?retryWrites=true&w=majority
   PORT=3001
   DB_NAME=svgholder
   ```

4. **Start the server**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

**Server will run on:** `http://localhost:3001`

## 📁 Project Structure

```
backend/
├── config.js          # Configuration (MongoDB URI, port)
├── database.js        # MongoDB connection setup
├── models/            # Mongoose schemas
│   └── Svg.js        # SVG data model
├── routes/            # API routes
│   └── svgs.js       # SVG CRUD endpoints
├── server.js          # Express server setup
├── package.json       # Dependencies and scripts
└── .gitignore         # Git ignore rules
```

## 🔌 API Endpoints

### Base URL: `http://localhost:3001/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/health` | Health check endpoint | - |
| `GET` | `/svgs` | Get all SVGs | - |
| `POST` | `/svgs` | Upload new SVG | `multipart/form-data` |
| `GET` | `/svgs/:id` | Get SVG by ID | - |
| `PUT` | `/svgs/:id` | Update SVG | `JSON` |
| `DELETE` | `/svgs/:id` | Delete SVG | - |
| `GET` | `/svgs/search?q=query` | Search SVGs | - |

### Request Examples

#### Upload SVG
```bash
curl -X POST http://localhost:3001/api/svgs \
  -F "name=My Icon" \
  -F "description=A beautiful icon" \
  -F "svgFile=@icon.svg"
```

#### Search SVGs
```bash
curl "http://localhost:3001/api/svgs/search?q=icon"
```

#### Get All SVGs
```bash
curl http://localhost:3001/api/svgs
```

## 📊 Data Models

### SVG Schema
```javascript
{
  name: String,           // SVG name (required)
  description: String,    // SVG description (required)
  content: String,        // SVG XML content (required)
  fileSize: Number,       // File size in bytes (required)
  originalName: String,   // Original filename (required)
  createdAt: Date,        // Upload timestamp
  updatedAt: Date         // Last update timestamp
}
```

## 🚀 Available Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests (if configured)
npm run lint     # Run linting (if configured)
```

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3001)
- `DB_NAME` - Database name (default: svgholder)

### CORS Configuration
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

## 🐛 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

#### 2. **MongoDB Connection Issues**
- Verify your connection string
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

#### 3. **File Upload Issues**
- Check file size limits
- Verify file type validation
- Ensure upload directory permissions

## 🌐 Production Deployment

### 1. **Environment Setup**
```bash
# Set production environment variables
export NODE_ENV=production
export MONGODB_URI=your_production_mongodb_uri
export PORT=3001
```

### 2. **Process Management**
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name "svg-holder-backend"

# Monitor processes
pm2 status
pm2 logs
```

### 3. **Reverse Proxy (Nginx)**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 4. **SSL/HTTPS**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

## 🔒 Security Considerations

- **Input Validation** - All inputs are validated and sanitized
- **File Type Validation** - Only SVG files are accepted
- **CORS Configuration** - Restricted to specific origins
- **Error Handling** - No sensitive information in error responses

## 📈 Performance

- **Connection Pooling** - MongoDB connection optimization
- **File Streaming** - Efficient file upload handling
- **Indexing** - Database query optimization
- **Compression** - Response size reduction

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the console logs
3. Verify your MongoDB connection
4. Ensure all dependencies are installed

---

**Happy Coding! 🚀✨**
