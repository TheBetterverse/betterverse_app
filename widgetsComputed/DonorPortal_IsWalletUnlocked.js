return async function () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let unlocked;

    try {
        const accounts = await provider.listAccounts();

        unlocked = accounts.length > 0;
    } catch (e) {
        unlocked = false;
    }

    console.log(unlocked)

    return unlocked;
}