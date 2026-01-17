# Service Restart Instructions

## Current Status
- Nginx: Running (12 processes detected)
- Node.js: Running (1 process detected)
- Next.js cache: Cleared ✓

## Steps to Restart Services

### 1. Reload Nginx Configuration
Since nginx config has been updated (date route rules removed), reload nginx:

```bash
# If nginx is running in Docker:
docker exec <container_name> nginx -s reload

# If nginx is running as system service:
sudo systemctl reload nginx

# If nginx is running standalone:
sudo nginx -s reload

# Or find the nginx master process and send HUP signal:
sudo kill -HUP $(cat /var/run/nginx.pid)
```

### 2. Restart Docker Container (if applicable)
If the frontend is running in Docker:

```bash
# Find container name
docker ps | grep krapesto

# Restart container
docker restart <container_name>

# OR rebuild and restart:
cd /home/ubuntu/projects/krapesto_frontend
docker build -t krapesto-frontend .
docker stop <container_name> && docker rm <container_name>
docker run -d -p 3000:80 --name krapesto-frontend krapesto-frontend
```

### 3. Clear Application Caches
Already completed:
- ✓ Next.js `.next` cache cleared

If using other caches:
```bash
# Clear browser cache (manual)
# Clear CDN cache (if applicable)
# Clear any reverse proxy cache
```

### 4. Restart Node.js/Next.js Application
If running Next.js standalone:

```bash
# Find the process
ps aux | grep "node.*index.js"

# Restart (kill and restart)
kill <PID>
cd /home/ubuntu/projects/krapesto_frontend
npm start  # or your start command
```

## Verification
After restart, verify the date route is gone:
- Access: `/menu/daily-lunch/2026-01-12/`
- Expected: 404 Not Found
- If still accessible: Check nginx config and restart again
