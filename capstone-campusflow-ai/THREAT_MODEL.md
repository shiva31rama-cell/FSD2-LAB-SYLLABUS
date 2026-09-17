# CampusFlow AI — Threat Model

## Assets

- account credentials and sessions;
- student/faculty profile data;
- tasks and deadlines;
- campus announcements;
- AI prompts and responses;
- MongoDB connection credentials;
- OpenAI API key;
- operational logs.

## Trust boundaries

1. Browser → public API.
2. API → MongoDB/Atlas.
3. API → external AI provider.
4. Faculty/admin actions → shared campus data.

## Primary threats and controls

| Threat | Control in prototype | Further control |
|---|---|---|
| Credential brute force | auth rate limit | adaptive lockout, MFA if required |
| API flooding | API + AI rate limits | distributed rate limiter |
| Secret leakage | server-only env vars | deployment secret manager |
| Session theft | HttpOnly/Secure production cookie | rotation, short lifetime, revocation |
| Unauthorized task access | user ID scoping | automated authorization tests |
| Prompt injection | constrained instructions/context | retrieval isolation + tool authorization |
| Cross-tenant leakage | single-tenant baseline | tenant ID on every resource and query |
| Malicious payloads | body size limits, Mongoose schema | boundary validation library |
| Data loss | Atlas deployment plan | tested backups/restore |
| Information leakage in logs | request IDs, sanitized errors | structured redaction policy |

## AI-specific safety boundary

The model is not the authorization layer. A model response must never be trusted to decide whether a user may access or mutate a database record. Authorization is performed by server code before every data operation and tool call.

For future RAG, retrieved documents must be filtered before prompt construction using the authenticated user's tenant, role, visibility and document status.

## Security testing checklist

- [ ] authentication negative tests
- [ ] authorization tests for every resource
- [ ] session fixation/rotation tests
- [ ] rate-limit tests
- [ ] injection tests
- [ ] malformed JSON tests
- [ ] CORS policy tests
- [ ] prompt-injection regression set
- [ ] retrieval authorization tests
- [ ] dependency audit
- [ ] container image scan
- [ ] backup restoration test
