import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchInitialCollections = () => ({
    type: ShopActionTypes.FETCH_INITAL_COLLECTIONS
})

export const fetchCollectionSucess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMsg => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMsg
})

export const fetchInitalCollectionsAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchInitialCollections())
        collectionRef.get()
            .then(async snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                dispatch(fetchCollectionSucess(collectionsMap))
            }).catch(err => dispatch(fetchCollectionsFailure(err)));
    }
}