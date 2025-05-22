from flask import render_template, request, jsonify, current_app
import stripe
from app import app # Assuming 'app' is the Flask app instance from __init__.py

@app.route('/')
def index():
    publishable_key = current_app.config.get('STRIPE_PUBLISHABLE_KEY')
    return render_template('payment.html', publishable_key=publishable_key)

@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.get_json()
        amount = data.get('amount')

        if not amount or not isinstance(amount, int) or amount <= 0:
            return jsonify(error={'message': 'Invalid amount provided.'}), 400

        # Convert amount to cents
        amount_in_cents = amount * 100

        payment_intent = stripe.PaymentIntent.create(
            amount=amount_in_cents,
            currency='usd',
            automatic_payment_methods={'enabled': True}, # Enable automatic payment methods
        )
        return jsonify({
            'clientSecret': payment_intent.client_secret
        })
    except Exception as e:
        current_app.logger.error(f"Error creating PaymentIntent: {e}")
        return jsonify(error={'message': str(e)}), 500
