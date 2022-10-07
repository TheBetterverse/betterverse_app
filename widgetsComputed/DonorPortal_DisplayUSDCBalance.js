/* DonorPortal_DisplayUSDCBalance.js */

return async () => {
  let balance = await this.DonorPortal_GetCurrentUserWalletBalance(
    this.DonorPortal_GetCurrentUserWalletAddress(),
    'USDC'
  )

  return parseFloat(balance).toFixed(2)
}
