import { useEffect, useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";

const API = "https://api.spicesshreeganesh.com";

// 🎨 Preset colors (mobile dropdown)
const colorOptions = [
  { name: "Orange", value: "#f97316" },
  { name: "Red", value: "#ef4444" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Yellow", value: "#eab308" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Sky Blue", value: "#0ea5e9" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Lime", value: "#84cc16" },
  { name: "Gray", value: "#6b7280" },
  { name: "Dark Gray", value: "#374151" },
  { name: "Charcoal", value: "#1f2933" },
  { name: "Black", value: "#0f172a" },
];


export default function ProductsSectionSetting() {
  const [color, setColor] = useState("#f97316");

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // 🔹 GET saved color from DB
  useEffect(() => {
    fetch(`${API}/api/settings`)
      .then(res => res.json())
      .then(data => {
        if (data?.bg_color) setColor(data.bg_color);
      });
  }, []);

  // 🔹 SAVE color
  const saveColor = async () => {
    try {
      const res = await fetch(`${API}/api/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bg_color: color }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({
          type: "success",
          message: "Background color updated successfully ✅",
        });
      } else {
        setAlert({
          type: "error",
          message: data.message || "Failed to update color",
        });
      }
    } catch {
      setAlert({
        type: "error",
        message: "Server error ❌",
      });
    }

    // auto-hide alert
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="md:ml-64 p-8 border">
        {/* 🔔 ALERT */}
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

        <h2 className="text-2xl font-bold mb-6">
          Products Section Background
        </h2>

        {/* 📱 MOBILE: Dropdown */}
       <div className="md:hidden mb-4">
  <label className="block font-medium mb-2">
    Select Background Color
  </label>

  <div className="flex items-center gap-3">
    {/* Dropdown */}
    <select
      value={color}
      onChange={e => setColor(e.target.value)}
      className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {colorOptions.map(c => (
        <option key={c.value} value={c.value}>
          {c.name}
        </option>
      ))}
    </select>

    {/* 👀 Selected Color Preview */}
    <div
      className="w-10 h-10 rounded border"
      style={{ backgroundColor: color }}
      title={color}
    />
  </div>
</div>
        {/* 💻 DESKTOP: Color Picker */}
        <div className="hidden md:block mb-4">
          <label className="mr-3 font-medium">
            Click Here For Select Color ➡
          </label>

          <input
            className="border p-1"
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </div>

        {/* 💾 SAVE BUTTON */}
        <button
          className="mt-4 bg-green-500 px-5 py-2 text-white rounded-xl border border-stone-950 hover:bg-green-600"
          onClick={saveColor}
        >
          Save
        </button>

        {/* 👀 PREVIEW */}
        <div
          className="mt-6 rounded"
          style={{
            height: 50,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
