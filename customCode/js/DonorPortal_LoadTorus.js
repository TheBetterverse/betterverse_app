(async () => {

    var wallerProvider = $vm.DonorPortal_GetCurrentUserWalletProvider()
    var walletAddress = $vm.DonorPortal_GetCurrentUserWalletAddress()

    if (wallerProvider == "Torus" && walletAddress != null){
        //$vm.DonorPortal_ConnectWallet('Torus')
    }
    else{
        return null
    }

})();   