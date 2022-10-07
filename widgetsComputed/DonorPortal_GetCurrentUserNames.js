/* DonorPortal_GetCurrentUserNames.js */

return function (nameChoice) {
  if (nameChoice === undefined) nameChoice = 'username'
  else nameChoice = nameChoice.toLowerCase()

  let { firstName, lastName, username } = this.DonorPortal_GetCurrentUser()

  switch (nameChoice) {
    case 'first':
      if (firstName === null) return username
      return firstName

    case 'last':
      if (lastName === null) return username
      return lastName

    case 'full':
      if (firstName === null && lastName === null) {
        return username
      }
      else if (firstName === null || lastName === null) {
        return username
      }
      else if (firstName != null && lastName != null){
        return `${firstName} ${lastName}`
      }
    case 'username':
      return username

    default:
      return null
  }
}

// suggestion
// - returns an Object with all the names, making it more inline with the function name (GetUserNames)
// - it's kinda hard in javascript to know if you must pass "first", "FIRST", "First", "firstname", "FirstName", for example.
//   and kinda cumbersome to switch all of these cases.
//   I lowercased the nameChoice var so it can match "first", "First" and "FIRST". but anyways, I think it's better to have separate functions.
// - eg:
//    - GetCurrentUser_FirstName
//    - GetCurrentUser_LastName
//    - GetCurrentUser_FullName
//    - GetCurrentUser_Username

function getUserNames() {
  let { firstName, lastName, username } = this.DonorPortal_GetCurrentUser()

  return {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    username
  }
}
