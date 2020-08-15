import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const shopSelectorCollection = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [shopSelectorCollection],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = memoize(collectionUrlParam =>
    createSelector(
        [shopSelectorCollection],
        collections => collections[collectionUrlParam]
    ));