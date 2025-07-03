import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';

import Footer from '../components/Footer';
import AboutUsContent from '../components/AboutUsContent';

function AboutUs() {
  return (
    <div className="bg-background text-gold font-cardo">
      <Navbar />
      <HeaderOther />
      <AboutUsContent/>
      <Footer />
    </div>
  );
}

export default AboutUs;
