import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Plus, FileText, Calendar } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"news" | "programs">("news");

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate({ to: "/admin/login" });
  };

  return (
    <>
      <PageHero
        breadcrumb="Admin"
        eyebrow="Dashboard"
        title="Admin Dashboard"
        description="Manage content for HTN Foundation website"
      />

      <section className="shell py-16">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-teal transition-colors hover:bg-mint-soft"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("news")}
            className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${
              activeTab === "news"
                ? "bg-teal text-sand-light"
                : "border border-border text-teal hover:bg-mint-soft"
            }`}
          >
            <FileText className="size-4" />
            News
          </button>
          <button
            onClick={() => setActiveTab("programs")}
            className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ${
              activeTab === "programs"
                ? "bg-teal text-sand-light"
                : "border border-border text-teal hover:bg-mint-soft"
            }`}
          >
            <Calendar className="size-4" />
            Programs
          </button>
        </div>

        {activeTab === "news" ? <NewsManager /> : <ProgramManager />}
      </section>
    </>
  );
}

function NewsManager() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080/api"}/news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      setStatus("sent");
      setTitle("");
      setContent("");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-4xl border border-border bg-background p-10 text-center shadow-soft">
        <p className="text-lg font-semibold text-teal">News published successfully!</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 rounded-full bg-teal px-6 py-2 font-semibold text-sand-light"
        >
          Add Another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-4xl border border-border bg-background p-8 shadow-soft">
      <h2 className="text-2xl font-bold text-teal mb-6">Add News Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-teal mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground"
            placeholder="Enter news title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-teal mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground resize-y"
            placeholder="Enter news content"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-sand-light transition-colors hover:bg-teal/90 disabled:opacity-50"
        >
          <Plus className="size-4" />
          {status === "sending" ? "Publishing..." : "Publish News"}
        </button>
        {status === "failed" && (
          <p className="text-sm text-destructive">Failed to publish. Please try again.</p>
        )}
      </form>
    </div>
  );
}

function ProgramManager() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8080/api"}/programs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      setStatus("sent");
      setTitle("");
      setDescription("");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-4xl border border-border bg-background p-10 text-center shadow-soft">
        <p className="text-lg font-semibold text-teal">Program created successfully!</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 rounded-full bg-teal px-6 py-2 font-semibold text-sand-light"
        >
          Add Another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-4xl border border-border bg-background p-8 shadow-soft">
      <h2 className="text-2xl font-bold text-teal mb-6">Add Program</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-teal mb-2">Program Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground"
            placeholder="Enter program name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-teal mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-foreground resize-y"
            placeholder="Enter program description"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center gap-2 rounded-full bg-teal px-6 py-3 font-semibold text-sand-light transition-colors hover:bg-teal/90 disabled:opacity-50"
        >
          <Plus className="size-4" />
          {status === "sending" ? "Creating..." : "Create Program"}
        </button>
        {status === "failed" && (
          <p className="text-sm text-destructive">Failed to create program. Please try again.</p>
        )}
      </form>
    </div>
  );
}
