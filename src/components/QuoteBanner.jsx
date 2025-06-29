import { useEffect, useRef, useState } from 'react';

export default function QuoteBanner({
  text = '„Równowaga ciała to początek harmonii w całym życiu.”',
  background = '#4E342E',
  textColor = '#D4AF37',
  className = '',
}) {
  const ref = useRef(null);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShown) {
          setHasShown(true); // pokazujemy raz i zostawiamy
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [hasShown]);

  return (
    <div
      ref={ref}
      className={`
        text-center py-6 px-4 border-y 
        border-[rgba(212,175,55,0.2)] 
        font-charmonman text-xl md:text-2xl italic
        transition-all duration-1000 ease-out
        ${hasShown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${className}
      `}
      style={{ backgroundColor: background, color: textColor }}
    >
      {text}
    </div>
  );
}
