### Changes I made to fix the docker compose issue

    - VITE_API_URL=http://localhost:7000  - added this entry to .env of both admin & client
    - Replaced hardcoded "http://localhost:7000" to env variable everywhere in the code
    - Changed port binding from - "7000:3000" to - "7000:7000" in docker compose
    - Whitelisted 'http://localhost:4000', 'http://localhost:4000' in backend CORS

