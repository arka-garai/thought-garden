# Thought Garden

A REST API for saving and sharing content (articles, tweets, YouTube videos, links) with tagging support. Users can manage their personal "garden" - a collection of useful content - and optionally share it with others.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcryptjs
- **Validation:** Zod

## Project Structure

```
thought-garden/
├── assets/
│   └── schema-design.png       # Database schema diagram
├── src/
│   ├── controllers/
│   │   ├── auth-controller.ts  # Authentication logic
│   │   ├── content-controller.ts # Content CRUD operations
│   │   └── garden-controller.ts # Garden sharing logic
│   ├── routes/
│   │   ├── auth-routes.ts      # Auth endpoints
│   │   ├── content-routes.ts  # Content endpoints
│   │   └── garden-routes.ts     # Garden sharing endpoints
│   ├── middleware/
│   │   └── user-middleware.ts # JWT verification
│   ├── models/
│   │   └── db-model.ts        # Mongoose schemas & models
│   ├── validations/
│   │   └── user-validation.ts # Zod validation schemas
│   └── index.ts                # Entry point
├── .env                        # Environment variables
├── package.json
└── tsconfig.json
```

## Database Schema

![System Design](assets/schema-design.png)

## API Endpoints

### Auth Routes (`/api/v1`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | No |
| POST | `/signin` | Login user, returns JWT | No |

### Content Routes (`/api/v1/content`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Add new content | Yes |
| GET | `/` | Get all user's content | Yes |
| DELETE | `/` | Delete content by ID | Yes |

### Garden Routes (`/api/v1/garden`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/share` | Enable/disable garden sharing | Yes |
| GET | `/:shareLink` | View shared garden | No |

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/arka-garai/thought-garden.git
cd thought-garden

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=3345
MONGO_URI=your_mongodb_uri
JWT_USER_PASSWORD=your_jwt_secret_key
```

### Running the Project

```bash
# Build and start (development)
npm run dev

# Or build and start separately
npm run build
npm run start
```

The server will start on `http://localhost:3345`

## Request/Response Examples

### User Signup
```bash
POST /api/v1/signup
{
  "username": "johndoe",
  "password": "Password123!"
}
# Response: { "message": "Signed up" }
```

**Zod Validation:**
- username: 3-10 characters
- password: 8-20 chars, must contain uppercase, lowercase, number, special char (!@#$%^&*)

### User Signin
```bash
POST /api/v1/signin
{
  "username": "johndoe",
  "password": "Password123!"
}
# Response: { "token": "eyJhbGciOiJIUzI1..." }
```

### Add Content
```bash
POST /api/v1/content
Authorization: Bearer <token>
{
  "type": "youtube",
  "link": "https://www.youtube.com/watch?v=abc123",
  "title": "Master Calisthenics",
  "tags": ["fitness", "calisthenics"]
}
# Response: { "message": "Content added" }
```

**Valid types:**
- **document** - PDF, articles, blog posts
- **tweet** - Twitter/X posts
- **youtube** - YouTube videos
- **link** - Any general URL

### Get All Content
```bash
GET /api/v1/content
Authorization: Bearer <token>
# Response: { "content": [...] }
```

### Delete Content
```bash
DELETE /api/v1/content
Authorization: Bearer <token>
{
  "contentId": "507f1f77bcf86cd799439011"
}
# Response: { "message": "Deleted" }
```

### Enable Garden Sharing
```bash
POST /api/v1/garden/share
Authorization: Bearer <token>
{
  "share": true
}
# Response: { "link": "abc123xyz" }
```

### Disable Garden Sharing
```bash
POST /api/v1/garden/share
Authorization: Bearer <token>
{
  "share": false
}
# Response: { "message": "Sharing disabled" }
```

### View Shared Garden
```bash
GET /api/v1/garden/abc123xyz
# Response: { "username": "johndoe", "content": [...] }
```

## License

ISC