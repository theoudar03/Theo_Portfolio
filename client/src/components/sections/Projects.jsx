import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder, FiCode } from 'react-icons/fi';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${API_URL}/api/projects`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-20">Loading Projects...</div>;

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

        {projects.length === 0 ? (
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
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  
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
    </section>
  );
};

export default Projects;
