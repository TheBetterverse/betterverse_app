return function () {
  //Get users table
  const users = $getGrid('users')

  //Get current user row
  let currentUser = _.find(users, { user: fbUser.uid })

  return currentUser
}
