import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';
import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/spinner/spinner.component'


import './shop.styles.scss';
import { createStructuredSelector } from 'reselect';
import { fetchInitalCollectionsAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {


    componentDidMount() {
        const { fetchInitalCollectionsAsync } = this.props;
        fetchInitalCollectionsAsync();
    }

    render() {
        const { match, isCollectionLoaded } = this.props;
        debugger
        return (
            <div className="shop-page" >
                <Route
                    exact
                    path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner
                        isLoading={!isCollectionLoaded}
                        {...props}
                    />}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    render={(props) => <CollectionOverviewWithSpinner
                        isLoading={!isCollectionLoaded}
                        {...props}
                    />}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchInitalCollectionsAsync: () => dispatch(fetchInitalCollectionsAsync())
})

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionsLoaded
})

export default connect(null, mapDispatchToProps)(ShopPage);