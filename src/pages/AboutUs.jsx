import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutUsContent from '../components/AboutUsContent';
import Seo from '../components/Seo';

function AboutUs() {
  return (
    <>
      <Seo
        title="O nas | Uzdrowisko Marki"
        description="Poznaj mgr Hannę Nowotczyńską i podejście gabinetu Uzdrowisko. Sprawdź doświadczenie, kwalifikacje i certyfikaty z fizjoterapii, terapii manualnej i chiropraktyki."
        path="/onas"
      />
      <div className="bg-background text-gold font-cardo">
        <Navbar />
        <HeaderOther />
        <AboutUsContent />
        <Footer />
      </div>
    </>
  );
}

export default AboutUs;
