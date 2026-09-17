function text(value, field, { min = 1, max = 200 } = {}) {
  if (typeof value !== 'string') return `${field} must be text.`;
  const valueTrimmed = value.trim();
  if (valueTrimmed.length < min) return `${field} must contain at least ${min} characters.`;
  if (valueTrimmed.length > max) return `${field} must not exceed ${max} characters.`;
  return null;
}

function enumValue(value, field, allowed) {
  return allowed.includes(value) ? null : `${field} must be one of: ${allowed.join(', ')}.`;
}

function validateBody(rules) {
  return (req, res, next) => {
    const errors = [];
    for (const rule of rules) {
      const error = rule(req.body || {});
      if (error) errors.push(error);
    }
    if (errors.length) return res.status(400).json({ message: 'Validation failed.', errors });
    next();
  };
}

module.exports = { text, enumValue, validateBody };
