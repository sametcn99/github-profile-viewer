export default function Loading() {
  return (
    <div className="flex h-full w-full animate-pulse items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-8 border-t-4 border-dashed light:border-black dark:border-white"></div>
    </div>
  );
}
