import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Services from '../components/Services';
import Seo from '../components/Seo';

function ServicesPage() {
  return (
    <>
      <Seo
        title="Usługi fizjoterapii | Uzdrowisko Marki"
        description="Poznaj pełną ofertę gabinetu Uzdrowisko: fizjoterapia, masaż leczniczy, rehabilitacja, drenaż limfatyczny i terapie specjalistyczne."
        path="/dlaczego"
      />
      <div className="bg-background text-gold font-cardo">
        <Navbar />
        <HeaderOther />
        <Services />
        <Footer />
      </div>
    </>
  );
}

export default ServicesPage;
