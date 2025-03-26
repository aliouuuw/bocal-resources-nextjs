"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/authism/hooks/use-auth";
import { useRouter } from "next/navigation";

function SigninForm() {
  const router = useRouter();
  const { login, loading, error, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      if (clearError) clearError();
    };
  }, [clearError]);

  async function handleLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Basic validation
    if (!email || !password) {
      setFormError("Email and password are required");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      router.replace("/admin");
    } else {
      setFormError(result.error || "Login failed");
    }
  }
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Admin Login
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to access the admin dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        {(error || formError) && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || formError}</AlertDescription>
          </Alert>
        )}

        <form action={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@example.com"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="••••••••••"
                disabled={loading}
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Return to homepage
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SigninForm;
