import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyAtTzB5eQsRc7Y6Rp-ObYEphKcbD_UR1ds',
    authDomain: 'food-delivery-app-d8c41.firebaseapp.com',
    databaseURL: 'https://food-delivery-app-d8c41-default-rtdb.firebaseio.com',
    projectId: 'food-delivery-app-d8c41',
    storageBucket: 'food-delivery-app-d8c41.appspot.com',
    messagingSenderId: '415540276214',
    appId: '1:415540276214:web:fdb90cb003e6d9c1ff35d7',
}

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, firestore, storage};