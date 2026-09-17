# MongoDB → CampusFlow Integration Map

| MongoDB skill | CampusFlow usage |
|---|---|
| Database/collection/document | `campusflow` database and `users`, `tasks`, `announcements`, `sessions` collections |
| CRUD | Task and announcement APIs |
| Schema/model | Mongoose models |
| Indexes | Task ownership/status/due-date and text indexes |
| Querying | Task filtering/search/sorting |
| Aggregation | Dashboard status and priority statistics |
| References | Announcement author → User |
| Sessions | MongoDB-backed Express sessions |
| Atlas | Cloud database option through `MONGO_URI` |
| AI context | MongoDB task/announcement data becomes controlled AI context |
| Search/Vector Search | Future RAG extension for campus knowledge |
| Triggers | Future notifications and scheduled archival |

## Suggested next engineering milestones

1. Add role-based faculty/admin permissions.
2. Add pagination to task and announcement APIs.
3. Add API validation and rate limiting.
4. Add tests for every REST route.
5. Add a notification collection and Atlas trigger.
6. Add campus knowledge documents.
7. Generate embeddings and build Vector Search retrieval.
8. Add RAG to the AI assistant with source citations.
9. Add monitoring, backups and deployment automation.
