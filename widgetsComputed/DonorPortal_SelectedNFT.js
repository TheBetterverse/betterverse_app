/* DonorPortal_SelectedNFT.js */

memoize = {}

return async function () {
  let nft = $getUser('Donation_SelectedNFT')

  if (!(nft in memoize)) memoize[nft] = await (await fetch(nft)).json()

  return memoize[nft]
}
