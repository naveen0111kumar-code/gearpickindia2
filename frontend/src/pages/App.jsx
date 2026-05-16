import React, { useState } from 'react';
import { api } from '../api/client';
export default function App() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('founder@demo.com');
  const [password, setPassword] = useState('password123');
  const [campaigns, setCampaigns] = useState([]);
  const register = async () => api.post('/auth/register', { email, password, tenantName: 'demo' });
  const login = async () => setToken((await api.post('/auth/login', { email, password })).data.token);
  const loadCampaigns = async () => setCampaigns((await api.get('/campaigns', { headers: { Authorization: `Bearer ${token}` } })).data);
  return <div style={{fontFamily:'sans-serif',padding:24}}><h1>AI Marketing OS</h1><button onClick={register}>Register</button><button onClick={login}>Login</button><button onClick={loadCampaigns}>Load Campaigns</button><pre>{JSON.stringify(campaigns,null,2)}</pre></div>;
}
