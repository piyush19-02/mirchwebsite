import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Input } from "../../components/shared/Input";
import { Button } from "../../components/shared/Button";

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
const [alert, setAlert] = useState<AlertType>(null);
type AlertType = {
  type: "success" | "error";
  message: string;
} | null;


  // 🔹 Load product data
  useEffect(() => {
  fetch(`/api/products/${id}`)
    .then(res => res.json())
    .then(data => {
      const product = data.data ?? data; // 🔥 IMPORTANT

      if (!product) {
        setAlert({ type: "error", message: "Cannot find data" });
        return;
      }

      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setActive(product.active === "1" || product.active === 1);
      setLoading(false);
    })
    .catch(() => {
      setAlert({ type: "error", message: "Failed to load product" });
      setLoading(false);
    });
}, [id]);


  // 🔹 Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("active", active ? "1" : "0");
    if (image) {formData.append("image", image);}

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "POST", // CI friendly
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ type: "success", message: "Product updated successfully ✅" });
        setTimeout(() => navigate("/admin/products"), 1500);
      } else {
        setAlert({ type: "error", message: data.message || "Update failed" });
      }
    } catch {
      setAlert({ type: "error", message: "Server error" });
    }
  };


  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="md:ml-64 p-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

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

        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded shadow">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input label="Description" multiline value={description} onChange={(e) => setDescription(e.target.value)} />

   <input
  key={id}
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  }}
/>




          <label className="flex gap-2 items-center text-sm">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Active
          </label>

          <Button type="submit" size="lg">
            Update Product
          </Button>
        </form>
      </div>
    </div>
  );
}
