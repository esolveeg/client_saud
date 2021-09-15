import http from '~/utilities/http.js';

export const state = () => ({
    isLoggedIn: false,
    loggedInUser: {}
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setLoggedInUser(state, payload) {
        state.loggedInUser = payload;
    }
};

export const getters = {
    loggedInUser: state => {
        return state.loggedInUser
      }
}
export const actions = {
    register({},payload) 
    {
        console.log(payload)

        return new Promise((resolve, reject) => {
            http
            .post("register" , payload)
            .then( async (data) => {
                
                resolve(data);
            })
            .catch(e => {
                
                reject(e.response.data);
            })
        })    
    },
    
};
