import { Menu } from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <header className="flex h-14 items-center border-b bg-white px-4 md:hidden">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 hover:bg-gray-100"
        aria-label="Toggle navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>
    </header>
  );
}

export default Navbar;
