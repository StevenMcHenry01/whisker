export const validatePassword = (value: string): string | boolean => {
  let error
  if (!value) {
    error = 'Password is required'
  } else if (value.length < 6) {
    error = 'Password must be atleast 6 characters long'
  }
  return error || true
}
