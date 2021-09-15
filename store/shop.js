

export const state = () => ({
    products: 6,
    priceModel : [0,5000],
    searchModel:'',
    pageModel : 1

});

export const mutations = {
    setProducts(state, payload) {
        state.products = products;
    },
    priceModel(state , payload){
        state.priceModel = payload;

    },
    searchModel(state , payload){
        state.searchModel = payload;
    },
    pageModel(state , payload){
        state.pageModel = payload;
    }
};

export const getters = {
    products: state => state.products,
    searchModel: state => state.searchModel,
    pageModel: state => state.pageModel,
    priceModel: state => state.priceModel
}