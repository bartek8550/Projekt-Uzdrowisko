function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold text-blue-700">Logo</h2>
      <ul className="flex gap-4">
        <li>
          <a href="/" className="text-blue-600 hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/contact" className="text-blue-600 hover:underline">
            Kontakt
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
