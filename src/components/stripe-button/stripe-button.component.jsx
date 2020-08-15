import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishabelKey = 'pk_test_51H7Q2rH68yrVzgPsSTftk7vDx9tiq34QRL8nEsYAjMxJ75rwJuBsfQqeLJemm9z8oSdvVyZ9uou5vqczgclit2rC008h77gwOw'

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="E-Commerce Ltd"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishabelKey}
        >

        </StripeCheckout>
    )
}

export default StripeCheckoutButton;