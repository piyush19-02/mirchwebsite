import { useEffect, useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Trash2 } from "lucide-react";

const slots = [1, 2, 3, 4,5];

export default function StoryImage() {
  const [images, setImages] = useState<any[]>([]);
  const [files, setFiles] = useState<{ [key: number]: File | null }>({});
  const [loading, setLoading] = useState<number | null>(null);
const[alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const fetchImages = () => {
    fetch("http://localhost:8080/api/admin/hero-images")
      .then(res => res.json())
      .then(data => setImages(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = (slot: number) => {
    const file = files[slot];
    if (!file) {
      setAlert({ type: "error", message: "Please select a file first." });
      return;
    }
setTimeout(() => setAlert(null), 3000);
    setLoading(slot);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("slot", slot.toString());

    fetch("http://localhost:8080/api/admin/hero-images", {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setFiles(prev => ({ ...prev, [slot]: null }));
        fetchImages();
      })
      .finally(() => setLoading(null));
  };

  const getImageBySlot = (slot: number) =>
    images.find(img => Number(img.slot) === slot);
 const deleteImages = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/admin/hero-images/${id}`, { method: "DELETE" });

    if (res.ok) {
      setImages(prev => prev.filter(p => p.id !== id));
      setAlert({ type: "success", message: "Product deleted successfully" });
    } else {
      setAlert({ type: "error", message: "Delete failed" });
    }

    setTimeout(() => setAlert(null), 3000);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 md:ml-64">
        <h1 className="text-2xl font-bold mb-8">
          Story Images (4 Fixed Slots)
        </h1>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slots.map(slot => {
            const img = getImageBySlot(slot);

            return (
              <div key={slot} className="bg-white border rounded p-4">
                <h2 className="font-semibold mb-3">Image {slot}</h2>
<Trash2
                  className="h-4 w-4 text-red-500 cursor-pointer"
                  onClick={() => deleteImages(img.id)}
                />
                {img ? (
                  <img
                    src={`http://localhost:8080/${img.image}`}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center bg-gray-100 rounded mb-3 text-gray-400">
                    No Image
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={e =>
                    setFiles({
                      ...files,
                      [slot]: e.target.files?.[0] || null,
                    })
                  }
                />

                <button
                  onClick={() => uploadImage(slot)}
                  disabled={loading === slot}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded"
                >
                  {loading === slot ? "Uploading..." : "Upload Image"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
