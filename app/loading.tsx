export default function Loading() {
  return (
    <div className="flex h-full w-full animate-pulse items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-2 border-dashed shadow-lg light:border-black dark:border-white"></div>
    </div>
  );
}
