import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pinnacle-green text-pinnacle-dark pt-24 pb-4 overflow-hidden relative">
      <div className="container mx-auto px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
           <div>
             <h4 className="font-bold text-lg mb-4">Sitemap</h4>
             <ul className="space-y-2 text-sm font-medium opacity-80">
               <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Work</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-lg mb-4">Legal</h4>
             <ul className="space-y-2 text-sm font-medium opacity-80">
               <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-lg mb-4">Social</h4>
             <ul className="space-y-2 text-sm font-medium opacity-80">
               <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
               <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
             </ul>
           </div>

           <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold text-xl md:text-2xl tracking-tight">Contact@campushub.com</h4>
              <p className="mt-4 text-xs opacity-70 leading-relaxed max-w-[200px]">
                 The agency studio specializes in creative design and development for businesses.
              </p>
           </div>
        </div>

        {/* Giant Brand Name */}
        <div className="relative">
           <h1 className="font-display font-black text-[18vw] leading-[0.75] text-center tracking-tighter -mb-[4vw] pointer-events-none select-none">
             CAMPUSHUB<span className="text-white text-[10vw] align-top">*</span>
           </h1>
        </div>

      </div>
      
      <div className="w-full flex justify-between items-center px-4 py-2 text-[10px] font-bold tracking-widest uppercase border-t border-black/10 mt-8">
        <span>© 2024 CampusHub. All Rights Reserved.</span>
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:underline">Back to top ↑</button>
      </div>
    </footer>
  );
};