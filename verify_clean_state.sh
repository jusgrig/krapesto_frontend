#!/bin/bash
# Verify clean state after container rebuild

echo "=== CLEAN STATE VERIFICATION ==="
echo ""

CONTAINER_NAME="krapesto-frontend"

# Check if container is running
if ! docker ps | grep -q "$CONTAINER_NAME"; then
    echo "❌ Container $CONTAINER_NAME is not running"
    echo "   Start it with: docker start $CONTAINER_NAME"
    exit 1
fi

echo "✅ Container is running"
echo ""

# Check files in container
echo "1. Files in container (/usr/share/nginx/html/menu/daily-lunch/):"
docker exec $CONTAINER_NAME ls -la /usr/share/nginx/html/menu/daily-lunch/ 2>/dev/null || echo "   Directory not found"
echo ""

# Check for date.html in container
echo "2. Checking for date.html files:"
DATE_FILES=$(docker exec $CONTAINER_NAME find /usr/share/nginx/html -name "date.html" -type f 2>/dev/null | wc -l)
if [ "$DATE_FILES" -eq 0 ]; then
    echo "   ✅ No date.html files found (correct)"
else
    echo "   ❌ Found $DATE_FILES date.html file(s) (should be 0)"
fi
echo ""

# Check nginx config
echo "3. Nginx configuration:"
docker exec $CONTAINER_NAME cat /etc/nginx/conf.d/default.conf | grep -A 2 "location" | head -10
echo ""

# Test routes
echo "4. Testing routes:"
echo ""
echo "   List route (/menu/daily-lunch/):"
curl -s -o /dev/null -w "   Status: %{http_code}\n" http://localhost:3000/menu/daily-lunch/ 2>/dev/null || echo "   ❌ Cannot connect to server"
echo ""

echo "   Date route (/menu/daily-lunch/2026-01-12/):"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/menu/daily-lunch/2026-01-12/ 2>/dev/null)
if [ "$STATUS" = "404" ]; then
    echo "   ✅ Status: 404 Not Found (correct)"
elif [ "$STATUS" = "200" ]; then
    echo "   ⚠️  Status: 200 OK (unexpected - should be 404)"
else
    echo "   Status: $STATUS"
fi
echo ""

echo "=== VERIFICATION COMPLETE ==="
