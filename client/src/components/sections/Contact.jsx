import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiCheckCircle, FiGithub, FiLinkedin } from 'react-icons/fi';

import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Service ID, Template ID, Public Key - USER MUST REPLACE THESE
    const serviceID = 'service_portfolio';
    const templateID = 'template_datzu9c';
    const publicKey = '3L3Txuoyqo75sPfHq';

    try {
      // 1. Send Email via EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'theoudar07@gmail.com' 
      };
      
      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      // 2. Save to Database (Optional backup)
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        // Even if DB fails, if email sent, we can consider it a partial success or log it
        console.warn("Email sent but DB save failed");
        setStatus('success'); // Still show success to user if email went through
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto glass-card p-8 md:p-12 overflow-hidden relative"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              I am currently open to new opportunities and collaborations. Feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-12">
            {/* Contact Info Side */}
            <div className="md:col-span-2 flex flex-col justify-center space-y-8">
               <div className="space-y-4">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Connect</h3>
                 <div className="flex flex-col gap-4">
                   <a href="https://www.linkedin.com/in/theoudar" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors group">
                     <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                       <FiLinkedin size={20} />
                     </div>
                     <span className="font-medium">LinkedIn</span>
                   </a>
                   <a href="https://github.com/theoudar03" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors group">
                     <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-slate-200 transition-colors">
                       <FiGithub size={20} />
                     </div>
                     <span className="font-medium">GitHub</span>
                   </a>
                 </div>
               </div>

               <div className="space-y-4">
                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Email Me</h3>
                 <a href="mailto:theoudar07@gmail.com" className="flex items-center gap-3 text-slate-600 hover:text-purple-600 transition-colors group">
                    <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-purple-50 transition-colors">
                       <FiMail size={20} />
                     </div>
                     <span className="font-medium break-all">theoudar07@gmail.com</span>
                 </a>
               </div>
            </div>

            {/* Form Side */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="Your Name"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="name@example.com"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  placeholder="Hello, I'd like to discuss..."
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={status === 'submitting' || status === 'success'}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl
                  ${status === 'success' ? 'bg-green-500 shadow-green-200' : 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-blue-200'}
                  ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                {status === 'submitting' ? 'Sending...' : 
                 status === 'success' ? <><FiCheckCircle /> Message Sent!</> : 
                 <><FiSend /> Send Message</>
                }
              </motion.button>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
