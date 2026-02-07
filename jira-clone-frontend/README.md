# Jira Clone (Issue Tracker)

An end‑to‑end Jira‑like issue tracker built with React (Vite) and Spring Boot.

## Features
- JWT authentication (login/register)
- Projects + members
- Issues (create, edit, delete, assign, status, priority)
- Kanban board (drag and drop)
- Comments
- Filters + search
- Role‑based permissions (ADMIN, MANAGER, DEVELOPER)

## Repo Layout
- `jira-clone-frontend/` – React app
- `JiraClone_Backend/JiraClone/` – Spring Boot backend

## Prerequisites
- Node.js 18+
- Java 17+
- MySQL (or adjust Spring config for Postgres)

## Local Setup

### Backend
1. Configure database + JWT in:
   - `JiraClone_Backend/JiraClone/src/main/resources/application.properties`
2. Run the backend:
```bash
cd JiraClone_Backend/JiraClone
./mvnw spring-boot:run
```

### Frontend
```bash
cd jira-clone-frontend
npm install
npm run dev
```

## Deployment (Render + Vercel)

### Backend (Render)
1. Push the backend to a Git repo.
2. Create a Render **Web Service** from the repo.
3. Set build command:
```bash
./mvnw clean package
```
4. Set start command:
```bash
java -jar target/JiraClone-0.0.1-SNAPSHOT.jar
```
5. Set environment variables (Render dashboard):
```bash
SPRING_DATASOURCE_URL=jdbc:mysql://<host>:<port>/<db>
SPRING_DATASOURCE_USERNAME=<user>
SPRING_DATASOURCE_PASSWORD=<password>
JWT_SECRET=<64+ char secret>
JWT_EXPIRATION=86400000
```
6. Update CORS if needed.

### Frontend (Vercel)
1. Push `jira-clone-frontend` to a Git repo.
2. Create a Vercel project.
3. Set build command:
```bash
npm run build
```
4. Set output directory:
```bash
dist
```
5. Set backend API URL:
   - Update `vite.config.js` proxy for local
   - For production, point API calls to the backend base URL (Render) if you remove proxy.

## Environment Notes
- JWT secret must be **>= 32 chars**.
- Admin/Manager required for project creation and member management.

## License
MIT

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
