
import http from '~/utilities/http.js';
export const state = () => ({
    settings: [],
   contacts : [],
    
    links : [],
    sliders: [],
    slidersLoading: false,
    bannersLoading: [],
    banners: false,
});

export const mutations = {
    contacts(state, payload) {
        state.contacts = payload;
    },
    settings(state, payload) {
        state.settings = payload;
    },
    links(state, payload) {
        state.links = payload;
    },
    settings(state, payload) {
        state.settings = payload;
    },
    settingsLoading(state, payload) {
        state.settingsLoading = payload;
    },
    bannersLoading(state, payload) {
        state.bannersLoading = payload;
    },
    banners(state, payload) {
        state.banners = payload;
    },
    sliders(state, payload) {
        state.sliders = payload;
    },
    slidersLoading(state, payload) {
    state.slidersLoading = payload;
    },
};

export const getters = {
    contacts(state){
        return state.contacts
    },
    settings(state){
        return state.settings
    },
    sliders(state) {
        return state.sliders;
    },
    settings(state) {
        return state.settings;
    },
    settingsLoading(state) {
        return state.settingsLoading;
    },
    logo(state) {
        return state.settings.logo;
    },

    address(state) {
        return state.settings.address;
    },

    phone(state) {
        return state.settings.phone;
    },

    email(state) {
        return state.settings.email;

    },

    about(state) {
        return state.settings.about;

    },

    about_ar(state) {
        return state.settings.about_ar;

    },
    bannersLoading(state) {
        return state.bannersLoading;
    },
    banners(state) {
        return state.banners;
    },
    slidersLoading(state) {
    return state.slidersLoading;
    },
    links(state){
        return state.links
    },
    
   
}
export const actions = {
    getSliders({commit}){
        commit("slidersLoading", true);
        return new Promise((resolve, reject) => {
            http.get(`banners/sliders`)
            .then(res => {
              commit("slidersLoading", false)
              commit("sliders", res.data)
              resolve(res.data)
            })
            .catch((res) => {
              commit("slidersLoading", false)
              reject(res);
            });
        });
      },
      getSettings({commit}){
        return new Promise((resolve, reject) => {
            http.get(`settings`)
            .then(res => {
                const contacts = [
                {
                    icon : 'phone-outline',
                    title : res.data.phone,
                },
                {
                    icon : 'email-outline',
                    title : res.data.email,
                }]
                const links = [
                    {
                        title : "facebook",
                        url : res.data.facebook,
                        icon : "facebook"
                    },
                    {
                        title : "instagram",
                        url : res.data.instagram,
                        icon : "instagram"
                    },
                ]
              commit('contacts' , contacts)
              commit('links' , links)
              commit('settings' , res.data)
              resolve(res.data)
            })
            .catch((res) => {
              reject(res);
            });
        });
      },
      getHomeBnners({commit}){
        commit("bannersLoading", true);
        return new Promise((resolve, reject) => {
            http.get(`banners/home`)
            .then(res => {
                commit("bannersLoading", false)
                commit("banners", res.data)
                resolve(res.data)
            })
            .catch((res) => {
                commit("bannersLoading", false)
                reject(res);
            });
        });
    },
}
