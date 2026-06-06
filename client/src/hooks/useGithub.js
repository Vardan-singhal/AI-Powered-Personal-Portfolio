import { useEffect, useState } from 'react';
import { getGithubStats } from '../services/githubService';
export default function useGithub() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getGithubStats().then(setData).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, []);
  return { data, loading, error };
}
