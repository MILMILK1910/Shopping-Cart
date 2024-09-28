import { useState } from 'react';
import { products } from './Data';

export default function Product() {
  const [cart, setCart] = useState([]);
  const [shippingCost] = useState(100); // ค่าขนส่ง
  const [coupon, setCoupon] = useState(null); // เก็บคูปอง
  const [discount, setDiscount] = useState(0); // ส่วนลด

  // เพิ่มสินค้าไปยังตะกร้า
  function addToCart(prd) {
    const productInCart = cart.find((item) => item.id === prd.id);

    if (productInCart) {
      //เพิ่มจำนวน
      setCart(
        cart.map((item) =>
          item.id === prd.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      // ไม่มีพิ่มเข้าไปใหม่
      setCart([...cart, { ...prd, count: 1 }]);
    }
  }

  // ลบออกจากตะกร้า
  function delToCart(prd_del) {
    setCart(cart.filter((product) => product.id !== prd_del.id));
  }

  // เพิ่มจำนว
  function handleIncreaseClick(productId) {
    setCart(
      cart.map((product) =>
        product.id === productId ? { ...product, count: product.count + 1 } : product
      )
    );
  }

  // ลด
  function handleDecreaseClick(productId) {
    setCart(
      cart.map((product) =>
        product.id === productId && product.count > 1
          ? { ...product, count: product.count - 1 }
          : product
      )
    );
  }

  //ราคารวม
  function calculateTotalPrice() {
    let total = cart.reduce((total, product) => total + product.price * product.count, 0);
    total += shippingCost; // เพิ่มค่าขนส่ง

    // ถ้ามีคูปองส่วนลด
    if (coupon && coupon === 'MILMILK1910') {
      total = total * 0.9; // ลด 10% 
    }

    return total.toFixed(2);
  }

  // ตรวจสอบคูปองและตั้งค่าลด
  function applyCoupon(code) {
    if (code === 'MILMILK1910') {
      setCoupon(code);
      setDiscount(10); // ลด 10%
    } else {
      setCoupon(null);
      setDiscount(0);
    }
  }





  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <h1 className="text-6xl font-bold py-6">Flower Shop</h1>

        <div>
          <h1 className='text-3xl font-semibold py-4' >Shopping Cart</h1>
          {cart.map((product) => (
            <div key={product.id}>
              <div className='text-xl font-semibold'>{product.name}</div>
              <div className='text-lg '>{product.price} THB</div>
              <div>
                <b>จำนวน: {product.count}</b>
                <button onClick={() => handleIncreaseClick(product.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </button>
                <button onClick={() => handleDecreaseClick(product.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
                </button>
              </div>
              <button onClick={() => delToCart(product)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h2 className='text-xl text-blue-700'>ใส่โค้ดคูปอง:</h2>
          <input type="text" className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" onChange={(e) => applyCoupon(e.target.value) } />
          {coupon && <p>คูปองถูกใช้:{coupon}</p>}
        </div>

        <div className="text-xl py-4">
          <h2 >ค่าขนส่ง: {shippingCost} THB</h2>
        </div>

        <div  className="text-2xl font-bold text-rose-700">
          <h2>รวมราคา: {calculateTotalPrice()} THB</h2>
        </div>

        <h2 className='text-3xl font-bold py-3'>สินค้าที่มีอยู่:</h2>
        <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div key={product.id}>
              <button onClick={() => addToCart(product)}>
                <img alt={product.imageAlt}
                  src={product.imageSrc}
                  className="w-64 h-64 object-cover" />
                <h3 className='text-xl font-bold'>{product.name}</h3>
                <p>{product.price} THB</p>
                เพิ่มเข้าตะกร้า</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
