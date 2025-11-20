import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    name: 'Vinayak',
    role: 'Founder',
    description: 'Visionary leader driving Campus Hub\'s mission to empower students worldwide.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    color: 'text-pinnacle-green'
  },
  {
    name: 'Shiven',
    role: 'Co-Founder & Graphics Lead',
    description: 'Creative genius responsible for our stunning visual identity and design excellence.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    color: 'text-pinnacle-orange'
  },
  {
    name: 'Saumil & Pratham',
    role: 'Designer & Lead Developer',
    description: 'Design experts ensuring every project meets the highest aesthetic standards.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    color: 'text-pinnacle-purple'
  },
  {
    name: 'Sachi & Preet',
    role: 'Social Media Team',
    description: 'Dynamic duo managing our online presence and community engagement.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop',
    color: 'text-blue-500'
  }
];

export const Team: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pinnacle-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pinnacle-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-white text-black px-4 py-1 rounded-full text-sm font-bold uppercase mb-4 shadow-sm border border-gray-100">
            Our Team
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl uppercase mb-4">
            Meet the <br /><span className="text-pinnacle-green">Talent</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            The talented individuals behind Campus Hub driving innovation and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative mb-6 rounded-2xl overflow-hidden aspect-[4/5]">
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="text-center">
                <h3 className="font-display font-bold text-2xl uppercase mb-1 group-hover:text-black transition-colors">
                  {member.name}
                </h3>
                <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${member.color}`}>
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};