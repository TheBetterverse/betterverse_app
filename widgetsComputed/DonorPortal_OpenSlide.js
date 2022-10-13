return function(){

        (async () => {
            const slide = new Slide.SDK()
            await slide.init();

            await slide.open();

            //$setDataGridVal('users', currentUserRowKey + '.walletAddress', wallet)
            //$setDataGridVal('users', currentUserRowKey + '.walletProvider', 'slide')

            //If user is on the register page and connected wallet successful, redirect to topup page
        })()

     return null
}