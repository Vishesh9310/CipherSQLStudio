function isQuerySafe(sql) {
  const forbidden = /\b(DROP|ALTER|CREATE|INSERT|UPDATE|DELETE|GRANT|REVOKE|COPY|VACUUM|TRUNCATE)\b/i;
  return !forbidden.test(sql);
}

module.exports = { isQuerySafe };