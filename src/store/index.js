import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      msalConfig: {
        auth: {
          clientId: '8778be65-ea8f-4f28-b145-5be24e4c5e0c',
          authority:
            'https://login.microsoftonline.com/9bbbc9f6-c704-4296-8c05-d6d3e87d0b27',
        },
        cache: {
          cacheLocation: 'localStorage',
        },
      },
      accessToken:""
    };
  },
  mutations :{
    setAccessToken(state, token){
      state.accessToken = token;
    }
  }
});

export default store;
