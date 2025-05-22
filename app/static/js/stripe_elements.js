document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('payment-form');
    const publishableKey = paymentForm.dataset.publishableKey;

    if (!publishableKey) {
        console.error('Stripe publishable key not found.');
        const cardErrors = document.getElementById('card-errors');
        if (cardErrors) {
            cardErrors.textContent = 'Stripe is not configured correctly. Publishable key is missing.';
        }
        return;
    }

    const stripe = Stripe(publishableKey);

    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const cardErrors = document.getElementById('card-errors');
    const submitButton = document.getElementById('submit-button');
    const amountInput = document.getElementById('amount');

    paymentForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        submitButton.disabled = true;
        cardErrors.textContent = ''; // Clear previous errors

        const amount = parseInt(amountInput.value, 10);
        if (isNaN(amount) || amount <= 0) {
            cardErrors.textContent = 'Please enter a valid amount.';
            submitButton.disabled = false;
            return;
        }

        try {
            // Step 1: Create a PaymentIntent on the server
            const response = await fetch('/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amount }), // Send amount in dollars/euros etc.
            });

            const paymentIntentData = await response.json();

            if (response.ok && paymentIntentData.clientSecret) {
                // Step 2: Confirm the card payment with the client secret
                const { error, paymentIntent } = await stripe.confirmCardPayment(
                    paymentIntentData.clientSecret,
                    {
                        payment_method: {
                            card: cardElement,
                            // billing_details: { name: 'Jenny Rosen' } // Optional
                        },
                    }
                );

                if (error) {
                    cardErrors.textContent = error.message;
                    submitButton.disabled = false;
                } else {
                    // Payment succeeded
                    cardErrors.textContent = ''; // Clear errors
                    // Show a success message to your customer
                    // e.g., paymentIntent.id
                    alert('Payment successful! Payment Intent ID: ' + paymentIntent.id);
                    // Optionally, redirect to a success page
                    // window.location.href = '/payment-success';
                    submitButton.disabled = false; // Re-enable for another payment
                    cardElement.clear(); // Clear the card element
                }
            } else {
                // Handle errors from our server (e.g., invalid amount, server error)
                const errorMessage = paymentIntentData.error && paymentIntentData.error.message 
                                     ? paymentIntentData.error.message 
                                     : 'Failed to create payment intent. Please try again.';
                cardErrors.textContent = errorMessage;
                submitButton.disabled = false;
            }
        } catch (networkError) {
            cardErrors.textContent = 'Network error. Please check your connection and try again.';
            submitButton.disabled = false;
        }
    });
});
