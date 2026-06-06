export const formatDate = (d) => new Date(d).toLocaleDateString('en', { year:'numeric', month:'short', day:'numeric' });
