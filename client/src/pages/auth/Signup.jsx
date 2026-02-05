import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/auth/useSignup";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: signup, status } = useSignup();
  const navigate = useNavigate();

  const handleCleanup = () => {
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Password and confirm password must be same");
    }

    signup({ name, email, password });
    handleCleanup();
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/");
    }
  }, [navigate, status]);

  return (
    <Card className="bg-card border-card w-full min-w-md text-2xl shadow-xl">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Get started with ShopHub</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-1">
            <Label htmlFor="name" className="font-semibold text-lg">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              className="bg-card-foreground/10"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="font-bold text-lg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              className="bg-card-foreground/10"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="font-bold text-lg">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              className="bg-card-foreground/10"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmpassword" className="font-bold text-lg">
              Confirm Password
            </Label>
            <Input
              id="confirmpassword"
              type="password"
              className="bg-card-foreground/10"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button
            className="w-full font-bold text-xl cursor-pointer"
            type="submit"
            disabled={status === "pending"}
          >
            {status === "pending" ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center gap-2 -m-4">
        <span className="text-muted-foreground/60 text-lg">
          Already have an account?
        </span>
        <Link
          to={"/auth/login"}
          className="bg-transparent hover:bg-transparent hover:underline cursor-pointer text-foreground font-bold text-lg"
        >
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}

export default Signup;
