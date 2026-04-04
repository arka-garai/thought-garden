# Thought Garden

REST API for saving and sharing content (articles, tweets, videos, links) with tags.

## Tech Stack

Node.js | TypeScript | Express | MongoDB (Mongoose) | JWT | Zod | bcryptjs

## Database Schema

![DB Schema](./assets/schema-design.png)

## Endpoints

### Auth
- `POST /api/v1/signup` - Register
- `POST /api/v1/signin` - Login (returns JWT)

### Content (Auth required)
- `POST /api/v1/content` - Add content
- `GET /api/v1/content` - Get all content
- `DELETE /api/v1/content` - Delete content

### Brain (Share)
- `POST /api/v1/brain/share` - Enable/disable sharing
- `GET /api/v1/brain/:shareLink` - View shared brain (public)

## Run

```bash
npm install
npm run build
npm run start
```

Server runs on port `3345` (or PORT from .env)