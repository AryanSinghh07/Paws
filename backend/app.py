from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os
import csv
import json

app = Flask(__name__)
CORS(app)

# File paths for data storage
ORDERS_FILE = 'data/orders.csv'
CARTS_FILE = 'data/carts.csv'

# Ensure data directory exists
os.makedirs('data', exist_ok=True)

# Initialize CSV files if they don't exist
def init_csv_files():
    if not os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['order_id', 'order_number', 'user_id', 'items', 'total', 'customer_info', 'order_date'])

    if not os.path.exists(CARTS_FILE):
        with open(CARTS_FILE, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['user_id', 'items', 'updated_at'])

init_csv_files()

def save_order_to_csv(order_data):
    with open(ORDERS_FILE, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([
            order_data.get('order_id'),
            order_data.get('orderNumber'),
            order_data.get('userId'),
            json.dumps(order_data.get('items', [])),
            order_data.get('total'),
            json.dumps(order_data.get('customerInfo', {})),
            order_data.get('orderDate')
        ])

def get_order_from_csv(order_number):
    with open(ORDERS_FILE, 'r', newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if int(row['order_number']) == int(order_number):
                return {
                    'order_id': row['order_id'],
                    'orderNumber': int(row['order_number']),
                    'userId': row['user_id'],
                    'items': json.loads(row['items']),
                    'total': float(row['total']),
                    'customerInfo': json.loads(row['customer_info']),
                    'orderDate': row['order_date']
                }
    return None

def save_cart_to_csv(cart_data):
    # Read existing carts
    existing_carts = []
    try:
        with open(CARTS_FILE, 'r', newline='') as f:
            reader = csv.DictReader(f)
            existing_carts = list(reader)
    except FileNotFoundError:
        pass

    # Update or add new cart
    cart_updated = False
    for cart in existing_carts:
        if cart['user_id'] == cart_data['user_id']:
            cart['items'] = json.dumps(cart_data['items'])
            cart['updated_at'] = datetime.utcnow().isoformat()
            cart_updated = True
            break

    if not cart_updated:
        existing_carts.append({
            'user_id': cart_data['user_id'],
            'items': json.dumps(cart_data['items']),
            'updated_at': datetime.utcnow().isoformat()
        })

    # Write all carts back to file
    with open(CARTS_FILE, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=['user_id', 'items', 'updated_at'])
        writer.writeheader()
        writer.writerows(existing_carts)

def get_cart_from_csv(user_id):
    try:
        with open(CARTS_FILE, 'r', newline='') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['user_id'] == user_id:
                    return {
                        'user_id': row['user_id'],
                        'items': json.loads(row['items']),
                        'updated_at': row['updated_at']
                    }
    except FileNotFoundError:
        pass
    return None

def get_user_orders_from_csv(user_id):
    orders = []
    try:
        with open(ORDERS_FILE, 'r', newline='') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row['user_id'] == user_id:
                    orders.append({
                        'order_id': row['order_id'],
                        'orderNumber': int(row['order_number']),
                        'items': json.loads(row['items']),
                        'total': float(row['total']),
                        'customerInfo': json.loads(row['customer_info']),
                        'orderDate': row['order_date']
                    })
    except FileNotFoundError:
        pass
    return sorted(orders, key=lambda x: x['orderDate'], reverse=True)

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        order_data = request.json
        order_data['order_id'] = str(hash(datetime.utcnow().isoformat()))
        order_data['created_at'] = datetime.utcnow().isoformat()
        
        save_order_to_csv(order_data)
        
        return jsonify({
            'success': True,
            'order_id': order_data['order_id'],
            'message': 'Order created successfully'
        }), 201
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/orders/<order_number>', methods=['GET'])
def get_order(order_number):
    try:
        order = get_order_from_csv(order_number)
        
        if order:
            return jsonify({
                'success': True,
                'order': order
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Order not found'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/cart', methods=['POST'])
def save_cart():
    try:
        cart_data = request.json
        save_cart_to_csv(cart_data)
        
        return jsonify({
            'success': True,
            'message': 'Cart saved successfully'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/cart/<user_id>', methods=['GET'])
def get_cart(user_id):
    try:
        cart = get_cart_from_csv(user_id)
        
        if cart:
            return jsonify({
                'success': True,
                'cart': cart
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Cart not found'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/orders/user/<user_id>', methods=['GET'])
def get_user_orders(user_id):
    try:
        orders = get_user_orders_from_csv(user_id)
        return jsonify({
            'success': True,
            'orders': orders
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 