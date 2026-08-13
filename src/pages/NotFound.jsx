import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-gold font-cardo">
      <Seo
        title="Nie znaleziono strony | Uzdrowisko"
        description="Podany adres nie prowadzi do istniejącej strony serwisu Uzdrowisko."
        path={null}
        robots="noindex, follow"
      />
      <Navbar />
      <main
        id="main-content"
        className="min-h-[70vh] px-6 pt-40 pb-24 text-center flex flex-col items-center justify-center"
      >
        <p className="text-sm uppercase tracking-[0.25em] opacity-80">Błąd 404</p>
        <h1 className="mt-4 text-4xl md:text-5xl">Nie znaleziono strony</h1>
        <p className="mt-6 max-w-xl text-base md:text-lg text-[#F5E9E2]">
          Adres mógł zostać wpisany niepoprawnie albo strona została przeniesiona.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-md bg-[#D4AF37] px-6 py-3 font-semibold text-[#3E1F1B] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Wróć na stronę główną
        </Link>
      </main>
      <Footer />
    </div>
  );
}
