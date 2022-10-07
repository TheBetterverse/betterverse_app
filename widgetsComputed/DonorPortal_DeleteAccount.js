return async () => {
  let currentUser = await this.DonorPortal_GetCurrentUser()
  let confirmDelete = confirm(
    "We're sad to see you go! \r\nAre you sure you want to delete your account?"
  )
  if (confirmDelete == true) {
    let confirmSure = confirm(
      'Are you sure!?'
    )
    if (confirmSure == true) {
      $signOut({
        redirect:
          '/dashboard/-N3z8rEgVVtApDNoNjXV?tab=-Mx_5FLL2jlxjXYUMdIL&subtab=-N0ZsOs2dAbF9PTr_Hz0'
      })
      
      await this.callWf({
        workflow: '-NB2imtu4zZWVrOca09u',
        payload: {
          userRowKey: currentUser.rowKey,
        },
      })
    } else {
      return null
    }
  }
}