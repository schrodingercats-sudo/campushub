import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate1 = useTransform(scrollY, [0, 500], [0, 20]);

  return (
    <section id="about" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center items-center bg-gray-50">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

      {/* Abstract 3D Floating Elements (Simulated with Images/Divs) */}
      <motion.div 
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-20 right-[10%] w-64 h-64 md:w-96 md:h-96 z-0 pointer-events-none opacity-80"
      >
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" 
          alt="Abstract 3D shape" 
          className="w-full h-full object-cover rounded-full mix-blend-multiply blur-xl scale-150"
        />
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 left-[5%] w-40 h-40 md:w-72 md:h-72 z-0 pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-tr from-pinnacle-green to-blue-400 rounded-full blur-3xl opacity-40"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-display font-bold text-[15vw] md:text-[8rem] leading-[0.85] tracking-tighter text-pinnacle-dark mb-6">
            BRINGING IDEAS TO <br />
            <span className="relative inline-block">
              <ArrowRight className="absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 w-6 h-6 md:w-12 md:h-12 text-pinnacle-green transform rotate-45" />
              LIFE
            </span> 
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600"> WITH DESIGN</span> <br />
            <span className="text-pinnacle-orange">&</span> INNOVATION
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-xl mx-auto mt-8 relative"
        >
          {/* Overlaid Card Effect */}
          <div className="absolute -top-12 -right-12 w-32 h-40 bg-white p-2 shadow-xl transform rotate-6 hidden md:block">
             <img src="https://picsum.photos/seed/arch/200/300" alt="Project Thumb" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
          </div>
           <div className="absolute -bottom-12 -left-20 w-40 h-32 bg-white p-2 shadow-xl transform -rotate-3 hidden md:block">
             <img src="https://picsum.photos/seed/ui/300/200" alt="Project Thumb" className="w-full h-full object-cover" />
          </div>

          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed backdrop-blur-sm bg-white/30 p-4 rounded-xl">
            We craft impactful brands, user experiences, and custom digital solutions tailored to your needs.
          </p>
        </motion.div>

      </div>
    </section>
  );
};