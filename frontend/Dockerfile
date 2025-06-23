FROM node:18

WORKDIR /app

# Copy only package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Expose port 3000 (Vite default)
EXPOSE 3000

# Run Vite dev server
CMD ["npm", "run", "dev"]
