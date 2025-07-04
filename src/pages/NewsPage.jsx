import { useEffect, useState } from 'react';
import Preloader from '../components/Preloader';

import HeaderOther from '../components/HeaderOther';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsPageContent from '../components/news/NewsPageContent';
import { newsList } from '../components/news/newsData';

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

    // Zbieramy wszystkie obrazki z danych + tło
    const imageUrls = [
      '/recekwiaty.webp',
      ...newsList.map((item) => item.image),
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
          setTimeout(() => setIsDone(true), 300); // fade-out
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
        <NewsPageContent />
        <Footer />
      </div>
    </>
  );
}

export default NewsPage;
