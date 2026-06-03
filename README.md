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

This starts the backend server with auto-reload using the root `index.js` entry point.

#### Production Mode

```bash
npm start
```

This runs the backend server using the root `index.js` entry point.

#### Direct Backend Server (without frontend)

```bash
npm run server
```

This runs the backend directly from `backend/server.js`.

### Building Frontend

```bash
cd frontend
npm run build
```

Or run the build command from the root:

```bash
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

- **buildCommand**: `npm run build` - Builds the React frontend
- **outputDirectory**: `frontend/dist` - Serves the built frontend
- **Root entry point** (`index.js`):
  - Exports the Express app for Vercel
  - Listens on a port in development mode
  - Acts as a serverless function in production
  - Automatically connects to MongoDB

#### How It Works

1. Vercel detects `index.js` as the entry point from `package.json`
2. The build step installs all dependencies and builds the React frontend
3. Express app is configured to serve the React frontend from `frontend/dist`
4. API requests are handled by the backend Express routes
5. The entire app runs as a single Node.js serverless function on Vercel

### Entry Points

- **Root `index.js`**: Main entry point for both development and Vercel deployment
  - Requires and initializes the Express app
  - Connects to MongoDB
  - Exports the app for serverless environments
  - Listens on port 3000 in development
- **`backend/server.js`**: Standalone backend server
  - Can be run independently
  - Only listens when run directly (not imported)
  - Used for `npm run server` command
- **Root `package.json`**:
  - `main` field points to `index.js`
  - Scripts configured for all environments
- **`vercel.json`**: Tells Vercel how to build and serve the app

## Troubleshooting

### Vercel "No entrypoint found" Error

If you see this error on Vercel:
```
No entrypoint found. Searched for:
- app.{js,cjs,mjs,ts,cts,mts}
- index.{js,cjs,mjs,ts,cts,mts}
- server.{js,cjs,mjs,ts,cts,mts}
- src/app.{js,cjs,mjs,ts,cts,mts}
...
```

**Solution**: Ensure:
1. `index.js` exists in the root directory
2. `package.json` has `"main": "index.js"`
3. `vercel.json` is in the root directory
4. All changes are committed and pushed to GitHub: `git add . && git commit -m "fix" && git push`
5. Trigger a redeploy in Vercel dashboard

### MongoDB Connection Issues

If the app can't connect to MongoDB on Vercel:
1. Verify `MONGODB_URI` is set in Vercel Environment Variables
2. Check that MongoDB Atlas IP whitelist includes Vercel's IPs (or use 0.0.0.0/0 for development)
3. Ensure the connection string includes the correct username and password
4. Check MongoDB Atlas cluster status

### Frontend Not Loading

If the frontend doesn't appear on Vercel:
1. Ensure `npm run build` completes successfully
2. Check that `frontend/dist` folder is created during build
3. Verify Express is serving static files from `frontend/dist`

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
