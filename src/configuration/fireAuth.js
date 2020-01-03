
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// Initialize Firebase
import { serviceFirebase } from "../service/firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(serviceFirebase)
}
// export const authProviders = {
//   Google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   Facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   Phone: {
//     provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//     recaptchaParameters: {
//       type: 'image', // 'audio'
//       size: 'normal', // 'invisible' or 'compact'
//       badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
//     },
//     defaultCountry: 'VN'
//   }
// }
export const fireDb = firebase.firestore()
export const firebaseApp = firebase
