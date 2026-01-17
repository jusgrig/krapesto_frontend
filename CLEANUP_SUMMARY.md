# CLEANUP SUMMARY

## Files Deleted

### ✅ Date HTML Files:
- `/static-assets/menu/daily-lunch/date.html` - DELETED
- `/static-assets/en/menu/daily-lunch/date.html` - DELETED

### ✅ Screen Directory:
- `/static-assets/en/menu/daily-lunch/screen/` - DELETED (including index.html)

## Remaining Files

### Daily Lunch Pages:
- ✅ `/static-assets/menu/daily-lunch/index.html` - KEPT (list page)
- ✅ `/static-assets/en/menu/daily-lunch/index.html` - KEPT (list page)

### Next.js App:
- ✅ `/app/menu/daily-lunch/layout.tsx` - KEPT (shared layout)
- ✅ `/app/menu/daily-lunch/page.tsx` - KEPT (list page)
- ✅ `/app/menu/daily-lunch/[date]/page.tsx` - DELETED ✓

## Verification

### Files Check:
```bash
# Date files
find static-assets -name "date.html" -type f
# Result: 0 files (correct)

# Screen directories
find static-assets -type d -name "screen"
# Result: 0 directories (correct)

# Daily lunch HTML files
ls static-assets/menu/daily-lunch/*.html
# Result: Only index.html (correct)
```

## Next Steps

### 1. Rebuild Docker Container:
```bash
cd /home/ubuntu/projects/krapesto_frontend
sudo docker build -t krapesto-frontend .
```

### 2. Stop and Remove Old Container:
```bash
sudo docker ps -a | grep krapesto-frontend
sudo docker stop <container_id>
sudo docker rm <container_id>
```

### 3. Start New Container:
```bash
sudo docker run -d -p 3000:80 --name krapesto-frontend krapesto-frontend
```

### 4. Verify Clean State:
```bash
# Test list route (should work)
curl -I http://localhost:3000/menu/daily-lunch/
# Expected: 200 OK

# Test date route (should return 404)
curl -I http://localhost:3000/menu/daily-lunch/2026-01-12/
# Expected: 404 Not Found

# Verify container contents
sudo docker exec krapesto-frontend ls -la /usr/share/nginx/html/menu/daily-lunch/
# Expected: Only index.html (no date.html)
```

## Expected Behavior After Rebuild

### List Page:
- Route: `/menu/daily-lunch/`
- File: `index.html`
- Status: ✅ 200 OK

### Date Page:
- Route: `/menu/daily-lunch/2026-01-12/`
- File: None (deleted)
- Status: ✅ 404 Not Found

## Clean State Confirmation

✅ All date.html files deleted
✅ Screen directory deleted
✅ Only index.html remains in daily-lunch directories
✅ Next.js date page deleted
✅ Nginx config updated (no date route mapping)
✅ Ready for container rebuild
