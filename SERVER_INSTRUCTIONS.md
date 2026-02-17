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

## 6. Configuring Domain (Nginx)

To serve your app on `https://dndglobalexports.com`, use Nginx as a reverse proxy.

### Install Nginx
```bash
sudo apt install nginx
```

### Configure Nginx
Create a config file: `/etc/nginx/sites-available/dndglobalexports`

```nginx
server {
    server_name dndglobalexports.com www.dndglobalexports.com;

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/dndglobalexports /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL (HTTPS)
Use Certbot to get a free SSL certificate:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d dndglobalexports.com -d www.dndglobalexports.com
```

## 7. Production Deployment (Systemd & PM2)

Since you are using `systemd` and `pm2`, follow these steps to make your app run in the background and restart automatically.

### Backend (Systemd)

1.  **Build the JAR file:**
    ```bash
    cd backend
    ./run_locally.sh  # Or: mvn clean package -DskipTests
    ```
    This creates `target/backend-0.0.1-SNAPSHOT.jar`.

2.  **Create Service File:**
    `sudo nano /etc/systemd/system/dnd-backend.service`

    Paste the following (adjust paths if needed):

    ```ini
    [Unit]
    Description=DnD Global Exports Backend
    After=syslog.target network.target

    [Service]
    User=deploy
    # Adjust path to your JAR file
    WorkingDirectory=/var/dndglobal/DnDGlobalExports/backend
    ExecStart=/usr/bin/java -jar target/backend-0.0.1-SNAPSHOT.jar
    SuccessExitStatus=143
    Restart=always
    RestartSec=10

    [Install]
    WantedBy=multi-user.target
    ```

3.  **Start Service:**
    ```bash
    sudo systemctl daemon-reload
    sudo systemctl enable dnd-backend
    sudo systemctl start dnd-backend
    sudo systemctl status dnd-backend
    ```

### Frontend (PM2)

1.  **Build Frontend:**
    ```bash
    cd frontend
    npm install
    npm run build
    ```

2.  **Start with PM2:**
    ```bash
    pm2 start npm --name "dnd-frontend" -- start
    pm2 save
    ```


