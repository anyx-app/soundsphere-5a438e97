import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Library, 
  Disc, 
  User, 
  LogOut, 
  Menu, 
  X,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  Heart
} from 'lucide-react';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine if we should show a transparent header based on scroll or route
  // For now, simple solid header on mobile, transparent on desktop
  
  return (
    <div className="flex h-screen w-full bg-[#121212] text-slate-300 font-sans selection:bg-[#1DB954] selection:text-white overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-black/90 md:bg-black text-slate-300 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954] to-[#FF4C29] rounded-full blur-[8px] opacity-70"></div>
               <Disc className="relative z-10 w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter text-white">
              SoundSphere
            </h1>
          </div>

          {/* Main Navigation */}
          <nav className="space-y-2">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 group ${isActive ? 'bg-[#282828] text-white font-semibold' : 'hover:text-white hover:bg-white/5'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <Home className="w-6 h-6" />
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/search" 
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 group ${isActive ? 'bg-[#282828] text-white font-semibold' : 'hover:text-white hover:bg-white/5'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <Search className="w-6 h-6" />
              <span>Search</span>
            </NavLink>
            <NavLink 
              to="/library" 
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 group ${isActive ? 'bg-[#282828] text-white font-semibold' : 'hover:text-white hover:bg-white/5'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <Library className="w-6 h-6" />
              <span>Your Library</span>
            </NavLink>
          </nav>
        </div>

        {/* User Section / Playlists (Scrollable area could go here) */}
        <div className="flex-1 px-6 overflow-y-auto custom-scrollbar">
           <div className="mt-6 pt-6 border-t border-[#282828]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Playlists</h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                       <Heart className="w-4 h-4 text-white fill-current" />
                    </div>
                    <span className="text-sm">Liked Songs</span>
                 </div>
                 {/* Placeholder Playlists */}
                 {['Chill Vibes', 'Workout Mix', 'Late Night Lo-Fi'].map((playlist) => (
                    <p key={playlist} className="text-sm cursor-pointer hover:text-white transition-colors truncate">
                       {playlist}
                    </p>
                 ))}
              </div>
           </div>
        </div>
        
        {/* User Profile (Bottom of Sidebar) */}
        <div className="p-4 mt-auto border-t border-[#282828] bg-black">
           <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-[#282828] transition-colors group">
              <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center text-black font-bold">
                 U
              </div>
              <div className="flex-1 text-left overflow-hidden">
                 <p className="text-sm font-medium text-white truncate">User Name</p>
              </div>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col h-full bg-[#121212] overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#121212] sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="text-white">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-white">SoundSphere</span>
          <div className="w-6" /> {/* Spacer */}
        </header>

        {/* Top Bar (Desktop - Search/User placeholder) */}
        <div className="hidden md:flex absolute top-0 left-0 right-0 z-20 h-16 items-center justify-between px-8 bg-black/20 backdrop-blur-md">
           <div className="flex gap-4">
              <button className="bg-black/40 rounded-full p-1 text-slate-300 hover:text-white disabled:opacity-50">
                 <SkipBack className="w-5 h-5 rotate-180" /> {/* Chevron Left substitute */}
              </button>
              <button className="bg-black/40 rounded-full p-1 text-slate-300 hover:text-white disabled:opacity-50">
                 <SkipForward className="w-5 h-5 rotate-180" /> {/* Chevron Right substitute */}
              </button>
           </div>
           <div className="flex items-center gap-4">
              <button className="text-sm font-semibold hover:scale-105 transition-transform text-slate-300 hover:text-white">Sign up</button>
              <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform">Log in</button>
           </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1e1e1e] to-[#121212] custom-scrollbar">
           {/* Spacer for Top Bar */}
           <div className="h-16 md:block hidden"></div> 
           <div className="p-6 md:p-8 min-h-full">
             <Outlet />
           </div>
           {/* Spacer for Bottom Player */}
           <div className="h-24"></div>
        </div>

        {/* Persistent Player Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#181818] border-t border-[#282828] flex items-center justify-between px-4 z-40">
           {/* Track Info */}
           <div className="w-1/3 flex items-center gap-4">
              <div className="w-14 h-14 bg-slate-800 rounded shadow-lg flex-shrink-0">
                 {/* Album Art Placeholder */}
              </div>
              <div className="hidden md:block">
                 <h4 className="text-sm font-medium text-white hover:underline cursor-pointer">Song Title</h4>
                 <p className="text-xs text-slate-400 hover:underline cursor-pointer">Artist Name</p>
              </div>
              <button className="text-slate-400 hover:text-[#1DB954] transition-colors ml-2">
                 <Heart className="w-5 h-5" />
              </button>
           </div>

           {/* Player Controls */}
           <div className="w-1/3 flex flex-col items-center gap-2">
              <div className="flex items-center gap-6">
                 <button className="text-slate-400 hover:text-white transition-colors">
                    <SkipBack className="w-5 h-5 fill-current" />
                 </button>
                 <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                    <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                 </button>
                 <button className="text-slate-400 hover:text-white transition-colors">
                    <SkipForward className="w-5 h-5 fill-current" />
                 </button>
              </div>
              <div className="w-full max-w-md flex items-center gap-2 text-xs text-slate-400 font-mono">
                 <span>0:00</span>
                 <div className="h-1 flex-1 bg-slate-600 rounded-full group cursor-pointer">
                    <div className="h-full w-0 bg-white rounded-full group-hover:bg-[#1DB954]"></div>
                 </div>
                 <span>3:45</span>
              </div>
           </div>

           {/* Volume Controls */}
           <div className="w-1/3 flex items-center justify-end gap-3">
              <Volume2 className="w-5 h-5 text-slate-400" />
              <div className="w-24 h-1 bg-slate-600 rounded-full cursor-pointer group">
                 <div className="h-full w-2/3 bg-slate-300 rounded-full group-hover:bg-[#1DB954]"></div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
