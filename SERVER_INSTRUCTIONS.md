# Exim Royals - Server Setup Instructions

This guide explains how to run the application on a Linux server (e.g., Ubuntu/CentOS/AWS EC2) with the exact same configuration and database as your local machine.

## 1. Prerequisites

Ensure your server has the following installed:

*   **Java 17 (JDK):** Required for the backend.
    *   Ubuntu: `sudo apt install openjdk-17-jdk`
*   **Maven:** Required to build/run the backend.
    *   Ubuntu: `sudo apt install maven`
*   **Node.js (v18+) & npm:** Required for the frontend.
    *   [Install Guide](https://nodejs.org/en/download/package-manager)

## 2. Get the Code

Clone the repository to your server:

```bash
git clone https://github.com/patilayush9950/DnDGlobalExports.git
cd DnDGlobalExports
```

*Note: Since we pushed the `backend/data` folder, your database files (`eximroyals_db.mv.db`) are already included. You don't need to do anything extra to restore the database.*

## 3. Run the Backend

Navigate to the backend directory and run the server script:

```bash
cd backend
chmod +x run_server.sh
./run_server.sh
```

The backend will start on port `8080`.

## 4. Run the Frontend

Open a new terminal session (or run in background) and navigate to the frontend:

```bash
cd frontend
```

### Option A: Development Mode (Same as local)
If you want to edit code on the server or see logs easily:
```bash
npm install
npm run dev
```
Runs on port `3000`.

### Option B: Production Mode (Recommended for public servers)
Faster and optimized for performance:
```bash
npm install
npm run build
npm start
```
Runs on port `3000`.

## 5. Quick Check

- **Backend health:** `curl http://localhost:8080/api/products`
- **Frontend:** Access via your server's IP address (e.g., `http://YOUR_SERVER_IP:3000`).

## Troubleshooting

- **Database Locked:** If you see "Database may be already in use", ensure no other java process is running the backend. Stop it using `pkill -f eximroyals` or `pkill java`.
- **Ports:** Ensure ports 8080 and 3000 are open in your server's firewall (AWS Security Groups / UFW).
