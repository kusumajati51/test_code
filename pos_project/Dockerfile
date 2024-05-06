FROM node:18-alpine As development

# Set working directory
WORKDIR /usr/../..

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --force

# Copy source code
COPY . .

# Set NODE_ENV environment variable
ENV NODE_ENV=development

# Expose port 8080 for the API service
EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]
