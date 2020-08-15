import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCQc-xSv9mhYGyjszNA1lHFyKUikeWGIRg",
    authDomain: "e-commerce-db-6bea7.firebaseapp.com",
    databaseURL: "https://e-commerce-db-6bea7.firebaseio.com",
    projectId: "e-commerce-db-6bea7",
    storageBucket: "e-commerce-db-6bea7.appspot.com",
    messagingSenderId: "389133200161",
    appId: "1:389133200161:web:88d6ccb2232b5826542c60",
    measurementId: "G-VXMMXL1PKT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {

    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt, ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

// export const addCollectionDocs = async (collectionKey, objects) => {
//     const collectionRef = firestore.collection(collectionKey);
//     const batch = firestore.batch();
//     objects.forEach(obj => {
//         const newDocRef = collectionRef.doc();
//         batch.set(newDocRef, obj)
//     });
    
//     // console.log(await batch.commit());
//     return await batch.commit();

// }

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;