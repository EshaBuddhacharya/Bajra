import requests
import json

# API endpoint
BASE_URL = "http://localhost:5000/api/feast/items"

# Compulsory items data
compulsory_items = [
    {"name": "Chiura", "image": "/images/Chuira.webp", "category": "compulsory"},
    {"name": "Buff curry", "image": "/images/dyaakula.jpg", "category": "compulsory"},
    {"name": "Bhuttan", "image": "/images/bhutan.png", "category": "compulsory"},
    {"name": "Pickles", "image": "/images/mulaachar.webp", "category": "compulsory"},
    {"name": "Spinach", "image": "/images/spinach.jpeg", "category": "compulsory"},
    {"name": "Beans", "image": "/images/bodi.jpg", "category": "compulsory", "subTypes": ["Bodi", "Rajma"]},
    {"name": "Aela", "image": "/images/local.jpeg", "category": "compulsory"},
    {"name": "Paukwaa", "image": "/images/paukwa.jpeg", "category": "compulsory"},
    {"name": "Mushroom", "image": "/images/mushroom.jpg", "category": "compulsory"},
    {"name": "Cauliflower", "image": "/images/cauli.jpg", "category": "compulsory"},
    {"name": "Dahi", "image": "/images/juju.webp", "category": "compulsory"},
    {"name": "Aalu Tama", "image": "/images/aalutama.jpg", "category": "compulsory"}
]

# Additional items data
additional_items = [
    {"name": "Mutton curry", "image": "/images/dyaakula.jpg", "category": "additional", "pricePerPerson": 100},
    {"name": "Fish", "image": "/images/fishfry.jpg", "category": "additional", "pricePerPerson": 80},
    {"name": "Farsi", "image": "/images/pump.jpeg", "category": "additional", "pricePerPerson": 50},
    {"name": "Laisu", "image": "/images/laisu.jpg", "category": "additional", "pricePerPerson": 40},
    {"name": "Mix Fruits", "image": "/images/salad.jpeg", "category": "additional", "pricePerPerson": 60},
    {"name": "Juice", "image": "/images/coke.webp", "category": "additional", "pricePerPerson": 30}
]

# Dessert items data
dessert_items = [
    {"name": "Laalmon", "image": "/images/laalmon.jpg", "category": "dessert", "pricePerPerson": 50}
]

def populate_feast_items():
    # Combine all items
    all_items = compulsory_items + additional_items + dessert_items
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    # Send POST request for each item
    for item in all_items:
        try:
            # Validate required fields
            if not item.get('name') or not item.get('category'):
                print(f"Skipping item - name and category are required")
                continue

            # Validate category
            if item['category'] not in ['compulsory', 'additional', 'dessert']:
                print(f"Skipping {item['name']} - invalid category")
                continue

            # Validate pricePerPerson for additional and dessert items
            if (item['category'] in ['additional', 'dessert']) and not item.get('pricePerPerson'):
                print(f"Skipping {item['name']} - price per person required for {item['category']} items")
                continue

            response = requests.post(BASE_URL, json=item, headers=headers)
            if response.status_code == 201:
                print(f"Successfully added {item['name']}")
            else:
                print(f"Failed to add {item['name']}. Status code: {response.status_code}")
        except Exception as e:
            print(f"Error adding {item['name']}: {str(e)}")

if __name__ == "__main__":
    populate_feast_items()
