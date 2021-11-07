<template>
  <ion-page>
    <ion-content padding class="background">
      <img src="assets/img/home_trans.png" class="card-img" />

      <h1>
        Rest Azzure !!
      </h1>

      <p>
        Create a fresh  and safe virtual space 
      </p>

      <ion-button  @click="doLogin" >
        <ion-icon :icon="arrowForward">Login</ion-icon>
      </ion-button>
      <p>Login</p>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonIcon,
  IonButton,
  IonContent,
} from "@ionic/vue";

import { arrowForward } from "ionicons/icons";
import auth from '../services/auth'
import graph from '../services/graph'

export default {
  name: "Welcome",
  components: {
    IonPage,
    IonIcon,
    IonButton,
    IonContent
  },
  setup() {
    return {
      arrowForward,
      auth, graph
    }
  },
  ionViewDidEnter() {
    console.log('enter ionViewDidEnter LifeCycle');
    console.log('---> Call the Created method to ini the Azure loing')
    this.created() ;
    },
    watch: {
    // If user changes, make calls to Graph API
    user: async function() {
     await this.fetchGraphDetails()
      console.log('user changed ')
    }
  },
  data: function() {
    return {
      // User account object synced with MSAL getAccount()
      user: {},
      // Access token fetched via MSAL for calling Graph API
      accessToken: '',

      // Details fetched from Graph API, user object and photo
      graphDetails: null,
      graphPhoto: null,

      // Visibility toggles for the three details modal popups
      showUserDetails: false,
      showGraphDetails: false,
      showTokenDetails: false,

      // Any errors
      error: ''
    }
  },
  methods: {
     clickIt(){
       alert('You clicked') ;
     },
     async doLogin() {
      try {
        alert('inside doLogin')
        //await auth.login()
        this.$emit('loginComplete')
        this.fetchGraphDetails();
        this.$router.push('home')
      } catch (err) {
        this.error = err.toString()
      }
    },
     async created() {
        // Basic setup of MSAL helper with client id, or give up
        if (process.env.VUE_APP_CLIENT_ID) {
           auth.configure(process.env.VUE_APP_CLIENT_ID, false)
           // Restore any cached or saved local user
           this.user = auth.user()
          console.log(`configured ${auth.isConfigured()}`)
          } else {
           this.error = 'VUE_APP_CLIENT_ID is not set, the app will not function!'
           console.log(this.error);
          }
    },
     // Get an access token and call graphGetSelf & graphGetPhoto
    async fetchGraphDetails() {
      console.log(this.user) ;
      if (!this.user || this.user.username == 'demo@example.net') {
        return
      }

      try {
        console.log('---> triggering graph session ')
        this.graphDetails = await graph.getSelf();
        this.graphPhoto = await graph.getPhoto();
        this.accessToken = graph.getAccessToken();
        console.log(this.graphDetails.userPrincipalName ) ;
        console.log(this.graphPhoto ) ;
        
      } catch (err) {
        this.error = err
      }
    }

  }
};
</script>

<style lang="scss" scoped>
ion-content {
  text-align: center;
}

.card-img {
  width: 300px;
  margin: 80px 0 50px 0;
}

h1 {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  color: #767676;
}

ion-button {
  --background: var(--brand-primary);
  font-size: 20px;
  color: #fff;
  // padding: 10px;
  border-radius: 20px;
  margin-top: 20px;
  width: 60px;
  height: 60px;
}

ion-icon {
  background: none;
}

ion-content.background{
    --background: url('/assets/img/background.png') 0 0/100% 100% no-repeat;
}
</style>
  