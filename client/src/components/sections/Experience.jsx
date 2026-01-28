import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiAward, FiMapPin, FiCalendar } from 'react-icons/fi';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${API_URL}/api/experience`);
        if (response.ok) {
          const data = await response.json();
          setExperiences(data);
        }
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-slate-50/50 min-h-[500px] flex items-center justify-center">
        <div className="text-slate-500">Loading Experience...</div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Experience & Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {experiences.length === 0 ? (
            <div className="text-center text-slate-500">No experience entries found.</div>
          ) : (
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8 md:pl-12"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[9px] top-0 w-5 h-5 bg-white border-4 rounded-full ${exp.isCurrent ? 'border-purple-500' : 'border-blue-500'}`}></div>
                  
                  <div className="glass-card p-6 md:p-8 hover:border-blue-200 transition-colors border border-white/60 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md rounded-xl">
                    <div className="flex flex-col md:flex-row justify-between mb-2 md:items-start gap-2">
                       <div>
                         <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                           {exp.type && exp.type.toLowerCase().includes('intern') ? <FiBriefcase className="text-blue-500 shrink-0" /> : <FiAward className="text-purple-500 shrink-0" />}
                           {exp.title}
                         </h3>
                         <h4 className="text-md font-semibold text-blue-600 mt-1">{exp.organization}</h4>
                       </div>
                       
                       <div className="flex flex-col items-start md:items-end gap-1">
                         <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-2">
                           <FiCalendar size={14} />
                           {exp.duration}
                         </span>
                         {exp.isCurrent && (
                           <span className="text-xs font-bold text-white bg-purple-500 px-2 py-0.5 rounded-full">
                             Current
                           </span>
                         )}
                       </div>
                    </div>

                    {exp.location && (
                      <div className="flex items-center gap-1 text-slate-400 text-sm mb-3">
                        <FiMapPin size={14} />
                        {exp.location}
                      </div>
                    )}

                    <p className="text-slate-600 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
