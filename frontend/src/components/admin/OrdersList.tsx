import { useEffect, useState } from "react";

export function OrdersList() {
 const [orders, setOrders] = useState<Order[]>([]);
interface Order {
  id: number;
  product_id: number;
  product_name: string;
  qty: number;
  customer_name: string;
  mobile: string;
  location: string;
  created_at: string;
}


  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="bg-white p-4 rounded shadow">
          <h4 className="font-bold">{order.product_name}</h4>
          <p>Qty: {order.qty}</p>
          <p>Name: {order.customer_name}</p>
          <p>Mobile: {order.mobile}</p>
          <p>Address: {order.location}</p>
        </div>
      ))}
    </div>
  );
}
