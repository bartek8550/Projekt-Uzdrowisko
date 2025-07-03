import { useLocation, matchPath } from "react-router-dom";

const HeaderOther = () => {
  const location = useLocation();

  const pathTitles = {
    "/onas": "O nas",
    "/aktualnosci": "Aktualności",
    "/kontakt": "Kontakt",
    "/cennik": "Cennik",
    "/opinie": "Opinie",
    "/dlaczego": "Dlaczego my?",
  };

  // Szukamy czy to dynamiczna podstrona z newsem
  const isNewsDetail = matchPath("/aktualnosci/:id", location.pathname);

  const title =
    isNewsDetail?.pathname === location.pathname
      ? "Aktualności"
      : pathTitles[location.pathname] || "Strona";

  return (
    <header className="pt-36 pb-16 bg-background text-gold shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 flex justify-center">
        <h1 className="text-4xl font-cardo text-center">{title}</h1>
      </div>
    </header>
  );
};

export default HeaderOther;
