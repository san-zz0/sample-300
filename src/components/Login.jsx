import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "123456") {
      navigate("/admin");
      return;
    }

    if (username === "user" && password === "654321") {
      navigate("/user-products");
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border border-slate-600 p-8 text-gray-600 rounded">
        <h2 className="text-3xl font-semibold mb-5">Login</h2>

        <form onSubmit={handleSubmit} className=" space-y-6">
          <input
            className="w-full rounded border border-slate-600  px-4 py-3 text-sm placeholder:text-slate-600"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            required
          />

          <input
            className="w-full rounded border border-slate-600  px-4 py-3 text-sm placeholder:text-slate-600"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />

          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          <button
            className="w-full rounded-xl  px-4 py-3 font-semibold bg-gray-700 text-white cursor-pointer"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
