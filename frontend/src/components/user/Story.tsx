import { useEffect, useState } from "react";

const API = "http://localhost:8080";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export default function Story() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  const fetchTeam = async () => {
    const res = await fetch(`${API}/api/team`);
    const data = await res.json();
    setTeam(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <section className="bg-[#fdf7f2] py-16">
      {/* HEADING */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">Our Story</h2>
        <p className="text-black max-w-3xl text-2xl mx-auto">

For over 40 years, Mirchi Masala (spices ) has been synonymous with purity.

Traditional grinding preserves natural oils and aroma.        </p>
      </div>

      {/* TEAM LIST – CENTER FIXED */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">
          {team.map(member => (
            <div
              key={member.id}
              className="w-[300px] h-[320px] bg-white rounded-xl shadow p-3 text-center"
            >
              <img
                src={`${API}/${member.image}`}
                alt={member.name}
                className="h-52 w-45 mx-auto object-cover mb-4"
              />

              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
