// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  // 초기값: 로컬스토리지에 남아 있는 토큰
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // token이 바뀔 때마다 디코딩 & 로컬스토리지 업데이트
  useEffect(() => {
    if (token) {
      // 1) 토큰이 있으면 로컬스토리지에 최신화
      localStorage.setItem('token', token);
      // 2) 토큰 디코딩하여 user 상태 설정
      try {
        const decoded = jwtDecode(token);
        // decoded에 담긴 이메일 필드 이름(sub/email 등)에 맞춰 추출
        setUser({ email: decoded.sub || decoded.email });
      } catch {
        // 디코딩 실패 시 user를 null로
        setUser(null);
      }
    } else {
     // 토큰이 없으면 (로그아웃 등) 로컬스토리지 삭제 & user 초기화
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const login = (newToken) => setToken(newToken);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}