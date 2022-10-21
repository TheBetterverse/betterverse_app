/* Validation_UsernameIncludeLetters.js */

return subject => {  
    const characters = /(.*[a-z]){3}/i

    return characters.test(subject)
}