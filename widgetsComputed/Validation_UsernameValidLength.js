/* Validation_UsernameHasValidLength.js */

return subject => {
    if (subject.length >= 4){
        return true
    }
    else{
        return false
    }
}