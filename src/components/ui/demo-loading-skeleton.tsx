"use client";

interface DemoLoadingSkeletonProps {
  type: "mobile" | "chat" | "dashboard";
}

export const DemoLoadingSkeleton = ({ type }: DemoLoadingSkeletonProps) => {
  if (type === "dashboard") {
    return (
      <div className="p-6 space-y-6 bg-white" role="status" aria-label="Loading finance dashboard">
        {/* Navigation skeleton */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-8 bg-slate-200 rounded-full w-20 animate-pulse" style={{animationDelay: `${i * 100}ms`}}></div>
            ))}
          </div>
        </div>
        
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-8 bg-slate-200 rounded w-64 animate-pulse"></div>
          <div className="h-5 bg-slate-200 rounded w-32 animate-pulse"></div>
        </div>
        
        {/* KPI cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-slate-100 rounded-xl p-4 space-y-3 animate-pulse" style={{animationDelay: `${i * 150}ms`}}>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-slate-200 rounded w-20"></div>
                <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="h-8 bg-slate-200 rounded w-16"></div>
              <div className="h-3 bg-slate-200 rounded w-24"></div>
            </div>
          ))}
        </div>
        
        {/* Content area skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-slate-100 rounded-xl p-4 space-y-4 animate-pulse" style={{animationDelay: `${i * 200}ms`}}>
              <div className="flex justify-between items-center">
                <div className="h-5 bg-slate-200 rounded w-32"></div>
                <div className="w-6 h-6 bg-slate-200 rounded-lg"></div>
              </div>
              <div className="h-20 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex justify-center px-4 min-h-[80vh] items-center`} role="status" aria-label="Loading demo">
      <div className="relative my-8">
        <div className="w-full max-w-sm relative mx-auto">
          <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-700/50">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
              <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
              <div className="h-32 bg-slate-700/50 rounded"></div>
              <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
