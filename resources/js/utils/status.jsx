export function status(status){
    
    let bagde = "badge-info"

    if(status.toLowerCase() == 'approved') {
        bagde = "badge-success"
    } 
    if(status.toLowerCase() == 'rejected') {
        bagde = "badge-error"
    } 

    
    return (
        <>
            <span className={`badge badge-xs ${bagde} font-semibold`}>{status}</span>
        </>
    )
}


export function jenis(jenis){
    let bagde = "badge-info"

    if(jenis.toLowerCase() == 'service') {
        bagde = "badge-accent"
    } 
    if(jenis.toLowerCase() == 'oli') {
        bagde = "badge-warning"
    } 
    if(jenis.toLowerCase() == 'ban') {
        bagde = "badge-primary"
    } 
    if(jenis.toLowerCase() == 'aki') {
        bagde = "badge-neutral"
    } 
    if(jenis.toLowerCase() == 'pajak_1_tahun') {
        bagde = "badge-outline badge-success"
    } 
    if(jenis.toLowerCase() == 'pajak_5_tahun') {
        bagde = "badge-success"
    } 
    if(jenis.toLowerCase() == 'kir') {
        bagde = "badge-outline badge-warning"
    } 
    if(jenis.toLowerCase() == 'apar') {
        bagde = "badge-outline badge-error"
    } 

    
    return (
        <>
            <span className={`badge badge-xs ${bagde} font-semibold`}>{jenis}</span>
        </>
    )
}