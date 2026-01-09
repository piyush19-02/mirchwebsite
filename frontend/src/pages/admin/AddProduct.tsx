import { useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Input } from "../../components/shared/Input";
import { Button } from "../../components/shared/Button";

export function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // ✅ double submit prevent

    setLoading(true); // 🔥 start loading

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("active", active ? "1" : "0");
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ type: "success", message: "Product added successfully ✅" });
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
      } else {
        setAlert({ type: "error", message: data.message || "Failed" });
      }
    } catch {
      setAlert({ type: "error", message: "Server error" });
    } finally {
      setLoading(false); // 🔥 stop loading
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="md:ml-64 p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>

        {alert && (
          <div
            className={`mb-4 rounded px-4 py-3 text-sm ${
              alert.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-white p-6 rounded shadow"
        >
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            label="Description"
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="block w-full text-sm"
          />

          <label className="flex gap-2 items-center text-sm">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active
          </label>

          <Button type="submit" size="lg" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  );
}
