export const validateEmailOrUsername = (value: string) => {
  let error
  if (!value) {
    error = 'Email or Username is required'
  }
  return error || true
}
