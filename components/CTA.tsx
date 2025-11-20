import React from 'react';
import { ArrowDown } from 'lucide-react';

export const CTA: React.FC = () => {
  return (
    <section id="contact" className="bg-pinnacle-dark text-white py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        
        <div className="inline-block bg-pinnacle-orange text-white px-4 py-1 rounded-full text-sm font-bold uppercase mb-8 transform -rotate-3">
          Contact
        </div>

        <h2 className="font-display font-black text-[12vw] md:text-[8vw] leading-none uppercase mb-8">
          Let's Work <br /> Together
        </h2>

        <div className="mt-12">
           {/* 
             Updated Image Card 
             - Fits image aspect ratio (h-auto) to avoid empty space
             - Large rounded corners
           */}
           <div className="relative w-full max-w-2xl mx-auto mb-12 group cursor-pointer rounded-[2rem] shadow-2xl overflow-visible">
             {/* Glow Effect behind the card */}
             <div className="absolute -inset-2 bg-pinnacle-green/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
             
             <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl p-1">
                <img 
                  src="https://hidden-copper-yudffgzgbo.edgeone.app/WhatsApp%20Image%202025-11-20%20at%2018.38.25_ab017639.jpg" 
                  alt="Team Collaboration" 
                  className="w-full h-auto block rounded-[1.8rem]"
                />
             </div>
           </div>

           <p className="text-gray-400 mb-4">Start your journey with us today.</p>
           <a 
             href="mailto:contact@campushub.com" 
             className="text-2xl md:text-4xl font-bold hover:text-pinnacle-green transition-colors border-b-2 border-white/20 hover:border-pinnacle-green pb-2"
           >
             Contact@campushub.com
           </a>
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-8 md:gap-16 text-lg md:text-xl font-display uppercase text-gray-500">
           <span className="flex items-center gap-2"><span className="w-2 h-2 bg-pinnacle-green rounded-full"></span> Request</span>
           <span className="flex items-center gap-2"><span className="w-2 h-2 bg-pinnacle-orange rounded-full"></span> Design</span>
           <span className="flex items-center gap-2"><span className="w-2 h-2 bg-pinnacle-purple rounded-full"></span> Web Design</span>
           <span className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Development</span>
        </div>

      </div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
    </section>
  );
};