export default function Preloader({ progress, isDone }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-gold font-cardo transition-opacity duration-700 ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Logo (opcjonalnie zamień ścieżkę) */}
      <img
        src="/logoLepsze.webp"
        alt="Logo"
        className="w-24 h-24 mb-6 object-contain"
      />

      {/* Spinner */}
      <svg
        className="animate-spin h-10 w-10 mb-4 text-gold"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>

      {/* Procent */}
      <p className="text-xl">{progress}%</p>
    </div>
  );
}
