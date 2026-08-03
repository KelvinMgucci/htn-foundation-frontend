import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <>
      <PageHero
        breadcrumb="Admin"
        eyebrow="Admin Access"
        title="Admin Login"
        description="Enter your password to access the admin dashboard"
      />

      <section className="shell py-16">
        <div className="mx-auto max-w-md">
          <div className="rounded-4xl border border-border bg-background p-8 shadow-soft">
            <div className="flex justify-center mb-6">
              <div className="grid size-16 place-items-center rounded-full bg-mint-soft text-teal">
                <Lock className="size-8" />
              </div>
            </div>

            <h2 className="text-center text-2xl font-bold text-teal mb-6">
              Admin Access
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-teal mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70 transition-colors focus-visible:border-mint"
                  placeholder="Enter admin password"
                />
                {error && (
                  <p className="mt-2 text-sm text-destructive">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-teal px-6 py-3 font-semibold text-sand-light transition-colors hover:bg-teal/90"
              >
                Login to Admin
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Default password: admin123
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
