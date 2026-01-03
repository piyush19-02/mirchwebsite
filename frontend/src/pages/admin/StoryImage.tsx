import { useEffect, useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Plus, Trash2 } from "lucide-react";

const API = "http://localhost:8080";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ name: "", role: "" });
  const [image, setImage] = useState<File | null>(null);

  // ================= FETCH =================
  const fetchTeam = async () => {
    const res = await fetch(`/api/team`);
    const data = await res.json();
    setTeam(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // ================= ADD =================
  const addMember = async () => {
    if (!image) return alert("Image required");

    setLoading(true);

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("image", image);

    await fetch(`/admin/team/store`, {
      method: "POST",
      body: fd,
    });

    // reset UI
    setForm({ name: "", role: "" });
    setImage(null);
    setShowForm(false);
    setLoading(false);

    fetchTeam();
  };

  // ================= DELETE =================
  const deleteMember = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    await fetch(`${API}/api/admin/team/${id}`, {
      method: "DELETE",
    });

    setTeam(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Team Members</h1>

          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            <Plus size={18} /> Add Member
          </button>
        </div>

        {/* ADD FORM */}
        {showForm && (
          <div className="bg-white border rounded p-6 mb-8 grid gap-4 max-w-xl">
            <input
              placeholder="Name"
              value={form.name}
              onChange={e =>
                setForm({ ...form, name: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              placeholder="Role"
              value={form.role}
              onChange={e =>
                setForm({ ...form, role: e.target.value })
              }
              className="border p-2 rounded"
            />

            <input
              type="file"
              onChange={e =>
                setImage(e.target.files?.[0] || null)
              }
            />

            <div className="flex gap-3">
              <button
                onClick={addMember}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* LIST */}
        <div className="grid md:grid-cols-4 gap-6">
          {team.map(member => (
            <div
              key={member.id}
              className="bg-white border rounded p-4 text-center"
            >
              <img
                src={`${API}/${member.image}`}
                className="h-28 w-28 mx-auto rounded-full object-cover mb-3"
              />
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>

              <Trash2
                className="h-4 w-4 text-red-500 mx-auto mt-3 cursor-pointer"
                onClick={() => deleteMember(member.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
