import Navbar from '../components/Navbar';

function Home() {
  return (
    <div>
      <Navbar />
      <header className="bg-blue-100 p-10 text-center">
        <h1 className="text-4xl font-bold text-blue-800">
          Witamy w Uzdrowisku
        </h1>
      </header>
    </div>
  );
}

export default Home;
