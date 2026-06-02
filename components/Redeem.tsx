import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Redeem: React.FC = () => {
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate1 = useTransform(scrollY, [0, 500], [0, 20]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center items-center bg-gray-50">
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
          <h1 className="font-display font-bold text-[10vw] md:text-[6rem] leading-[0.85] tracking-tighter text-pinnacle-dark mb-6">
            REDEEM YOUR <br />
            <span className="relative inline-block">
              <ArrowRight className="absolute -left-8 md:-left-16 top-1/2 -translate-y-1/2 w-6 h-6 md:w-12 md:h-12 text-pinnacle-green transform rotate-45" />
              PREMIUM
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600"> PERKS</span> <br />
            <span className="text-pinnacle-orange">&</span> SOFTWARE
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-3xl mx-auto mt-8 relative"
        >
          {/* Overlaid Card Effect */}
          <div className="absolute -top-12 -right-12 w-32 h-40 bg-white p-2 shadow-xl transform rotate-6 hidden md:block">
            <img src="https://picsum.photos/seed/arch/200/300" alt="Design Thumb" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
          </div>
          <div className="absolute -bottom-12 -left-20 w-40 h-32 bg-white p-2 shadow-xl transform -rotate-3 hidden md:block">
            <img src="https://picsum.photos/seed/ui/300/200" alt="UI Thumb" className="w-full h-full object-cover" />
          </div>

          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed backdrop-blur-sm bg-white/30 p-4 rounded-xl">
            Claim your exclusive access to industry-standard tools for your design and creative workflow. Elevate your projects with professional software.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-4xl mx-auto">
            {/* Canva Button */}
            <a
              href="https://www.canva.com/brand/join?token=FWhe9Gw0py-XB7p8rtM_eQ&brandingVariant=edu&referrer=team-invite"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full sm:w-auto flex items-center justify-center gap-4 px-6 py-3 md:px-8 md:py-4 bg-white rounded-2xl font-bold uppercase tracking-widest overflow-hidden transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,196,204,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(125,42,232,0.5)] hover:-translate-y-2 border border-gray-100"
            >
              {/* Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C4CC]/10 to-[#7D2AE8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-md rounded-xl p-2 md:p-2.5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg" alt="Canva Logo" className="w-full h-full object-contain" />
              </div>

              <span className="relative z-10 text-sm md:text-base text-gray-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00C4CC] group-hover:to-[#7D2AE8] transition-all duration-300">
                Canva Pro Edu
              </span>
              
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 text-gray-400 group-hover:text-[#7D2AE8] group-hover:translate-x-2 transition-all duration-300" />
            </a>

            {/* Photoshop Button */}
            <button
              disabled
              className="group relative w-full sm:w-auto flex items-center justify-center gap-4 px-6 py-3 md:px-8 md:py-4 bg-gray-50 rounded-2xl font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 cursor-not-allowed border border-gray-200 shadow-sm"
            >
              {/* Icon Container */}
              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-sm rounded-xl p-2 md:p-2.5 flex items-center justify-center grayscale opacity-60">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg" alt="Photoshop Logo" className="w-full h-full object-contain" />
              </div>

              <span className="relative z-10 text-sm md:text-base text-gray-400 flex items-center gap-2 md:gap-3">
                Photoshop
                <span className="text-[10px] normal-case font-bold px-2 py-1 md:px-3 bg-gray-200 text-gray-500 rounded-full tracking-normal">
                  Soon
                </span>
              </span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
