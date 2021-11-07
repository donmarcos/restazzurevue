<template>
  <ion-page>
    <ion-content class="ion-padding">
      <Header />
      <h1 class="greeting">
        Hi, Kasonde!
      </h1>
      <p class="greeting-tag">
        Schedule your Time  Now  !!
      </p>
      <!-- <img src="assets/img/zend_trans.png" class="card-img" @click="cardDetails()" /> -->
      <div class="grid-container-element">
       <div class="card">
           <ion-img width="80" height="80" src="assets/img/loving_trans.png"></ion-img>
           <div class="card">
             <h3 class="title">Zend</h3>
                  <ion-fab vertical="bottom" horizontal="end" edge slot="fixed">
                     <ion-fab-button @click="schDetails('Zend')">
                       <ion-icon :icon="calendarNumberOutline"></ion-icon>
                      </ion-fab-button>
                   </ion-fab>
           </div>
       </div>
      <div class="card">
           <ion-img width="80" height="80" src="assets/img/visual_trans.png"></ion-img>
           <div class="card">
            <h3 class="title">Yoga</h3>
                  <ion-fab vertical="bottom" horizontal="end" edge slot="fixed" >
                    <ion-fab-button @click="schDetails('Yoga')">
                      <ion-icon :icon="calendarNumberOutline"></ion-icon>
                     </ion-fab-button>
                  </ion-fab>
          </div>
      </div>

 </div>

       <div class="cardout">
         <h3 class="title">Wellnes Chat</h3>
            <ion-img width="80%" height="1%" src="assets/img/reflection_trans.png"></ion-img>
            <div class="cardout">
              
               <ion-fab vertical="bottom" horizontal="end" edge slot="fixed" >
                <ion-fab-button @click="goChat()">
                 <ion-icon :icon="calendarNumberOutline"></ion-icon>
               </ion-fab-button>
            </ion-fab>
      </div>
   </div>
     <p/><p/>
      <RecentList :data="recentList" />
    </ion-content>
  </ion-page>
</template>

<script>
import { 
  IonPage, 
  IonContent,
  IonImg,
  IonIcon,
  IonFab,
  IonFabButton
} from "@ionic/vue";

import { arrowBack, add, caretForwardCircleOutline, calendarNumberOutline } from "ionicons/icons";

import Header from "../components/Header";

import RecentList from "../components/RecentList";



export default {
  name: "home",
  title: "Home",
  requiresAuth: false,
  components: {
    IonPage,
    RecentList,
    Header,
    IonContent,
    IonImg,
    IonIcon,
    IonFab,
    IonFabButton
  },
  setup() {
  return {
    arrowBack, 
    add,
    caretForwardCircleOutline,
    calendarNumberOutline,
   }
  },
  data() {
    return {
      recentList: [
        {
          name: "Monday",
          cost: "10 mins/5 points",
          description: "Break IN",
          color: "#36AEEA"
        },
        {
          name: "Tuesday",
          cost: "10 mins/10 points",
          description: "Off Hours",
          color: "#226391"
        },
        {
          name: "Wednesday",
          cost: "20 mins/10 points",
          description: "Lunch",
          color: "#797A7C"
        },
        {
          name: "Tursday",
          cost: "15 mins/15 points",
          description: "Off hours",
          color: "#D8373F"
        },
      ],
    };
  },
  methods: {
     backFn() {
       this.$router.go(-1);
   },
    schDetails(inSelection) {
      this.$router.push({
        name : "card-details",
        params: {selection: inSelection}
      });
    },
     goChat() {
      this.$router.push({
      name : "chat",
     });
   }
  }
};
</script>

<style lang="scss" scoped>
ion-content {
  --background: var(--brand-secondary);
}

h1.greeting {
  font-size: 24px;
  color: #000000;
}

p.greeting-tag {
  color: var(--brand-tertiary);
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
}

.card-img {
  margin: 30px 0;
}

.grid-container-element { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    width: 100%; 
} 

.cardout {
   width: 90%;
   height: 30%;
   padding: 1.6rem 2rem;
   background: #f3f3f3;
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   border-radius: 2.5rem;
   margin-bottom: 1.5rem;

   ion-img {
     width:200px!important;
     height:100px!important;
     object-fit: cover;
   }
}

.card {
   width: 90%;
   padding: 1.6rem 2rem;
   background: #f3f3f3;
   display: flex;
   flex-direction: column;
   align-items: center;
   position: relative;
   border-radius: 2.5rem;
   margin-bottom: 1.5rem;

   .card-content{
     text-align: center;

    .title {
      font-weight: 700;
      font-size: 1.1rem;
      margin-bottom: 0.2rem;
      color: #1d1d1d;
    }
     
     ion-img {
       width:40px!important;
       height:40px!important;
       object-fit: cover;
     }

     ion-buttons {
       position: absolute;
       bottom: -1rem;
       left: 10%;
       transform: translateX(-50%); 

         ion-button {
           --background: var(--brand-primary);
           font-weight: 700;
           color: #fff;
           width: 40px;
           height: 40px;

           --padding-start: 0;
           --padding-end: 0;
           --padding-top: 0;
           --padding-bottom: 0;
         }

            ion-fab-button {
                  --background: var(--brand-primary);
                  bottom: 55px;
                   margin-right: 15px;
                   position: relative;
                  transform: rotate(44deg);
                  --border-radius: 15px;
                  border: 3px solid #fff;
                }             
     }
   }
}
</style>
