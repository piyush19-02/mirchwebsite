import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  active: number;
}

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

    if (res.ok) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setAlert({ type: "success", message: "Product deleted successfully" });
    } else {
      setAlert({ type: "error", message: "Delete failed" });
    }

    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow border border-yellow-200">

      {/* ALERT */}
      {alert && (
        <div
          className={`mx-6 mt-4 mb-2 px-4 py-3 rounded-md text-sm
          ${alert.type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"}`}
        >
          {alert.message}
        </div>
      )}

      <table className="w-full text-sm">
        <thead className="bg-yellow-50 text-amber-900">
          <tr>
            <th className="p-4 text-left">Product</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t border-yellow-100">
              <td className="p-4 flex items-center gap-3">
                <img
                  src={
                    product.image
                      ? `http://localhost:8080/uploads/products/${product.image}`
                      : "https://via.placeholder.com/40"
                  }
                  className="h-10 w-10 rounded-full object-cover"
                />
                {product.name}
              </td>

              <td className="p-4">₹{product.price}</td>

              <td className="p-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}>
                  {product.active ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="p-4 text-right flex justify-end gap-3">
                {/* ✏️ EDIT */}
                <Pencil
                  className="h-4 w-4 text-orange-500 cursor-pointer"
                  onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                />

                {/* 🗑 DELETE */}
                <Trash2
                  className="h-4 w-4 text-red-500 cursor-pointer"
                  onClick={() => deleteProduct(product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
