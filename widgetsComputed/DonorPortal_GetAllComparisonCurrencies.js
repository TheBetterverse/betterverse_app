//DonorPortal_GetAllComparisonCurrencies.js

return function(){
    const conversionCurrencies = $getGrid('conversionCurrencies')
    let currencies = conversionCurrencies.reduce((currencies, currency) => {
        currencies.push(currency.currency)
        return currencies
      }, [])
}