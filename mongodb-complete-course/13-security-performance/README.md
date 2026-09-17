# MongoDB Security and Performance

## Security checklist

- Use authenticated database users.
- Apply least privilege.
- Keep connection strings and API keys in environment/secret management.
- Restrict network access.
- Use TLS for remote connections.
- Avoid returning password hashes to clients.
- Validate user-controlled filters and update objects.
- Log security-relevant failures without logging secrets.
- Plan credential rotation.

## Performance checklist

1. Identify the real query pattern.
2. Add an index that supports that pattern.
3. Run `explain('executionStats')`.
4. Check examined documents versus returned documents.
5. Avoid unbounded arrays and oversized documents.
6. Project only the fields needed by the API.
7. Filter early in aggregation pipelines when possible.
8. Review indexes after major workload changes.
9. Monitor production metrics rather than guessing.

## Useful commands

```js
db.collection.getIndexes()
db.collection.createIndex({ field: 1 })
db.collection.find({ field: value }).explain('executionStats')
db.collection.stats()
```

Performance is workload-dependent. An index is not automatically beneficial for every query; measure with representative data.
