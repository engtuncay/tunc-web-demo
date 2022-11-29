import Vue from 'vue'
import firebase from 'vuejs-egitimi-master/B8/firebase-vue-app/src/firebase'
import VueFire from 'vuefire'

Vue.use(VueFire)

// Initialize Firebase
var config = {
    apiKey: "YOUR-API-KEY",
    authDomain: "vue-app-2.firebaseapp.com",
    databaseURL: "https://vue-app-2.firebaseio.com",
    projectId: "vue-app-2",
    storageBucket: "vue-app-2.appspot.com",
    messagingSenderId: "219260382113"
};
firebase.initializeApp(config);

export const db = firebase.database();
export const productsRef = db.ref("products");
