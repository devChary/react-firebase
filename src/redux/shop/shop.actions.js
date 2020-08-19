import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchInitialCollections = () => ({
    type: ShopActionTypes.FETCH_INITAL_COLLECTIONS
})

export const fetchInitalCollectionsAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchInitialCollections())
        collectionRef.get()
            .then(async snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                updateCollections(collectionsMap);

                this.setState({ loading: false })
            })
    }
}