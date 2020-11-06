export const validateUsername = (value: string) => {
  let error
  if (!value) {
    error = 'Username is required'
  }
  return error || true
}