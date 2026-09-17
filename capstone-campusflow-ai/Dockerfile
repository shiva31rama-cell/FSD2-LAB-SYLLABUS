FROM node:22-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY capstone-campusflow-ai/server ./capstone-campusflow-ai/server

WORKDIR /app/capstone-campusflow-ai/server
USER node
EXPOSE 4000

CMD ["node", "server.js"]
