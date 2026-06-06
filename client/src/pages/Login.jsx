import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const submit = async (e) => {
    e.preventDefault();
    try { const u = await login(form.email, form.password); nav(u.role === 'admin' ? '/admin' : '/'); }
    catch { toast.error('Invalid credentials'); }
  };
  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <form onSubmit={submit} className="card mt-6 space-y-3">
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary w-full">Sign in</button>
      </form>
    </div>
  );
}
