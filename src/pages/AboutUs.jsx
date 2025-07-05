import { useEffect, useState } from 'react';
import Preloader from '../components/Preloader';

import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutUsContent from '../components/AboutUsContent';

function AboutUs() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [skipPreloader, setSkipPreloader] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('seen-preloader-about');

    if (hasSeen) {
      setSkipPreloader(true);
      setIsDone(true);
      return;
    }

    const imageUrls = [
      '/aboutusphoto.webp',
      '/Hanna.webp',
      ...Array.from({ length: 12 }, (_, i) => `/HannaNow/zdj${i + 1}.webp`),
    ];

    let loaded = 0;

    imageUrls.forEach((src) => {
      const img = new Image();
      img.src = src;

      const update = () => {
        loaded++;
        const percent = Math.round((loaded / imageUrls.length) * 100);
        setProgress(percent);

        if (loaded === imageUrls.length) {
          sessionStorage.setItem('seen-preloader-about', 'true');
          setTimeout(() => setIsDone(true), 300);
        }
      };

      img.onload = update;
      img.onerror = update;
    });
  }, []);

  return (
    <>
      {!skipPreloader && <Preloader progress={progress} isDone={isDone} />}
      <div
        className={`bg-background text-gold font-cardo ${
          !isDone ? 'invisible' : 'visible'
        }`}
      >
        <Navbar />
        <HeaderOther />
        <AboutUsContent />
        <Footer />
      </div>
    </>
  );
}

export default AboutUs;
