import http from '~/utilities/http.js';
export const state = () => ({
    loading: false,
    createLoading: false,
    deleteLoading: false,
    switchLoading: false,
    wishlist: []
});

export const mutations = {
    setLoading(state, payload) {
        state.loading = payload;
    },
    switchLoading(state, payload) {
        state.switchLoading = payload;
    },
    setCreateLoading(state, payload) {
        state.createLoading = payload;
    },
    setDeleteLoading(state, payload) {
        state.deleteLoading = payload;
    },
    setWishlist(state, payload) {
        state.wishlist = payload;
    },
};

export const getters = {
    loading(state){
        return state.loading
    },
    switchLoading(state){
        return state.switchLoading
    },
    activeWishlist(state){
        const ids = []
        state.wishlist.forEach(pr => {
            ids.push(pr.id)
        });
        return ids
    },
    createLoading(state){
        return state.createLoading
    },
    deleteLoading(state){
        return state.deleteLoading
    },
    wishlist(state){
        return state.wishlist
    },
    wishlistLength(state){
        return state.wishlist.length
    },
}
export const actions = {
    get({ commit }) {
        return new Promise((resolve, reject) => {
            http
            .get("wishlist")
            .then(res => {
                if(res.data == 'no items'){
                    commit('setWishlist', []);
                } else {
                    commit('setWishlist', res.data);
                }
                commit('setLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('setLoading', false);
                reject(e.response.data);
            })
        })
    },
    create({ commit , dispatch }, payload) {
        commit('setCreateLoading', true);
        return new Promise((resolve, reject) => {
            http
            .post("wishlist" , payload)
            .then(res => {
                dispatch('get');
                if(res.data == 'deleted'){
                    commit('product/productWishlist' , {id : payload , active :false} , {root : true});
                    commit('setCreateLoading', false);
                    const snackbar = {
                        active : true,
                        text: 'removed_from_wishlist_successfully'
                    }
                    commit('ui/setSnackbar' , snackbar , {root : true})
                }else {
                    commit('product/productWishlist' , {id : payload , active :true} , {root : true});
                    commit('setCreateLoading', false);
                    const snackbar = {
                        active : true,
                        text: 'added_to_wishlist_successfully'
                    }
                    commit('ui/setSnackbar' , snackbar , {root : true})

                }
                resolve(res);
            })
            .catch(e => {
                commit('setCreateLoading', false);
                reject(e);
            })
        })
    },
    switch({commit , dispatch} , payload) {
        commit('switchLoading', true);
        return new Promise((resolve, reject) => {
            http
            .post(`wishlist/switch/${payload.id}` , {qty : payload.qty} )
            .then(res => {
                dispatch('get');
                dispatch('cart/get' , '', {root:true});
                commit('switchLoading', false);
                const snackbar = {
                    active : true,
                    text: 'added_to_wishlist_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                resolve(res);
            })
            .catch(e => {
                commit('switchLoading', false);
                reject(e.response.data);
            })
        })     
    },
    remove({commit , dispatch} , payload) {
        commit('deleteLoading', true);
        return new Promise((resolve, reject) => {
            http
            .delete(`wishlist/${payload}`)
            .then(res => {
                dispatch('get');
                commit('deleteLoading', false);
                resolve(res);
            })
            .catch(e => {
                commit('deleteLoading', false);
                reject(e.response.data);
            })
        })     
    }
   
}
