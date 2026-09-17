# CampusFlow AI — Research / PhD-Style Evaluation Protocol

## Research position

CampusFlow AI is a software prototype, not by itself a PhD thesis. A PhD-level contribution would require a clearly novel research question, a reproducible method, controlled evaluation, comparison with baselines, analysis of limitations and a defensible contribution beyond simply integrating existing technologies.

## Candidate research theme

**Grounded AI for personalized academic productivity using MongoDB operational data and semantic campus knowledge retrieval.**

## Research questions

**RQ1.** Does grounding an academic productivity assistant with current user tasks and institution-approved knowledge improve factuality compared with an ungrounded assistant?

**RQ2.** How do retrieval settings affect answer relevance, latency and hallucination rate?

**RQ3.** Can personalized task planning improve measurable task completion without increasing cognitive load?

**RQ4.** What privacy and authorization architecture is required when operational student data is used as AI context?

## Baselines

- B0: ordinary non-AI task list.
- B1: LLM assistant without application retrieval.
- B2: LLM + keyword/full-text retrieval.
- B3: LLM + MongoDB Vector Search RAG.
- B4: hybrid retrieval + reranking, if implemented.

Do not claim that any baseline is superior until measurements are collected.

## Evaluation metrics

### Retrieval
- Recall@k
- Precision@k
- MRR
- nDCG
- citation/source coverage

### Generation
- factuality against a labeled reference set
- unsupported-claim rate
- instruction-following rate
- answer usefulness rating

### System
- p50/p95 latency
- error rate
- MongoDB query latency
- AI request latency
- token/cost estimate

### Human-centered
- task completion rate
- time on task
- SUS or another validated usability instrument
- workload questionnaire where appropriate

## Experimental design

1. Build a fixed, versioned evaluation dataset.
2. Define ground-truth answers and relevant documents before testing.
3. Randomize test order where appropriate.
4. Keep model/version/configuration fixed during each comparison.
5. Record retrieval configuration and timestamps.
6. Report confidence intervals and appropriate statistical tests.
7. Report failed cases, not only averages.
8. Keep a separate hold-out test set.

## Human-subject research

If real students or staff participate, obtain the required institutional approval and informed consent before collecting research data. Minimize personal data and separate research identifiers from application accounts.

## Reproducibility

Record:

- source commit SHA
- Node version
- MongoDB/Atlas version
- model identifier
- embedding model
- retrieval index definition
- prompt/version identifier
- dataset version
- evaluation script version
- environment configuration without secrets

## Threats to validity

- changing model behavior;
- small or biased participant samples;
- synthetic evaluation data;
- retrieval-index tuning overfitting;
- self-reported usability scores;
- latency changes due to cloud region/network conditions;
- privacy constraints limiting available evaluation data.

## Expected research artifact set

```text
research/
  datasets/
  schemas/
  retrieval-indexes/
  experiments/
  evaluation/
  results/
  figures/
  papers/
```

The repository should eventually contain scripts that reproduce every reported table and figure from versioned experiment data.
