return async (profileimage, username, fname, lname, phoneno, country, cconversion) => {

  //Get current date
  const now = this.DonorPortal_GetDateTime()

  //Get users table
  const users = $getGrid('users')
  //Get current user details
  let currentUserUID = fbUser.uid
  //Get current user row
  let currentUser = _.find(users, { user: fbUser.uid })
  let currentUserRowKey = currentUser.rowKey

  //Setting Profile Values
  $setDataGridVal('users', currentUserRowKey + '.dateJoined', now)
  $setDataGridVal('users', currentUserRowKey + '.profileImage', profileimage)
  $setDataGridVal('users', currentUserRowKey + '.username', username)
  $setDataGridVal('users', currentUserRowKey + '.firstName', fname)
  $setDataGridVal('users', currentUserRowKey + '.lastName', lname)
  $setDataGridVal('users', currentUserRowKey + '.phonenumber', phoneno)
  $setDataGridVal('users', currentUserRowKey + '.location', country)
  $setDataGridVal('users', currentUserRowKey + '.comparisonCurrency', cconversion)


  //Profile Complete Value
  //$setDataGridVal('users', currentUserRowKey + '.profileComplete', true)

  //$setUser('profileSetUpStep', 'complete')

  //Call Send Confirmation Email Workflow
  //await this.callWf({ workflow: '-N05ktsmJ1-FlKZtHjLi' })

  //Redirect User to Dashboard
  //$setCurrentSubTab('-MyvUthgoLrT0z0HdIX9', '-Mx_5FLL2jlxjXYUMdIL')
}