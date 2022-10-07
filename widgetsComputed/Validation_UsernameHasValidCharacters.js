/* Validation_UsernameHasValidCharacters.js */

return subject => {
    const invalidCharacters = /^[a-zA-Z\-\.\_0-9]+$/

    return invalidCharacters.test(subject)
}