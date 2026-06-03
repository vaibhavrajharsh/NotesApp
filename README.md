# NotesApp

A full-stack notes application with a React frontend and Express.js backend using MongoDB for data persistence.

## Project Structure

```
NotesApp/
├── backend/                    # Backend Express server
│   ├── server.js              # Entry point for the backend
│   ├── package.json           # Backend dependencies (shared with root)
│   └── src/
│       ├── app.js             # Express app configuration
│       └── db/
│           ├── db.js          # MongoDB connection setup
│           └── models/
│               └── note.model.js   # Mongoose Note schema
│
├── frontend/                   # Frontend React application
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite build configuration
│   ├── eslint.config.js       # ESLint configuration
│   ├── index.html             # HTML entry point
│   ├── README.md              # Frontend-specific documentation
│   ├── public/                # Static assets
│   └── src/
│       ├── main.jsx           # React entry point
│       ├── App.jsx            # Main React component
│       ├── App.css            # Global styles
│       ├── index.css          # CSS reset/globals
│       ├── assets/            # Image and media assets
│       └── components/        # React components
│           ├── Header.jsx
│           ├── Sidebar.jsx
│           ├── NoteCard.jsx
│           ├── NoteModal.jsx
│           ├── DeleteConfirmModal.jsx
│           └── Toast.jsx
│
├── package.json               # Root package.json with scripts
├── package-lock.json          # Dependency lock file
├── README.md                  # This file
├── a.md                       # Configuration file (contains secrets - should be in .env)
├── notes_db_fallback.json     # Fallback data file
└── .git/                      # Git repository
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable)

   ```bash
   git clone <repository-url>
   cd NotesApp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the root directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
     ```

### Running the Application

#### Development Mode

```bash
npm run dev
```

This starts the backend server with nodemon auto-reload on file changes.

#### Production Mode

```bash
npm start
```

This runs the backend server without auto-reload.

### Building Frontend

```bash
cd frontend
npm run build
```

## Backend API

### Architecture

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Port**: 3000
- **CORS**: Enabled for all origins

### API Endpoints

#### Create a Note

- **Method**: POST
- **URL**: `/notes`
- **Request Body**:
  ```json
  {
    "title": "Note Title",
    "desc": "Note Description",
    "color": "default",
    "pinned": false,
    "tags": ["tag1", "tag2"]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Note created successfully",
    "data": { ... }
  }
  ```

### Database Models

#### Note Model

- `title`: String (optional)
- `desc`: String (optional)
- `color`: String (default: 'default')
- `pinned`: Boolean (default: false)
- `tags`: Array of Strings (default: [])
- `createdAt`: Timestamp (auto-generated)
- `updatedAt`: Timestamp (auto-generated)

## Frontend

The React frontend is built with Vite and includes:

- Component-based architecture
- Modal dialogs for note creation/editing
- Delete confirmation modal
- Toast notifications
- Responsive sidebar navigation
- Note cards with color coding
- Tag support

## File Organization Best Practices

### Backend (`backend/`)

- **server.js**: Server initialization
- **src/app.js**: Express app setup and route definitions
- **src/db/**: Database connection and models

### Frontend (`frontend/`)

- **src/components/**: Reusable React components
- **src/assets/**: Static media files
- **public/**: Public static files

## Scripts

- `npm start` - Start the backend server (production)
- `npm run dev` - Start the backend server with auto-reload (development)
- `npm run build` - Build the frontend for production (runs during Vercel deployment)

## Deployment

### Vercel Deployment

This project is configured for deployment on [Vercel](https://vercel.com/) with the `vercel.json` configuration file.

#### Setup Steps

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the project

3. **Configure Environment Variables**
   - In Vercel Dashboard: Settings → Environment Variables
   - Add `MONGODB_URI` with your MongoDB connection string
   - Redeploy for changes to take effect

4. **Deploy**
   - Vercel automatically deploys when you push to the main branch
   - Or manually trigger a deployment from the dashboard

#### Vercel Configuration

The `vercel.json` file specifies:

- Entry point: `backend/server.js`
- Build command: Installs dependencies and builds the frontend
- Routes API requests to the backend
- Serves frontend static files

### Entry Points

- **Root `index.js`**: Simple entry point that requires `backend/server.js`
- **Root `package.json`**: Points `main` field to `index.js`
- **vercel.json**: Tells Vercel where to find and how to build the app

## Notes on Configuration

⚠️ **Security**: The `a.md` file contains sensitive information (MongoDB connection string). This should be:

1. Removed from version control (add to .gitignore)
2. Moved to a `.env` file that is not committed
3. Used only for local development

### Recommended .gitignore Updates

```
.env
.env.local
node_modules/
dist/
.DS_Store
*.log
```

## Future Improvements

- [ ] Add user authentication
- [ ] Implement note search functionality
- [ ] Add note sharing capabilities
- [ ] Create backend API documentation (Swagger/OpenAPI)
- [ ] Add unit and integration tests
- [ ] Implement error handling middleware
- [ ] Add logging system
- [ ] Create deployment guides (Docker, Heroku, etc.)

## License

ISC

## Contributing

Please follow standard Git workflow practices and ensure code is tested before submitting pull requests.

---

**Last Updated**: June 2026
