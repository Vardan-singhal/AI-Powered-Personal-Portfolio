import { useForm } from 'react-hook-form';
export default function ProjectForm({ onSubmit, defaultValues }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  const submit = (data) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (k === 'images' && v?.length) Array.from(v).forEach((f) => fd.append('images', f));
      else fd.append(k, v);
    });
    onSubmit(fd);
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="card space-y-3">
      <input className="input" placeholder="Title" {...register('title', { required: true })} />
      <textarea className="input" placeholder="Description" {...register('description', { required: true })} />
      <textarea className="input" placeholder="Long description" {...register('longDescription')} />
      <input className="input" placeholder="Technologies (comma separated)" {...register('technologies')} />
      <input className="input" placeholder="GitHub URL" {...register('githubUrl')} />
      <input className="input" placeholder="Live URL" {...register('liveUrl')} />
      {/* <input type="file" multiple accept="image/*" {...register('images')} className="text-sm" /> */}
      {/* <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('featured')} /> Featured</label> */}
      <button className="btn-primary">Save</button>
    </form>
  );
}
