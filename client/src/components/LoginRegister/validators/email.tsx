export const validateEmail = (value: string) => {
  let error
  if (!value) {
    error = 'Email is required'
  }
  return error || true
}