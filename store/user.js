import http from '~/utilities/http.js';

export const state = () => ({
    addresses: [],
    addressesLoading : false,
    sections: [],
    areas: [],
    selectedSection:"",
    address:{}
});

export const mutations = {
    setAddresses(state, payload) {
        state.addresses = payload;
    },
    addressesLoading(state, payload) {
        state.addressesLoading = payload;
    },
    setSections(state, payload) {
        state.sections = payload;
    },
    setAreas(state, payload) {
        state.areas = payload;
    },
    setAddress(state, payload) {
        state.address = payload;
    },
    setSelectedSection(state, payload)    {
        state.selectedSection = payload
    },
    

};

export const getters = {
    addresses: state => {
        return state.addresses
    },
    addressesLoading: state => {
        return state.addressesLoading
    },
    address: state => {
        return state.address
    },
    areas: state => {
        return state.areas
    },
    sections: state => {
        return state.sections
    },
    selectedSection: state => {
        return state.selectedSection
    },
    
}
export const actions = {
    getAddresses({ commit }) {
        return new Promise((resolve, reject) => {
            http
            .get("address/list")
            .then( async (data) => {
                commit('setAddresses', data.data);
                resolve(data.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
    getSections({ commit }) {
        return new Promise((resolve, reject) => {
            http
            .get("area/list")
            .then( async (data) => {
                commit('setSections', data.data);
                resolve(data.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
    getAreas({ commit } , payload) {
        return new Promise((resolve, reject) => {
            http
            .get(`area/list?SectionNo=${payload}`)
            .then( async (data) => {
                commit('setAreas', data.data);
                resolve(data.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
    getAddress({ commit } , payload) {
        return new Promise((resolve, reject) => {
            http
            .get(`address/find/${payload}`)
            .then( async (data) => {
                console.log(data.data)
                commit('setSelectedSection', data.data.section);
                commit('setAreas', data.data.areas);
                let address = data.data
                delete address.area
                delete address.areas
                delete address.section
                delete address.created_at
                delete address.updated_at
                commit('setAddress', address);
                resolve(data.data);
            })
            .catch(e => {
                reject(e);
            })
        })
    },
    attachAddress({commit , dispatch} , payload) {
        return new Promise((resolve, reject) => {
            http
            .post("address" , payload)
            .then( async (data) => {
                dispatch('getAddresses')
                const snackbar = {
                    active : true,
                    text: 'address_created_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                resolve(data.data);
            })
            .catch(e => {
                // console.log(e)
              reject(e.response.data);
            })
          })
    },
    editAddress({} , payload) {
        return new Promise((resolve, reject) => {
            http
            .put(`address/${payload.id}` , payload.address)
            .then( async (data) => {
                // dispatch('getAddresses')
                resolve(data.data);
            })
            .catch(e => {
              reject(e.response.data);
            })
          })
    },
    addPhone({} , payload) {
        return new Promise((resolve, reject) => {
            http
            .post(`user/phone` , payload)
            .then( async (data) => {
                // dispatch('getAddresses')
                resolve(data.data);
            })
            .catch(e => {
              reject(e.response.data);
            })
          })
    },
    editPhone({} , payload) {
        return new Promise((resolve, reject) => {
            http
            .put(`user/phone/${payload.id}` , {phone : payload.phone})
            .then( async (data) => {
                // dispatch('getAddresses')
                resolve(data.data);
            })
            .catch(e => {
              reject(e.response.data);
            })
          })
    },
    editAccount({} , payload) {
        return new Promise((resolve, reject) => {
            http
            .put(`user` , payload)
            .then( async (data) => {
                // dispatch('getAddresses')
                resolve(data.data);
            })
            .catch(e => {
              reject(e.response.data);
            })
          })
    },
    deletePhone({} , payload) {
        return new Promise((resolve, reject) => {
            http
            .delete(`user/phone/${payload}`)
            .then( async (data) => {
                resolve(data.data);
            })
            .catch(e => {
              reject(e.response.data);
            })
          })
    },
    deleteAddress({commit , dispatch} , payload) {
        
        return new Promise((resolve, reject) => {
            http
            .delete(`address/${payload}`)
            .then( async (data) => {
                dispatch('getAddresses')
                const snackbar = {
                    active : true,
                    text: 'address_deleted_successfully'
                }
                commit('ui/setSnackbar' , snackbar , {root : true})
                commit('ui/deleteAddressModal' , {active : false , id : null} , {root : true})
                resolve(data.data);
            })
            .catch(e => {
              reject(e.response.data);
            })
          })
    }
};
