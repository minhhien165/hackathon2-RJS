import React, { useState } from 'react';
import './bootstrap.min.css';
import './style.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingCart: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Pizza',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 30,
      quantity: 0,
      image: 'src/assets/images/pizza.jpg',
    },
    {
      id: 2,
      name: 'Hamburger',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 15,
      quantity: 4,
      image: 'src/assets/images/Hamburger.jpg',
    },
    {
      id: 3,
      name: 'Bread',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 20,
      quantity: 1,
      image: 'src/assets/images/bread.jpg',
    },
    {
      id: 4,
      name: 'Cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 10,
      quantity: 1,
      image: 'src/assets/images/Cake.jpg',
    },
  ]);

  const [cart, setCart] = useState<Product[]>([
    {
      id: 4,
      name: 'Cake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 10,
      quantity: 15,
      image: 'images/cake.jpg',
    },
    {
      id: 2,
      name: 'Hamburger',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dicta asperiores veniam repellat unde debitis quisquam magnam magni ut deleniti!',
      price: 15,
      quantity: 32,
      image: 'images/Hamburger.jpg',
    },
  ]);

  const [notification, setNotification] = useState<string>('');

  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setNotification('Add to cart successfully');
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
    setNotification('Delete successfully');
    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter((item) => item.id !== productId));
      setNotification('Delete successfully');
      setTimeout(() => {
        setNotification('');
      }, 2000);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
      );
      setNotification('Update successfully');
      setTimeout(() => {
        setNotification('');
      }, 2000);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1 className="panel-title">List Products</h1>
            </div>
            <div className="panel-body" id="list-product">
              {products.map((product) => (
                <div key={product.id}>
                  <div className="media product">
                    <div className="media-left">
                      <a href="#">
                        <img className="media-object" src={product.image} alt={product.name} />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{product.name}</h4>
                      <p>{product.description}</p>
                      <span className="price" onClick={() => product.quantity > 0 && addToCart(product)}>
                        {product.price} USD
                      </span>
                      {product.quantity > 0 && <span>Quantity: {product.quantity}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
          <div className="panel panel-danger">
            <div className="panel-heading">
              <h1 className="panel-title">Your Cart</h1>
            </div>
            <div className="panel-body">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '4%' }}>STT</th>
                    <th>Name</th>
                    <th style={{ width: '15%' }}>Price</th>
                    <th style={{ width: '4%' }}>Quantity</th>
                    <th style={{ width: '25%' }}>Action</th>
                  </tr>
                </thead>
                <tbody id="my-cart-body">
                  {cart.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.price} USD</td>
                      <td>
                        <input
                          type="number"
                          name={`cart-item-quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, +e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          className="label label-info update-cart-item"
                          onClick={() => updateQuantity(item.id, item.quantity)}
                        >
                          Update
                        </button>
                        <button
                          className="label label-danger delete-cart-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot id="my-cart-footer">
                  <tr>
                    <td colSpan={4}>
                      There are <b>{cart.length}</b> items in your shopping cart.
                    </td>
                    <td colSpan={2} className="total-price text-left">
                      {calculateTotalPrice()} USD
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {notification && (
              <div className="alert alert-success" role="alert" id="mnotification">
                {notification}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

