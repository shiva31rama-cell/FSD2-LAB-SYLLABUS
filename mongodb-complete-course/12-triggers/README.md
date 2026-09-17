# Atlas Triggers and Automation

Atlas Triggers are useful when a database event or schedule should start server-side logic.

## Database trigger example

Use a database trigger when a document change should cause another action.

Example idea for CampusFlow:

```text
new announcement inserted
        ↓
Atlas Database Trigger
        ↓
Function validates event
        ↓
notification/event handler
```

Example Function logic:

```js
exports = async function(changeEvent) {
  const document = changeEvent.fullDocument;
  if (!document) return;
  console.log(`New announcement: ${document.title}`);
};
```

## Scheduled trigger example

Use a scheduled trigger for recurring server-side jobs, such as a daily cleanup or digest preparation.

```js
exports = async function() {
  const service = context.services.get('mongodb-atlas');
  const db = service.db('campusflow');
  const result = await db.collection('tasks').updateMany(
    { status: 'done', updatedAt: { $lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } },
    { $set: { archived: true } }
  );
  console.log(`Archived ${result.modifiedCount} old tasks.`);
};
```

## Important design rule

Avoid trigger recursion. A trigger that writes to a collection watched by another trigger can create unexpected chains or loops. Keep trigger conditions narrow and make automation idempotent where possible.

Atlas Triggers use change streams for database events. Trigger availability and deployment requirements can vary, so verify the current Atlas documentation before deploying.

Official documentation: https://www.mongodb.com/docs/atlas/atlas-ui/triggers/
