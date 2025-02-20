# --- Stage 1: Build Stage (Dependencies and TypeScript Compilation + Frontend Build) ---
    FROM node:22-alpine AS builder

    WORKDIR /app
    
    # Copy backend package.json and package-lock.json (or yarn.lock)
    COPY backend/package*.json ./backend/
    COPY backend/package-lock.json ./backend/ 
    
    # Copy frontend package.json and package-lock.json (or yarn.lock)
    COPY frontend/package*.json ./frontend/
    COPY frontend/package-lock.json ./frontend/ 

    #COPY package*.json ./
    

    # Install dependencies for both backend and frontend
    RUN npm install --prefix backend
    RUN npm install --prefix frontend
    #RUN npm install
    
    # Copy backend and frontend source code
    COPY backend ./backend
    COPY frontend ./frontend
    
    RUN npm run build --prefix backend
    #RUN npm run build:backend

    
    RUN npm run build --prefix frontend
    #RUN npm run build:frontend

    
    
    # --- Stage 2: Production Image (Node.js Backend with Static Files) ---
    FROM node:22-alpine AS production
    
    WORKDIR /app
    
    # Copy backend production artifacts from builder stage
    COPY --from=builder /app/backend/package*.json ./package.json
    COPY --from=builder /app/backend/package-lock.json ./package-lock.json
    COPY --from=builder /app/backend/node_modules ./node_modules 
    COPY --from=builder /app/backend/build ./dist
    
    # Copy built frontend static files to the 'public' directory in the backend
    COPY --from=builder /app/frontend/dist/js ./public/js
    COPY --from=builder /app/frontend/dist/index.html ./public/index.html
    
    
    ENV NODE_ENV=production
    
    ARG EXPOSE_PORT=3000  
    EXPOSE ${EXPOSE_PORT}

    
    CMD ["node", "./dist/server.js"]
    