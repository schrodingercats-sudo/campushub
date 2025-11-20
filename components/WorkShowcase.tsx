import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const WorkShowcase: React.FC = () => {
  return (
    <section id="work" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Typographic Header */}
        <div className="relative py-12 text-center">
           <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-pinnacle-green text-white px-4 py-1 rounded-full text-sm font-bold uppercase z-10 rotate-[-5deg]">
             Portfolio
           </span>
           
           <div className="font-display font-black text-[12vw] leading-[0.8] tracking-tighter text-pinnacle-dark uppercase mix-blend-darken opacity-90">
             Our <span className="text-pinnacle-orange">Exclusive</span>
           </div>
           
           <div className="font-display font-black text-[12vw] leading-[0.8] tracking-tighter text-pinnacle-dark uppercase mix-blend-darken flex items-center justify-center gap-4 md:gap-12">
             Work
             {/* Integrated Thumbnail within Text Flow */}
             <div className="relative w-[15vw] h-[10vw] bg-black rounded-lg overflow-hidden inline-block transform rotate-6 shadow-xl border-2 border-white">
                <img src="https://picsum.photos/seed/car/400/300" alt="Work Thumb" className="w-full h-full object-cover opacity-80" />
             </div>
           </div>
        </div>

        {/* Featured Project Info */}
        <div className="flex justify-between items-end max-w-4xl mx-auto mt-8 mb-16 px-4 border-b border-gray-300 pb-4">
           <div>
             <h3 className="text-2xl font-bold">Voltrive</h3>
             <p className="text-gray-500">Automotive Web Experience</p>
           </div>
           <div className="text-xl font-bold">2024</div>
        </div>

        {/* Device Mockup */}
        <div className="relative w-full max-w-6xl mx-auto">
          <div className="aspect-video bg-black rounded-[2rem] p-2 md:p-4 shadow-2xl border-[8px] border-gray-800 ring-1 ring-gray-700">
             <div className="w-full h-full bg-gray-900 rounded-[1.5rem] overflow-hidden relative group">
                {/* Screen Content */}
                <img 
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop" 
                  alt="Project Screenshot" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Text on Screen */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white p-8 text-center">
                  <h4 className="font-display text-4xl md:text-7xl font-bold mb-4">Silent Speed</h4>
                  <button className="bg-white text-black px-6 py-2 rounded-full flex items-center gap-2 text-sm font-bold hover:bg-gray-200 transition-colors">
                     View Case Study <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Floating Navigation Pill in Mockup */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-black px-6 py-2 rounded-full flex gap-6 text-xs font-medium shadow-lg">
                  <span>Home</span>
                  <span>Products</span>
                  <span>Solutions</span>
                  <span>About Us</span>
                </div>
             </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute -inset-10 bg-gradient-to-t from-pinnacle-purple to-transparent opacity-20 blur-3xl -z-10 rounded-full"></div>
        </div>

      </div>
    </section>
  );
};