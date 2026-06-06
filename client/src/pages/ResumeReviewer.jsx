import { useState } from 'react';
import ResumeUpload from '../components/resume/ResumeUpload';
import ATSScore from '../components/resume/ATSScore';
import ResumeFeedback from '../components/resume/ResumeFeedback';
import { reviewResume } from '../services/resumeService';
import toast from 'react-hot-toast';

export default function ResumeReviewer() {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);
  const handle = async (file) => {
    setLoading(true);
    try { setReview(await reviewResume(file)); }
    catch (e) { toast.error(e.response?.data?.message || 'Failed'); }
    finally { setLoading(false); }
  };
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-4xl font-bold">AI Resume Reviewer</h1>
      <p className="text-slate-400">Upload a PDF resume — get an ATS score and detailed feedback powered by Gemini.</p>
      <ResumeUpload onUpload={handle} loading={loading} />
      {review && (
        <>
          <ATSScore score={review.atsScore} />
          <ResumeFeedback review={review} />
        </>
      )}
    </div>
  );
}
