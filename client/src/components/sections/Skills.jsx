import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Skeleton from '../ui/Skeleton';

const Skills = () => {
  const [skills, setSkills] = useState({ technical: [], tools: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        console.log("Fetching skills from:", API_URL); 
        const res = await fetch(`${API_URL}/api/skills`);
        if (!res.ok) {
           throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        
        // Categorize skills from DB
        const technical = data.filter(s => s.category.includes('Technical'));
        const tools = data.filter(s => s.category.includes('Tool'));
        
        setSkills({ technical, tools });
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);



  return (
    <section id="skills" className="py-24 bg-slate-50/50 relative">
       {/* Background (Unchanged) */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[30%] left-[-5%] w-64 h-64 bg-purple-100/60 rounded-full mix-blend-multiply blur-3xl opacity-60"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-64 h-64 bg-blue-100/60 rounded-full mix-blend-multiply blur-3xl opacity-60"></div>
       </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Skills & Tools</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {loading ? (
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
             {[1, 2].map((col) => (
               <div key={col} className="glass-card p-8 rounded-2xl">
                 <div className="mb-8 pb-4 border-b border-slate-100 flex items-center gap-2">
                    <Skeleton className="w-2 h-8 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                 </div>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(item => (
                       <div key={item} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-100 h-32">
                          <Skeleton className="w-12 h-12 mb-3 rounded-full" />
                          <Skeleton className="h-4 w-20" />
                          {col === 1 && <Skeleton className="h-3 w-16 mt-2" />}
                       </div>
                    ))}
                 </div>
               </div>
             ))}
          </div>
        ) : (
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {skills.technical.map((skill) => (
                <div key={skill._id} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                     {skill.iconUrl && (
                        <img 
                          src={skill.iconUrl.startsWith('http') ? skill.iconUrl : `${import.meta.env.VITE_API_BASE_URL}${skill.iconUrl}`} 
                          alt={skill.name} 
                          className="w-full h-full object-contain" 
                        />
                     )}
                  </div>
                  <span className="text-sm font-bold text-slate-800">{skill.name}</span>
                  {skill.level && (
                    <span className={`text-xs font-medium mt-1 
                      ${skill.level === 'Experienced' ? 'text-purple-600' : 
                        skill.level === 'Intermediate' ? 'text-blue-500' : 'text-slate-500'}`
                    }>
                      {skill.level}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Tools */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
              Tools & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {skills.tools.map((skill) => (
                <div key={skill._id} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                     {skill.iconUrl && (
                        <img 
                          src={skill.iconUrl.startsWith('http') ? skill.iconUrl : `${import.meta.env.VITE_API_BASE_URL}${skill.iconUrl}`} 
                          alt={skill.name} 
                          className="w-full h-full object-contain" 
                        />
                     )}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
