// src/pages/LoginPage.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:8081/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('jwt', data.token); // JWT 저장
        setErrorMsg('');
        alert('로그인 성공!'); // or navigate to homepage
      } else {
        setErrorMsg('이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      setErrorMsg('서버 오류가 발생했습니다.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          로그인
        </Typography>

        <TextField
          fullWidth
          label="이메일"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="비밀번호"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
        >
          로그인
        </Button>

        {token && (
          <Alert severity="success" sx={{ mt: 2 }}>
            로그인 성공! 토큰: {token.substring(0, 20)}...
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default LoginPage;
