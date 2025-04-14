import React, { useEffect, useState } from 'react';

function Cart() {
 
  const [customers, setCustomers] = useState([]);
  const [username, setUsername] = useState('user1');

  useEffect(() => {
    fetchCustomerCart(username);
  }, [username]);

  const fetchCustomerCart = (username) => {
    fetch(`http://localhost:8081/api/customer/carts/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('네트워크 응답 오류');
        return res.json();
      })
      .then((data) => setCustomers(data))
      .catch((err) => {
        console.error('에러 발생:', err);
        setCustomers([]);
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🧾 고객 장바구니 정보</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="사용자 이름 입력"
        style={{ marginBottom: 10 }}
      />
      <button onClick={() => fetchCustomerCart(username)}>조회</button>

      {customers.length === 0 ? (
        <p>고객 정보를 불러오는 중이거나 데이터가 없습니다.</p>
      ) : (
        customers.map((customer) => (
          <div key={customer.username} style={{ border: '1px solid #ccc', marginTop: 20, padding: 10 }}>
            <h2>👤 {customer.name} ({customer.username})</h2>
            <p>나이: {customer.age}</p>
            <h3>🛒 장바구니</h3>
            <ul>
              {customer.carts.map((cart, idx) => (
                <li key={idx} style={{ marginBottom: 10 }}>
                  <strong>{cart.book.title}</strong> - {cart.book.author} / {cart.book.price}원  
                  <br />
                  수량: {cart.quantity} / 날짜: {new Date(cart.cartDate).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );

}

export default Cart;