import http from '~/utilities/http.js';

export const state = () => ({
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    couponLoading: false,
    checkoutLoading: false,
    // activeCart: [],
    // activeWishlist: [],
    orderLoading:false,
    cart: [],
    cartCount : null,
    orders: []
});

export const mutations = {
    setLoading(state, payload) {
        state.loading = payload;
    },
    updateCartAfterCartUpdated(state, payload){
        const product = state.cart.products.filter(item => {
            return item.id === payload.id ? item : ''
        })[0]
        product ? product.qty = payload.qty : ''
          
    },
    setOrderLoading(state, payload) {
        state.orderLoading = payload;
    },
    setCreateLoading(state, payload) {
        state.createLoading = payload;
    },
    setUpdateLoading(state, payload) {
        state.updateLoading = payload;
    },
    setCouponLoading(state, payload) {
        state.couponLoading = payload;
    },
    setDeleteLoading(state, payload) {
        state.deleteLoading = payload;
    },
    setCart(state, payload) {
        state.cart = payload;
    },
    setCartTotals(state, payload) {
        state.cart.subtotal = payload.subtotal;
        state.cart.total = payload.total;
    },
    removeCartProduct(state, payload) {
        state.cart.products = state.cart.products.filter(pr => {
            return pr.id == payload ? '' : pr
        })
    },
    setCartCount(state, payload) {
        state.cartCount = payload;
    },
    setCheckoutLoading(state, payload) {
        state.checkoutLoading = payload;
    },
    setOrders(state, payload) {
        state.orders = payload;
    },
};

export const getters = {
    loading(state){
        return state.loading
    },
    activeCart(state){
        const ids = []
        if(state.cart.products){
            state.cart.products.forEach(pr => {
                ids.push(pr.id)
            });
        }
        return ids
    },
    orderLoading(state){
        return state.orderLoading
    },
    cartCount(state){
        return state.cartCount
    },
    checkoutLoading(state){
        return state.checkoutLoading
    },
    couponLoading(state){
        return state.couponLoading
    },
    createLoading(state){
        return state.createLoading
    },
    updateLoading(state){
        return state.updateLoading
    },
    couponLoading(state){
        return state.updateLoading
    },
    deleteLoading(state){
        return state.deleteLoading
    },
    cart(state){
        return state.cart
    },
    orders(state){
        return state.orders
    },
    cartLength(state){
        const length = typeof state.cart.products !== 'undefined' ? state.cart.products.length : 0
        return length
    },
}
export const actions = {
    get({ commit }) {
        commit('setLoading', true);
        return new Promise((resolve, reject) => {
            http
            .get("cart")
            .then(res => {
                commit('setCart', res.data);
                commit('setCartCount', res.data.products.length);
                commit('setLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setLoading', false);
                reject(e.response.data);
            })
        })
    },
    getTotals({ commit }) {
        return new Promise((resolve, reject) => {
            http
            .get("cart/totals")
            .then(res => {
                commit('setCartTotals', res.data);
                resolve(res);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
    getOrders({ commit }) {
        commit('setOrderLoading', true);
        return new Promise((resolve, reject) => {
            http
            .get(`user/orders`)
            .then(res => {
                commit('setOrders', res.data);
                commit('setOrderLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setOrderLoading', false);
                reject(e.response.data);
            })
        })
    },
    create({ commit , dispatch }, payload) {
        commit('setCreateLoading', true);
        return new Promise((resolve, reject) => {
            http
            .post("cart" , payload)
            .then(res => {
                dispatch('get');
                const snackbar = {
                    active : true,
                    text: 'added_to_cart_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                commit('setCreateLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setCreateLoading', false);
                reject(e);
            })
        })
    },
    update({ commit , dispatch }, payload) {
        commit('setUpdateLoading', true);
        return new Promise((resolve, reject) => {
            http
            .put(`cart/${payload.id}` , {qty : payload.qty})
            .then(res => {
               // dispatch('get');
                commit('setUpdateLoading', false);
                const snackbar = {
                    active : true,
                    text: 'cart_updated_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                // commit('updateCartAfterCartUpdated' , payload)
                http
                .get("cart")
                .then(res => {
                    commit('setCart', res.data);
                    commit('setCartCount', res.data.products.length);
                })
                commit('product/updateProductAfterCartUpdated' , payload , {root : true})
                resolve(res);
            })
            .catch(e => {
                commit('setUpdateLoading', false);
                console.log(e)
                // reject(e.response.data);
            })
        })
    },
    applyCoupon({ commit , dispatch }, payload) {
        commit('setCouponLoading', true);
        return new Promise((resolve, reject) => {
            http
            .post("cart/coupon" , payload)
            .then(res => {
                dispatch('get');
                commit('setCouponLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setCouponLoading', false);
                reject(e.response.data);
            })
        })
    },
    remove({commit , dispatch , state} , payload) {
        commit('setDeleteLoading', true);
        return new Promise((resolve, reject) => {
            http
            .delete(`cart/${payload}`)
            .then(res => {
                dispatch('getTotals');
                commit('setDeleteLoading', false);
                const snackbar = {
                    active : true,
                    text: 'deleted_from_cart_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                commit('removeCartProduct' , payload)
                commit('setCartCount' , state.cartCount - 1)

                resolve(res);
            })
            .catch(e => {
                commit('setDeleteLoading', false);
                reject(e.response.data);
            })
        })     
    },
    checkout({ commit , dispatch }) {
        commit('setCheckoutLoading', true);
        return new Promise((resolve, reject) => {
            http
            .post("cart/checkout")
            .then(res => {
                const snackbar = {
                    active : true,
                    text: 'added_to_cart_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                dispatch('get');
                commit('setCheckoutLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setCheckoutLoading', false);
                reject(e.response.data);
            })
        })
    },
    applyAddress({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            http
            .put(`cart/address/${payload}`)
            .then(res => {
                dispatch('get');
                resolve(res);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
   
}
