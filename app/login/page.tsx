"use client";

import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null) as { message?: string } | null;
        setMessage(body?.message ?? "Unable to sign in.");
        return;
      }
      window.location.assign("/");
    } catch {
      setMessage("Unable to sign in. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel" aria-labelledby="login-heading">
        <a className="login-wordmark" href="/login">scouter</a>
        <p className="eyebrow">owner access</p>
        <h1 id="login-heading">Enter password</h1>
        <p>Scouter is private.</p>
        <form onSubmit={submit}>
          <label>
            <span>password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              required
            />
          </label>
          {message && <p className="login-message" role="alert">{message}</p>}
          <button type="submit" disabled={submitting}>{submitting ? "checking" : "continue"} <span aria-hidden="true">↗</span></button>
        </form>
        <a className="login-credit" href="https://shlok.fyi/" target="_blank" rel="noreferrer">made by shlok.fyi <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
