import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import FormInput from "../components/forms/FormInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();

  const isMounted = useRef(true);
  useEffect(
    () => () => {
      isMounted.current = false;
    },
    [],
  );

  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [],
  );

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [],
  );

  const toggleShow = useCallback(() => setShowPassword((s) => !s), []);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (loading) return;
      setError("");
      setLoading(true);

      // small client-side checks
      if (!email.trim() || !password) {
        setError("Please provide email and password.");
        setLoading(false);
        return;
      }

      try {
        await login(email.trim(), password);
        if (!isMounted.current) return;
        nav("/");
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Login failed");
      } finally {
        if (isMounted.current) setLoading(false);
      }
    },
    [email, password, login, nav, loading],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue shopping</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <form onSubmit={submit} className="space-y-4" noValidate>
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              leading={<Mail className="w-5 h-5" />}
              value={email}
              onChange={onEmailChange}
              autoComplete="email"
              autoFocus
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={onPasswordChange}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#755757] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  aria-invalid={!!error}
                />
                <button
                  type="button"
                  onClick={toggleShow}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-zinc-800 text-white py-2.5 rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-black underline hover:text-zinc-800 font-bold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
