#!/bin/bash
# Rebuild and restart Docker container after cleanup

echo "=== REBUILDING DOCKER CONTAINER ==="
echo ""

# Find existing container
CONTAINER_NAME=$(docker ps -a | grep krapesto-frontend | awk '{print $1}' | head -1)

if [ ! -z "$CONTAINER_NAME" ]; then
    echo "Stopping existing container: $CONTAINER_NAME"
    docker stop $CONTAINER_NAME
    echo "Removing existing container: $CONTAINER_NAME"
    docker rm $CONTAINER_NAME
fi

echo "Building new image..."
docker build -t krapesto-frontend .

echo "Starting new container..."
docker run -d -p 3000:80 --name krapesto-frontend krapesto-frontend

echo ""
echo "=== CONTAINER REBUILT ==="
echo "Container name: krapesto-frontend"
echo "Port: 3000"
echo ""
echo "To verify:"
echo "  docker ps | grep krapesto-frontend"
echo "  curl -I http://localhost:3000/menu/daily-lunch/"
echo "  curl -I http://localhost:3000/menu/daily-lunch/2026-01-12/"
