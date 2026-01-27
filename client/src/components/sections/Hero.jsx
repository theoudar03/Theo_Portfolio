import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-purple-200/50 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[30%] w-96 h-96 bg-indigo-200/50 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Greeting */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-500 font-medium mb-4">
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-slate-900 mb-4 tracking-tight">
            Theoudar Doss
          </motion.h1>

          {/* Role */}
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              Aspiring Web Developer
            </span>
          </motion.h2>

          {/* Intro Text / Tagline - kept minimal as requested */}
          
          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a 
              href="#projects" 
              className="group relative px-8 py-4 bg-slate-900 text-white font-medium rounded-full shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden w-full sm:w-auto text-center"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                View My Work 
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a 
              href="/resume.pdf" 
              className="group px-8 py-4 bg-white/50 backdrop-blur-sm text-slate-700 font-medium rounded-full border border-white/60 shadow-sm hover:shadow-md hover:bg-white hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Download Resume 
              <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
