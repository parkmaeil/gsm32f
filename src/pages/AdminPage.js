// src/pages/AdminPage.js
import React from 'react';
import { Container, Typography } from '@mui/material';

export default function AdminPage() {
  return (
    <Container sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        관리자 페이지
      </Typography>
      <Typography>
        여기서는 관리자만 접근할 수 있는 기능을 구현하세요.
      </Typography>
    </Container>
  );
}