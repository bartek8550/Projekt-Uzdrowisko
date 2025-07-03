import { useLocation } from "react-router-dom";

const HeaderOther = () => {
  const location = useLocation();

  const pathTitles = {
    "/onas": "O nas",
    "/aktualnosci": "Aktualności",
    "/kontakt": "Kontakt",
    "/oferta": "Oferta",
    "/opinie": "Opinie",
    "/dlaczego": "Dlaczego my?",
  };

  const title = pathTitles[location.pathname] || "Strona";

  return (
    <header className="pt-36 pb-16 bg-background text-gold shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 flex justify-center">
        <h1 className="text-4xl font-cardo text-center">{title}</h1>
      </div>
    </header>
  );
};

export default HeaderOther;
