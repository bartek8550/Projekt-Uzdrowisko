import { useEffect, useState } from 'react';
import Preloader from '../components/Preloader';

import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Services from '../components/Services';
import Seo from '../components/Seo';

function NewsPage() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [skipPreloader, setSkipPreloader] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('seen-preloader-news');

    if (hasSeen) {
      setSkipPreloader(true);
      setIsDone(true);
      return;
    }

    const fileNames = [
      'drenazlimfatyczny.webp',
      'drenazlimfatyczny2.webp',
      'dziecipowyzej10r.webp',
      'dziecipowyzej10r2.webp',
      'kardiologiczne.webp',
      'kobietywciazy.webp',
      'masazleczniczy.webp',
      'masazsportowy.webp',
      'rehabilitacjakobietpociazy.webp',
      'rehabilitacjaonkologiczna.webp',
      'sportowcow.webp',
      'sportowcow2.webp',
      'terapiespecjalistyczne.webp',
      'traumatologiczna.webp',
      'uroginekologiczna.webp',
    ];

    const imageUrls = [
      ...fileNames.map((name) => `/whyus/UslugiIkonki/512x512/${name}`),
      '/koscimiedkreg.webp',
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
          sessionStorage.setItem('seen-preloader-news', 'true');
          setTimeout(() => setIsDone(true), 300);
        }
      };

      img.onload = update;
      img.onerror = update;
    });
  }, []);

  return (
    <>
      <Seo
        title="Usługi fizjoterapii | Uzdrowisko Marki"
        description="Poznaj pełną ofertę gabinetu Uzdrowisko: fizjoterapia, masaż leczniczy, rehabilitacja, drenaż limfatyczny i terapie specjalistyczne."
        path="/dlaczego"
      />
      {!skipPreloader && <Preloader progress={progress} isDone={isDone} />}
      <div
        className={`bg-background text-gold font-cardo ${
          !isDone ? 'invisible' : 'visible'
        }`}
      >
        <Navbar />
        <HeaderOther />
        <Services />
        <Footer />
      </div>
    </>
  );
}

export default NewsPage;
