# MongoDB Atlas — Practical Setup

MongoDB Atlas is MongoDB's managed cloud database service. Use it when you want the database hosted for your application rather than running MongoDB Community locally.

## Setup checklist

1. Create an Atlas project.
2. Create a deployment appropriate for your learning workload.
3. Create a database user.
4. Configure network access for your development environment.
5. Create the database/collection or let the application create them.
6. Use **Connect → Drivers** to obtain the connection string.
7. Put the URI in `MONGO_URI` instead of hard-coding it.
8. Test with `mongosh` or the Node.js driver.

Example environment variable:

```powershell
$env:MONGO_URI="mongodb+srv://<username>:<password>@<cluster>/<database>"
```

## Atlas skills to practice

- Database deployments and scaling concepts
- Users and authentication
- Network access
- Database/collection/document CRUD
- Indexes and query plans
- Aggregation Pipeline Builder
- Monitoring and alerts
- Backups and restore concepts
- Search and Vector Search
- Triggers
- Atlas CLI for deployment workflows

## Important security rules

- Never commit `.env` files.
- Never put a database password in React code.
- Use a least-privilege database user.
- Restrict network access instead of leaving broad access in production.
- Rotate credentials if they are exposed.

## Current platform notes

Atlas supports dedicated and Flex deployment choices with different capabilities. Search/Vector Search and Trigger availability depends on the deployment and current Atlas feature support, so always check the current Atlas documentation before choosing a production configuration.

Official documentation: https://www.mongodb.com/docs/atlas/
