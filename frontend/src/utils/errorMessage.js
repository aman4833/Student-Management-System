export function getErrorMessage(error) {
  if (!error?.response) {
    return error?.message || 'Network error. Is the Spring Boot server running?';
  }
  const body = error.response.data;
  if (body?.fieldErrors && typeof body.fieldErrors === 'object') {
    const parts = Object.entries(body.fieldErrors).map(([k, v]) => `${k}: ${v}`);
    if (parts.length) return parts.join(' · ');
  }
  if (typeof body?.message === 'string' && body.message) {
    return body.message;
  }
  return error.response.statusText || 'Request failed';
}
