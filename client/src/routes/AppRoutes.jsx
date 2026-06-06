import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import Home from '../pages/Home';
import About from '../pages/About';
import Skills from '../pages/Skills';
import Projects from '../pages/Projects';
import Experience from '../pages/Experience';
import Github from '../pages/Github';
import ResumeReviewer from '../pages/ResumeReviewer';
import JobMatcher from '../pages/JobMatcher';
import Contact from '../pages/Contact';
import Login from '../pages/Login';

import Dashboard from '../pages/admin/Dashboard';
import ManageProjects from '../pages/admin/ManageProjects';
import ManageKnowledge from '../pages/admin/ManageKnowledge';
import ManageHome from '../pages/admin/ManageHome';
import ManageAbout from '../pages/admin/ManageAbout';
import ManageExperience from '../pages/admin/ManageExperience';
import ManageSkills from '../pages/admin/ManageSkills';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/github" element={<Github />} />
        <Route path="/resume" element={<ResumeReviewer />} />
        <Route path="/job-match" element={<JobMatcher />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/projects" element={<ManageProjects />} />
        <Route path="/admin/knowledge" element={<ManageKnowledge />} />
        <Route path="/admin/pages/home" element={<ManageHome />} />
        <Route path="/admin/pages/about" element={<ManageAbout />} />
        <Route path="/admin/pages/experience" element={<ManageExperience />} />
        <Route path="/admin/pages/skills" element={<ManageSkills />} />
      </Route>
    </Routes>
  );
}
