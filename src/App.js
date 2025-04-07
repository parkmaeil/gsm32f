import React, { useEffect, useState } from 'react';

function App() {
  const [gsmList, setGsmList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/board')
      .then(res => res.json())
      .then(data => setGsmList(data))
      .catch(err => console.error('에러 발생:', err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📄 GSM 게시글 리스트</h1>
      {gsmList.length === 0 ? (
        <p>불러오는 중...</p>
      ) : (
        <ul>
          {gsmList.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
