import stripe # Import the stripe library
from flask import Flask
from config import Config # Import the Config class

app = Flask(__name__)
app.config.from_object(Config) # Load configuration from config.py

# Set the Stripe API secret key
stripe.api_key = app.config['STRIPE_SECRET_KEY']

# STRIPE_PUBLISHABLE_KEY is now available in app.config['STRIPE_PUBLISHABLE_KEY']
# and can be accessed in templates or routes as needed.

from app import routes
