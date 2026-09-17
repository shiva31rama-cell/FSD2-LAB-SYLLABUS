# Schema Design

MongoDB schema design starts from **how the application reads and writes data**, not from copying a relational-table design blindly.

## Embed when

- The child data belongs strongly to one parent.
- The child is usually read with the parent.
- The embedded array will stay reasonably bounded.

Example:

```js
{
  title: 'Order 1001',
  items: [
    { productId: 'P1', name: 'Pen', qty: 3 },
    { productId: 'P2', name: 'Book', qty: 1 }
  ]
}
```

## Reference when

- Related data has an independent lifecycle.
- The related collection is shared by many documents.
- The array could grow without a useful bound.

Example:

```js
{ studentId: ObjectId('...'), courseId: ObjectId('...') }
```

## Questions to ask before modeling

1. What are the most common queries?
2. What must be updated together?
3. Which arrays can grow indefinitely?
4. Which fields need indexes?
5. Which data has separate ownership or security rules?
6. Can a single document remain within MongoDB's document-size limit?

## Mongoose vs MongoDB

Mongoose gives application-level schemas, validation, middleware and model helpers. MongoDB itself remains the database and query/aggregation engine.
