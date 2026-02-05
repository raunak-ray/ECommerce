import { NavLink } from "react-router-dom";
import { FolderTree, Home, Package, ShoppingBag, Store, Users, X } from "lucide-react";

function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transition-transform
          md:static md:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-accent px-4">
          <span className="font-semibold">Admin Panel</span>
          <button
            onClick={onClose}
            className="rounded-md p-2 hover:bg-gray-100 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-1 p-4">
          <NavItem to="/admin/dashboard" icon={<Home />} label="Dashboard" />
          <NavItem to="/admin/categories" icon={<FolderTree />} label="Categories" />
          <NavItem to="/admin/sellers" icon={<Store />} label="Sellers" />
          <NavItem to="/admin/products" icon={<Package />} label="Products" />
          <NavItem to="/admin/orders" icon={<ShoppingBag />} label="Orders" />
        </nav>
      </aside>
    </>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition
        ${
          isActive
            ? "bg-emerald-600/10 text-green-400"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}

export default Sidebar;
