"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import RepositoryFactory from "@/lib/repositories";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isSupabase, setIsSupabase] = useState(false);

  // Check if Supabase is configured
  useEffect(() => {
    const hasSupabase =
      !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    setIsSupabase(hasSupabase);
  }, []);

  // Detect if input is email or phone
  useEffect(() => {
    setIsEmail(phoneOrEmail.includes("@"));
  }, [phoneOrEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate email login requires password
      if (isEmail && !password) {
        setError("Password is required for email login");
        setIsLoading(false);
        return;
      }

      const authRepo = RepositoryFactory.getAuthRepository();
      await authRepo.login(phoneOrEmail, password || undefined);
      
      // Check for redirect parameter
      const redirect = searchParams.get("redirect");
      router.push(redirect || "/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="phoneOrEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {isEmail ? "Email" : "Phone or Email"}
              </label>
              <input
                id="phoneOrEmail"
                type={isEmail ? "email" : "text"}
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={
                  isEmail
                    ? "your.email@example.com"
                    : "your.email@example.com or +1 (555) 111-2222"
                }
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password {isEmail && <span className="text-red-500">*</span>}
                {!isEmail && !isSupabase && (
                  <span className="text-gray-500 text-xs">(Optional - Mock)</span>
                )}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={isEmail && isSupabase}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={
                  isEmail
                    ? "Enter your password"
                    : "Password (required for email login)"
                }
              />
              {isEmail && (
                <p className="mt-1 text-xs text-gray-500">
                  Password is required for email login
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
              disabled={isEmail && !password && isSupabase}
            >
              Sign In
            </Button>
          </form>

          {!isSupabase && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <p className="mb-2">Mock Login - Try these credentials:</p>
              <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                john.doe@example.com
                <br />
                or
                <br />
                +1 (555) 111-2222
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              ← Back to home
            </Link>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

