const ts = () => new Date().toISOString();
module.exports = {
  info: (m) => console.log(`[${ts()}] INFO  ${m}`),
  warn: (m) => console.warn(`[${ts()}] WARN  ${m}`),
  error: (m) => console.error(`[${ts()}] ERROR ${m}`),
};
