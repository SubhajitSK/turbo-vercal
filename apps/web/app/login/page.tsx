"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../page.module.css";
import { useLogin } from "../services/login";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy validation
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    await useLogin({ email, password });
    setError("");
    router.push("/");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.primary}>
            Login
          </button>
        </form>
      </main>
    </div>
  );
}
