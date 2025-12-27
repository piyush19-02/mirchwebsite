import React from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ProductTable } from '../../components/admin/ProductTable';
import { Button } from '../../components/shared/Button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
export function ViewProducts() {
  return <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="md:ml-64 p-8">
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-500">Manage your spice inventory</p>
          </div>
          <Link to="/admin/add-product">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
          </Link>
        </header>

        <ProductTable />
      </div>
    </div>;
}