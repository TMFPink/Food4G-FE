# Use the official Node.js image as a base
FROM --platform=linux/amd64 node:16-alpine 

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN rm -rf node_modules package-lock.json && npm install

# Copy the rest of the application code
COPY . .

ENV NODE_OPTIONS="--max-old-space-size=4096"  


# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]