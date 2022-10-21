/* DonorPortal_UserToPermanent.js */

return function (form) {
  let { email, password } = form

  $anonUserToPermanent('emailAndPassword', { email, password })
    .then(() => {
      $setCurrentTab('-Mx_5FLL2jlxjXYUMdIL')
      $setGlobalModel('signInProcess', false)
    })
    .catch(err => {
      $setGlobalModel('signInProcess', false)
      alert(err.message)
    })
}
