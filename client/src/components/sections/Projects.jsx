import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder, FiX } from 'react-icons/fi';
import Skeleton from '../ui/Skeleton';

// Premium Modal Component for Project Details
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white/95 border border-white/80 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh] md:max-h-[85vh] glass-card"
      >
        {/* Header/Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
          aria-label="Close details"
        >
          <FiX size={18} />
        </button>

        {/* Project Image */}
        <div className="h-48 md:h-64 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
          {project.image ? (
            <img
              src={project.image.startsWith('http') ? project.image : `${import.meta.env.VITE_API_BASE_URL}${project.image}`}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <FiFolder size={64} className="text-slate-300" />
          )}
          <span className="absolute bottom-4 left-4 text-xs font-semibold px-3 py-1 bg-purple-500 text-white rounded-full shadow-md">
            {project.category}
          </span>
        </div>

        {/* Scrollable details */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">{project.title}</h3>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About the Project</h4>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies && project.technologies.map(tag => (
                <span key={tag} className="text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg border border-purple-100/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-all"
          >
            <FiGithub size={16} /> Code
          </a>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
            >
              <FiExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        console.log("Fetching projects from:", API_URL);
        const response = await fetch(`${API_URL}/api/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
           throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            A showcase of my recent work, highlighting my journey in Development.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass-card overflow-hidden flex flex-col h-full border border-white/60">
                <div className="h-48 bg-slate-100 relative">
                   <Skeleton className="w-full h-full" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <Skeleton className="h-7 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-6" />
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
           <div className="text-center text-slate-500">No projects found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card hover:-translate-y-2 transition-transform duration-300 overflow-hidden flex flex-col h-full border border-white/60"
              >
                <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden group flex items-center justify-center">
                  {/* Dynamic Image or Fallback Icon */}
                  {project.image ? (
                     <img 
                       src={project.image.startsWith('http') ? project.image : `${import.meta.env.VITE_API_BASE_URL}${project.image}`} 
                       alt={project.title} 
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                     />
                  ) : (
                    <div className={`transform transition-transform duration-500 group-hover:scale-110`}>
                       <FiFolder size={48} className="text-slate-300" />
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-1">{project.title}</h3>
                  
                  {/* Fixed description height for pixel-perfect card alignment */}
                  <div className="h-[72px] overflow-hidden mb-2">
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-purple-600 hover:text-purple-700 text-xs font-semibold mb-4 self-start flex items-center gap-1 group/btn transition-colors"
                  >
                    Read More <span className="inline-block transform transition-transform group-hover/btn:translate-x-1">→</span>
                  </button>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies && project.technologies.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100">
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                      <FiGithub size={16} /> Code
                    </a>
                    {project.liveLink && (
                       <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors">
                         <FiExternalLink size={16} /> Live Demo
                       </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
