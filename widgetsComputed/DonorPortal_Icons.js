return function(icon){

    if (icon == 'copy'){
        const copy = $getGrid('icons').filter(row => row.name == 'copy')
        return copy[0].icon.url
    }

    else if (icon == 'linkedin'){
        const copy = $getGrid('icons').filter(row => row.name == 'linkedin')
        return copy[0].icon.url
    }

    else if (icon == 'whatsapp'){
        const copy = $getGrid('icons').filter(row => row.name == 'whatsapp')
        return copy[0].icon.url
    }
    
    else if (icon == 'telegram'){
        const copy = $getGrid('icons').filter(row => row.name == 'telegram')
        return copy[0].icon.url
    }

}