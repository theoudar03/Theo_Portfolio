import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCode, FiGlobe } from 'react-icons/fi';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column: Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
              About Me <span className="w-12 h-1 bg-purple-500 rounded-full inline-block"></span>
            </h2>
            
            <div className="glass-card p-6 md:p-8 space-y-4 text-lg text-slate-600 leading-relaxed border-l-4 border-purple-500">
              <p>
                I am an <strong className="text-slate-800">Electronics and Communication Engineering</strong> student passionate about software development and building real-world technology solutions.
              </p>
              <p>
                My current focus is on becoming a <strong className="text-slate-800">backend-focused full-stack developer</strong>, working with <strong className="text-slate-800">Java, Spring Boot, React</strong>, and modern web technologies, while also exploring <strong className="text-slate-800">IoT and embedded systems</strong> to bridge software with hardware applications.
              </p>
              <p>
                I enjoy <strong className="text-slate-800">solving complex problems</strong>, building practical projects, and continuously improving my skills in creating <strong className="text-slate-800">scalable and maintainable systems</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration/Graphic */}
          <div className="relative flex justify-center items-center">
            {/* Character Illustration */}
            <div className="relative z-10 w-full max-w-lg">
              <img 
                src="/abt-man.png" 
                alt="Developer Character" 
                className="w-full h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
