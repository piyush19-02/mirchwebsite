import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/shared/Button";
import { Input } from "../../components/shared/Input";

export function AdminLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Login failed");
        
      }
    } catch {
      alert("Server error");
    } finally {
      setIsLoading(false);
    }    
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden">
        <div className="bg-red-700 p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <span className="text-3xl">🌶️</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-red-100 mt-2">Mirchi Masala Store Management</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              required
            />

            <div className="pt-2">
              <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
                Sign In to Dashboard
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500 bg-gray-50 p-3 rounded-md border border-gray-100">
            {/* empty intentionally */}
          </div>
        </div>
      </div>
    </div>
  );
}
