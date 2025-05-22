# Flask Stripe Integration App

This is a simple Flask application that demonstrates integration with Stripe for payments.

## Configuration

This application requires Stripe API keys to function.

### Obtaining Stripe API Keys

1.  Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2.  Navigate to the **Developers** section, then click on **API Keys**.
3.  You will find your **Publishable key** (e.g., `pk_test_YOUR_PUBLISHABLE_KEY`) and **Secret key** (e.g., `sk_test_YOUR_SECRET_KEY`).

**Note:** Use your test API keys for development and your live API keys for production.

### Setting Environment Variables

The application expects the Stripe API keys to be set as environment variables:

*   `STRIPE_PUBLISHABLE_KEY`: Your Stripe Publishable Key.
*   `STRIPE_SECRET_KEY`: Your Stripe Secret Key.

**Examples:**

**Linux/macOS (in your terminal or `~/.bashrc` / `~/.zshrc`):**

```bash
export STRIPE_PUBLISHABLE_KEY='your_publishable_key'
export STRIPE_SECRET_KEY='your_secret_key'
```

Remember to source your shell configuration file (e.g., `source ~/.bashrc`) or open a new terminal session for the changes to take effect.

**Using a `.env` file (recommended for development):**

Create a file named `.env` in the project root directory with the following content:

```
STRIPE_PUBLISHABLE_KEY='your_publishable_key'
STRIPE_SECRET_KEY='your_secret_key'
```

Make sure to add `.env` to your `.gitignore` file to prevent committing your secret keys. To load these variables when the application starts, you can use a library like `python-dotenv`. Install it with `pip install python-dotenv` and add the following to the beginning of your `run.py` or `app/__init__.py`:

```python
from dotenv import load_dotenv
load_dotenv()
```

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2.  Create a virtual environment and activate it:
    ```bash
    python3 -m venv venv
    source venv/bin/activate 
    # On Windows, use `venv\Scripts\activate`
    ```

3.  Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4.  Set up your Stripe API keys as environment variables (see "Configuration" section above).

## Running the Application

1.  Ensure your virtual environment is activated and environment variables are set.
2.  Run the application:
    ```bash
    python run.py
    ```
3.  Open your browser and go to `http://127.0.0.1:5000/`.

## Features

This application provides the following features:

-   Integration with Stripe Elements for secure card input.
-   Dynamic creation of Stripe PaymentIntents.
-   Client-side confirmation of card payments.
-   Basic error handling and user feedback during the payment process.

### Order Management Scope

The current implementation focuses primarily on the payment processing flow using Stripe. It does **not** include comprehensive order management features such as:

-   Saving order details to a database.
-   User account creation or management.
-   Viewing order history.
-   Email notifications for order confirmation.

A successful payment currently results in an alert message displayed to the user in the browser, showing the Payment Intent ID. Further development would be required to build a complete order management system.