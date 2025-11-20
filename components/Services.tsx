import React from 'react';
import { motion } from 'framer-motion';

const services = [
  { title: 'Branding', desc: 'Building distinct identities.' },
  { title: 'UI/UX', desc: 'Designing seamless digital experiences.' },
  { title: 'Development', desc: 'Robust and scalable code solutions.' },
  { title: 'Graphic Design', desc: 'Visual storytelling at its best.' }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Content */}
          <div className="lg:col-span-5 relative">
            <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase mb-6">
              Our Process
            </span>
            <h2 className="font-display font-bold text-5xl md:text-7xl leading-tight mb-8 uppercase">
              Empowering your <br />
              business with <br />
              <span className="text-outline-black">Tailored Creative</span> <br />
              Solutions
            </h2>
            
            {/* Floating Element Placeholder */}
            <div className="relative w-full h-64 md:h-96 mt-12">
               <div className="absolute top-0 left-0 bg-pinnacle-dark text-white p-4 text-xs rounded shadow-lg transform -rotate-6 z-10">
                  Strategy First
               </div>
               <img 
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Creative Process" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
               />
            </div>
          </div>

          {/* Right List - Sticky on larger screens if needed, but keeping simple here */}
          <div className="lg:col-span-1 hidden lg:block border-r border-gray-200 h-full"></div>

          <div className="lg:col-span-6 flex flex-col justify-center h-full pt-12">
             <div className="mb-12">
                <span className="inline-block bg-pinnacle-green/20 text-pinnacle-green px-3 py-1 rounded-full text-xs font-bold uppercase mb-4">
                  Capabilities
                </span>
                <h3 className="font-display font-bold text-4xl uppercase mb-2">Good Reasons to Choose CampusHub</h3>
                <p className="text-gray-500">Our process and capabilities include:</p>
             </div>

             <div className="space-y-8">
                {services.map((service, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group border-b border-gray-200 pb-6 hover:border-black transition-colors cursor-default"
                  >
                    <h4 className="font-display text-4xl md:text-6xl text-gray-300 group-hover:text-pinnacle-dark transition-colors font-bold uppercase">
                      {service.title}
                    </h4>
                    <p className="mt-2 text-gray-500 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-300">
                      {service.desc}
                    </p>
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};