import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function ProjectForm({
  onSubmit,
  defaultValues,
  isEditing = false,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(
      defaultValues || {
        title: '',
        description: '',
        longDescription: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        featured: false,
      }
    );
  }, [defaultValues, reset]);

  const submit = (data) => {
    const fd = new FormData();

    Object.entries(data).forEach(([k, v]) => {
      if (k === 'images' && v?.length) {
        Array.from(v).forEach((f) =>
          fd.append('images', f)
        );
      } else {
        fd.append(k, v);
      }
    });

    onSubmit(fd);
  };

  const inputClasses = `
    w-full
    px-4
    py-3
    rounded-xl
    bg-neutral-900
    border
    border-yellow-500/15
    text-zinc-100
    placeholder:text-zinc-500
    outline-none
    transition
    focus:border-yellow-400
    focus:ring-1
    focus:ring-yellow-400/30
  `;

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="
        rounded-2xl
        border
        border-yellow-500/15
        bg-neutral-950
        p-6
        space-y-4
        shadow-lg
      "
    >
      <input
        className={inputClasses}
        placeholder="Project Title"
        {...register('title', {
          required: true,
        })}
      />

      <textarea
        rows={4}
        className={inputClasses}
        placeholder="Short Description"
        {...register('description', {
          required: true,
        })}
      />

      <textarea
        rows={6}
        className={inputClasses}
        placeholder="Long Description"
        {...register('longDescription')}
      />

      <input
        className={inputClasses}
        placeholder="Technologies (comma separated)"
        {...register('technologies')}
      />

      <input
        className={inputClasses}
        placeholder="GitHub Repository URL"
        {...register('githubUrl')}
      />

      <input
        className={inputClasses}
        placeholder="Live Demo URL"
        {...register('liveUrl')}
      />

      {/* Existing Images */}
      {isEditing &&
        defaultValues?.images?.length > 0 && (
          <div>
            <p className="text-sm text-zinc-400 mb-2">
              Existing Images
            </p>

            <div className="flex flex-wrap gap-3">
              {defaultValues.images.map(
                (img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`Project ${
                      index + 1
                    }`}
                    className="
                      w-24
                      h-24
                      object-cover
                      rounded-lg
                      border
                      border-yellow-500/20
                    "
                  />
                )
              )}
            </div>
          </div>
        )}

      <input
        type="file"
        multiple
        accept="image/*"
        {...register('images')}
        className="text-sm text-zinc-300"
      />

      <label className="flex items-center gap-2 text-sm text-zinc-300">
        <input
          type="checkbox"
          {...register('featured')}
        />
        Featured Project
      </label>

      <button
        type="submit"
        className="
          px-6
          py-3
          rounded-xl
          bg-brand-600
          text-black
          font-semibold
          transition
          hover:scale-105
          hover:shadow-lg
        "
      >
        {isEditing
          ? 'Update Project'
          : 'Save Project'}
      </button>
    </form>
  );
}

