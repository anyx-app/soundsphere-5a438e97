import React from 'react';
import { Play } from 'lucide-react';

export default function Dashboard() {
  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const recentMixes = [
    { id: 1, title: 'Daily Mix 1', desc: 'Made for you', color: 'from-pink-500 to-rose-500' },
    { id: 2, title: 'Discover Weekly', desc: 'New music updated every Monday', color: 'from-purple-500 to-indigo-500' },
    { id: 3, title: 'Release Radar', desc: 'Catch up on the latest releases', color: 'from-green-500 to-emerald-500' },
    { id: 4, title: 'On Repeat', desc: 'Songs you love right now', color: 'from-blue-500 to-cyan-500' },
    { id: 5, title: 'Liked Songs', desc: '432 songs', color: 'from-violet-600 to-indigo-800' },
    { id: 6, title: 'Chill Hits', desc: 'Kick back to the best new chill tracks', color: 'from-orange-400 to-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">{greeting}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentMixes.map((mix) => (
            <div 
              key={mix.id}
              className="group relative flex items-center gap-4 bg-white/5 hover:bg-white/10 rounded overflow-hidden transition-all duration-300 cursor-pointer pr-4"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${mix.color} shadow-lg`} />
              <div className="flex-1 min-w-0 py-2">
                <h3 className="font-bold text-white truncate">{mix.title}</h3>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 shadow-xl rounded-full bg-[#1DB954] p-3 hover:scale-105">
                <Play className="w-5 h-5 text-black fill-black ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
         <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight hover:underline cursor-pointer">Made For You</h2>
            <span className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer">Show all</span>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Mock Cards */}
            {Array.from({ length: 5 }).map((_, i) => (
               <div key={i} className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-colors group cursor-pointer">
                  <div className="relative mb-4 aspect-square bg-gradient-to-b from-[#333] to-[#222] rounded-md shadow-lg overflow-hidden">
                     {/* Play button overlay */}
                     <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl rounded-full bg-[#1DB954] p-3 hover:scale-105">
                        <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                     </div>
                  </div>
                  <h3 className="font-bold text-white truncate mb-1">Daily Mix {i + 1}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2">
                     Artist A, Artist B, Artist C and more...
                  </p>
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
