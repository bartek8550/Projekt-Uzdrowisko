export default function Header() {
  return (
    <header className="h-screen flex items-center justify-center text-center relative overflow-hidden">
      <img
        src="/kwiat.webp"
        alt="Kwiat"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] opacity-20 pointer-events-none select-none"
      />
      <div className="relative z-10 text-gold font-cardo">
        <h1 className="text-5xl font-light">Uzdrowisko</h1>
        <p className="text-lg mt-2">Hanna Nowotczyńska</p>
      </div>
    </header>
  );
}
