//DonorPortal_GetAllCountries.js

return function(){
    const countries = $getGrid('locations')
    let names = countries.reduce((names, country) => {
        names.push(country.name)
        return names
      }, [])
}