import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { DashboardCard } from "../../components/admin/DashboardCard";
import { OrdersList } from "../../components/admin/OrdersList";
import { Package, ShoppingBag, TrendingUp } from "lucide-react";

const API = "http://localhost:8080";

export function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetch(`${API}/api/dashboard/counts`)
      .then(res => res.json())
      .then(data => {
        setTotalProducts(data.totalProducts || 0);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="md:ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            title="Total Products"
            value={totalProducts}
            icon={Package}
            color="red"
          />

          <DashboardCard
            title="Total Orders"
            value="0"
            icon={ShoppingBag}
            color="orange"
          />

          <DashboardCard
            title="Today's Orders"
            value="0"
            icon={TrendingUp}
            color="amber"
          />
        </div>

        {/* rest same */}
        <OrdersList />
      </div>
    </div>
  );
}
