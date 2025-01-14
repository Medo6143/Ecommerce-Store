import { useState, useEffect } from "react";
import { Login as FirebaseLogin } from "../servieces/firebase/auth";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await FirebaseLogin(email, password);
      setSuccess("Login successful!");
      // Redirect to home page after successful login
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setError("Failed to log in");
      console.error(err);
    }
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <section className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <header>
            <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Sign in to your account
            </h1>
          </header>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <fieldset className="rounded-md shadow-sm space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </fieldset>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to={"/register"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Create an account
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </section>
      </main>

      {/* Alert Container */}
      <div className="fixed bottom-5 right-5 flex flex-col gap-2 ">
        {error && (
          <div
            className="bg-red-100 border  border-red-400  text-red-700 px-4 py-3 rounded relative shadow-lg"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative shadow-lg"
            role="alert"
          >
            <span className="block sm:inline">{success}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
