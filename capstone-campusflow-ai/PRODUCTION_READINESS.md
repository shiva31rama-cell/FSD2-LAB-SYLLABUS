# CampusFlow AI — Production Readiness Plan

This document separates the current **production prototype** from a real public production launch. A production launch still requires deployment-specific secrets, a managed Atlas cluster, domain/TLS configuration, backups, monitoring and a security review.

## Implemented in this branch

- React + Vite frontend
- Express REST API
- MongoDB + Mongoose
- MongoDB-backed sessions
- bcrypt password hashing
- role field on users
- request correlation IDs
- Helmet security headers
- API/auth/AI rate limits
- bounded JSON request bodies
- CORS allow-list configuration
- health/readiness endpoints
- graceful shutdown
- centralized 404/error responses
- server-side OpenAI integration
- MongoDB aggregation dashboard
- CI syntax/build validation

## Required before public launch

### Identity and authorization
- [ ] Verify email ownership if the institution requires it.
- [ ] Add password reset with expiring, single-use tokens.
- [ ] Add explicit role authorization for faculty/admin mutations.
- [ ] Add account lockout or adaptive protection for repeated failed login attempts.
- [ ] Add CSRF protection if the cookie/session architecture requires it.
- [ ] Define session rotation on login and logout.

### Data protection
- [ ] Use MongoDB Atlas with least-privilege database users.
- [ ] Enable backups and test restoration.
- [ ] Define retention/deletion policies.
- [ ] Encrypt sensitive data where required by the institution.
- [ ] Do not store unnecessary personal data in AI prompts.
- [ ] Define what data may be sent to an external AI provider.

### AI safety and reliability
- [ ] Add AI request budgets per user/tenant.
- [ ] Store model, latency and token/cost telemetry without storing sensitive prompt content by default.
- [ ] Add prompt-injection-resistant retrieval boundaries.
- [ ] Filter retrieved documents by tenant, visibility and authorization.
- [ ] Return citations for knowledge-base answers.
- [ ] Add evaluation datasets and regression tests.
- [ ] Require confirmation before consequential actions.

### Operations
- [ ] Deploy behind HTTPS and a managed reverse proxy/load balancer.
- [ ] Configure a real secret manager.
- [ ] Add structured logs and centralized log retention.
- [ ] Add metrics for latency, errors, database pool pressure and AI failures.
- [ ] Add uptime/readiness monitoring.
- [ ] Add dependency update automation.
- [ ] Run dependency and container vulnerability scans.
- [ ] Perform an external security review before institutional deployment.

### MongoDB Atlas

For testing, a free or low-cost environment may be sufficient. For production Vector Search workloads, MongoDB's current deployment guidance distinguishes production sizing from prototyping; production configurations can use dedicated database and Search capacity. Do not treat a free development cluster as the final production architecture.

## Definition of done for a production release

A release is production-ready only when all launch gates above that apply to the chosen deployment are checked, CI is green, backups have been restored successfully in a test, security testing has no unresolved high-severity findings, and the institution has approved its data/AI policy.
