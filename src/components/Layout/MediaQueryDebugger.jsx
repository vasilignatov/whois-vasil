const MediaQueryDebugger = () => {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/80 text-white px-3 py-2 rounded-lg font-mono text-sm backdrop-blur-sm border border-gray-600">
      <div className="flex items-center gap-2">
        <span className="text-gray-400">Breakpoint:</span>
        
        {/* Default (xs) */}
        <span className="sm:hidden text-green-400 font-bold">
          XS (&lt;640px)
        </span>
        
        {/* Small */}
        <span className="hidden sm:inline md:hidden text-blue-400 font-bold">
          SM (640px+)
        </span>
        
        {/* Medium */}
        <span className="hidden md:inline lg:hidden text-yellow-400 font-bold">
          MD (768px+)
        </span>
        
        {/* Large */}
        <span className="hidden lg:inline xl:hidden text-orange-400 font-bold">
          LG (1024px+)
        </span>
        
        {/* Extra Large */}
        <span className="hidden xl:inline 2xl:hidden text-red-400 font-bold">
          XL (1280px+)
        </span>
        
        {/* 2X Large */}
        <span className="hidden 2xl:inline text-purple-400 font-bold">
          2XL (1536px+)
        </span>
      </div>
      
      {/* Screen width display */}
      <div className="text-xs text-gray-400 mt-1">
        Screen: {typeof window !== 'undefined' ? `${window.innerWidth}px` : 'Loading...'}
      </div>
    </div>
  );
};

export default MediaQueryDebugger; 