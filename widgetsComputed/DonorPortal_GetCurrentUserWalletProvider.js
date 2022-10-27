return function () {
  let walletProvider
  let currentUser = this.DonorPortal_GetCurrentUser()

  if (currentUser.walletProvider != null) {
    walletProvider = currentUser.walletProvider
  }

  if (currentUser.walletProvider == null) {
    walletProvider = null
  }

  return walletProvider
}
