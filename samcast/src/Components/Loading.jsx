/**
 *
 * @returns {JSX.Element}
 * Loading Component
 *
 */
 
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
