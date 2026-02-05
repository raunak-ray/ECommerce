import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="text-foreground font-bold text-4xl">
        ShobHub
      </div>
      <div className="p-8 max-w-2xl">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
