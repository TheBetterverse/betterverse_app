/* Validation_UsernameIsValid.js */

return subject => {
  let isValid = true
  
  /* check for bad words */
  if (!this.Validation_NoBadWords(subject.toLowerCase())) isValid = false

  return isValid
}
