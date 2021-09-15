export const getAddressTitle = address => {
    return `${address.BuildingNo}  ${address.Street}  ${address.Remark}  ${address.RowNo} ${address.FlatNo} `
}


export const addParamsToLocation = (params , store) => {
    store.dispatch('product/get' , params)
    history.pushState(
        {},
        null,
        this.$route.path +
        '?' +
        Object.keys(params)
            .map(key => {
            return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
            )
            })
            .join('&')
    )
    window.scrollTo({ top:0, behavior: 'smooth'});
}