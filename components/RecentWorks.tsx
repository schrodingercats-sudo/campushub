import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const projects = [
  { id: '01', title: 'SquadHub', category: 'SaaS Website', year: '2024', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', bg: 'bg-black text-white' },
  { id: '02', title: 'EcoDrill', category: 'Industrial Design', year: '2023', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', bg: 'bg-pinnacle-green text-pinnacle-dark' },
  { id: '03', title: 'Lumina', category: 'Lighting eCommerce', year: '2023', img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop', bg: 'bg-gray-100 text-black' },
  { id: '04', title: 'Apex', category: 'Fintech App', year: '2024', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop', bg: 'bg-pinnacle-purple text-white' },
];

export const RecentWorks: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <h2 className="font-display font-black text-5xl md:text-7xl uppercase leading-none">
             Recent <br /> Works
           </h2>
           
           <div className="flex gap-4 mt-8 md:mt-0">
              <button 
                onClick={() => scroll('left')}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                aria-label="Previous projects"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all"
                aria-label="Next projects"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
           </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`min-w-[90vw] md:min-w-[400px] lg:min-w-[500px] snap-center rounded-3xl overflow-hidden relative group shadow-lg transition-transform duration-300 hover:-translate-y-2`}
            >
              <div className={`h-[500px] p-8 flex flex-col justify-between ${project.bg}`}>
                 
                 <div className="flex justify-between items-start z-10">
                    <span className="font-mono text-sm opacity-70">{project.id}</span>
                    <span className="font-mono text-sm opacity-70">{project.year}</span>
                 </div>

                 {/* Image Area */}
                 <div className="absolute inset-0 top-20 bottom-20 mx-8 rounded-xl overflow-hidden shadow-inner transform group-hover:scale-[1.02] transition-transform duration-500">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                 </div>

                 <div className="z-10 mt-auto pt-64">
                    <h3 className="font-display text-4xl font-bold uppercase">{project.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm font-medium bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">{project.category}</span>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};