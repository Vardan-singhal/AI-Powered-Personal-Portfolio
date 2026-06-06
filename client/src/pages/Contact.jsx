import { useForm } from 'react-hook-form';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const submit = async (data) => {
    try { await api.post('/contact', data); toast.success('Message sent'); reset(); }
    catch { toast.error('Failed'); }
  };
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <form onSubmit={handleSubmit(submit)} className="card mt-6 space-y-3">
        <input className="input" placeholder="Name" {...register('name', { required: true })} />
        <input className="input" type="email" placeholder="Email" {...register('email', { required: true })} />
        <textarea className="input min-h-[140px]" placeholder="Message" {...register('message', { required: true })} />
        <button className="btn-primary">Send</button>
      </form>
      <div className="flex gap-4 justify-center mt-8 text-slate-400">
        <a href="#" className="flex items-center gap-2 hover:text-white"><FiGithub /> GitHub</a>
        <a href="#" className="flex items-center gap-2 hover:text-white"><FiLinkedin /> LinkedIn</a>
        <a href="#" className="flex items-center gap-2 hover:text-white"><FiMail /> Email</a>
      </div>
    </div>
  );
}
