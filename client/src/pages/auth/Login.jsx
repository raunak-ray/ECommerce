import { useEffect, useState } from "react";
import useLogin from "@/hooks/auth/useLogin";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { CardFooter } from "../../components/ui/card";

export default function Login() {
  const { mutate: login, status } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, status);

    login({ email, password });
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [status, navigate]);

  return (
    <Card className="w-full shadow-2xs text-3xl min-w-md border-card">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-bold text-lg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-card-foreground/10"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password" className="font-bold text-lg">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-card-foreground/10"
            />
          </div>

          <Button
            type="submit"
            className="w-full font-bold text-xl"
            disabled={status === "pending"}
          >
            {status === "pending" ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <span className="text-muted-foreground/60 text-lg">
          Don't have an account?
        </span>
        <Link
          to={"/auth/signup"}
          className="bg-transparent hover:bg-transparent hover:underline cursor-pointer text-foreground font-bold text-lg"
        >
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
}
