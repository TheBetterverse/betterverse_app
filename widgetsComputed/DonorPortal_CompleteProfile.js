return async () => {

  //Get users table
  const users = $getGrid('users')

  //Get current date
  const now = this.DonorPortal_GetDateTime()

  //Get current user details
  let currentUserUID = fbUser.uid
  
  //Get current user row
  let currentUser = _.find(users, { user: fbUser.uid })
  let currentUserRowKey = currentUser.rowKey

  //Profile Complete Value
  $setDataGridVal('users', currentUserRowKey + '.profileComplete', true)
  $setDataGridVal('users', currentUserRowKey + '.dateJoined', now)

  $setUser('profileSetUpStep', 'complete')

  //Call Send Confirmation Email Workflow
  await this.callWf({ workflow: '-N05ktsmJ1-FlKZtHjLi' })

  //Redirect User to Dashboard
  $setCurrentSubTab('-MyvUthgoLrT0z0HdIX9', '-Mx_5FLL2jlxjXYUMdIL')
}