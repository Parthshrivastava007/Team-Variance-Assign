import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-[220px] shadow-lg">
                    <div>
                        <div className="h-6 w-3/4 rounded-md animate-shimmer mb-4"></div>
                        <div className="h-4 w-full rounded-md animate-shimmer mb-2"></div>
                        <div className="h-4 w-[90%] rounded-md animate-shimmer mb-2"></div>
                        <div className="h-4 w-[40%] rounded-md animate-shimmer mb-2"></div>
                    </div>
                    <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                        <div className="h-4 w-[60px] rounded-md animate-shimmer"></div>
                        <div className="h-8 w-[80px] rounded-md animate-shimmer"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
