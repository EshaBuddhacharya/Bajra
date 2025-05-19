import requests

# API endpoint
BASE_URL = "http://localhost:5000/api/feast/orders"

def test_feast_orders():
    # Simple test order with minimum required fields
    test_order = {
        "peopleCount": 5,
        "compulsoryItems": [
            {
                "item": "682b503cc1c411e0526e84c0",  # Chiura
                "selectedSubType": None
            }
        ],
        "additionalItems": [
            {
                "item": "682b5051c1c411e0526e84d8",  # Mutton curry
                "pricePerPerson": 100
            }
        ],
        "desserts": [
            {
                "item": "682b5051c1c411e0526e84e4",  # Laalmon
                "pricePerPerson": 50
            }
        ],
        "basePricePerPlate": 500,
        "deliveryCharge": 200,
        "totalPrice": 3200  # (500 + 100 + 50) * 5 people + 200 delivery
    }

    try:
        # Create order
        response = requests.post(BASE_URL, json=test_order)
        if response.status_code == 201:
            print("Order created successfully!")
        else:
            print(f"Failed to create order: {response.text}")

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    test_feast_orders()


