export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-textPrimary">Loading HealthSync AI</h2>
          <p className="text-textSecondary">Preparing your personalized health hub...</p>
        </div>
      </div>
    </div>
  );
}
