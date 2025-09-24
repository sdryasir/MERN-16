### Changes I made to fix the docker compose issue

- VITE_API_URL=http://localhost:7000  - added this entry to .env of both admin & client
- Replaced hardcoded "http://localhost:7000" to env variable everywhere in the code
- Changed port binding from - "7000:3000" to - "7000:7000" in docker compose
- Whitelisted 'http://localhost:4000', 'http://localhost:3000' in backend CORS
- Replace MONGO_DB_URI='mongodb://localhost:27017/e-commerce-b-16' with MONGO_DB_URI=mongodb://root:example@mongo:27017/e-commerce-b-16?authSource=admin


### How I fixed deployment issues

- Changed the root directory to "backend"
- Upload environment variables to render "Environment tab"
- added environment variable to admin and client app inside netly dashboard.
- Whitelisted CORS in backend app

