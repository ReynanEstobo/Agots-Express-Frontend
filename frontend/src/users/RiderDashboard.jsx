import {
  CheckCircle2,
  MapPin,
  Package,
  Phone,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  acceptDelivery,
  completeDelivery,
  fetchRiderById,
  fetchRiderOrders,
  fetchRiderStats,
} from "../api/RiderAPI";
import { useToast } from "../hooks/use-toast";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

// -------------------- SMALL FIELD --------------------
const Info = ({ label, value }) => (
  <div className="flex flex-col gap-0.5 sm:gap-1">
    <span className="text-xs sm:text-sm font-medium text-gray-500">
      {label}
    </span>
    <span className="text-sm sm:text-base font-semibold text-gray-800 break-words">
      {value || "—"}
    </span>
  </div>
);

// -------------------- LARGE BLOCK FIELD --------------------
const BlockInfo = ({ label, value }) => (
  <div className="flex flex-col gap-1 sm:gap-1.5">
    <span className="text-xs sm:text-sm font-medium text-gray-500">
      {label}
    </span>
    <div className="w-full p-3 sm:p-4 rounded-lg bg-gray-50 border text-sm sm:text-base text-gray-800 leading-relaxed break-words whitespace-pre-line">
      {value || "—"}
    </div>
  </div>
);

// -------------------- DELIVERY MODAL --------------------
const DeliveryModal = ({ delivery, onClose }) => {
  if (!delivery) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white w-full max-w-full sm:max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Delivery Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Info label="Order ID" value={delivery.orderId} />
            <Info
              label="Customer Name"
              value={`${delivery.customer_first_name} ${delivery.customer_last_name}`}
            />
            <Info label="Phone" value={delivery.customer_phone} />
            <Info label="Payment Method" value={delivery.payment_method} />
            <Info label="Status" value={delivery.status} />
            <Info label="Total Amount" value={`₱${delivery.total_amount}`} />
          </div>

          <BlockInfo
            label="Delivery Address"
            value={delivery.customer_address}
          />
          {delivery.delivery_instructions && (
            <BlockInfo
              label="Delivery Instructions"
              value={delivery.delivery_instructions}
            />
          )}
          <BlockInfo
            label="Assigned Rider"
            value={
              delivery.rider_name
                ? `${delivery.rider_name} (${delivery.rider_phone})`
                : "Not Assigned"
            }
          />
        </div>

        {/* FOOTER */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------- RIDER DASHBOARD --------------------
const RiderDashboard = () => {
  const { addToast } = useToast();
  const riderId = sessionStorage.getItem("user_id");

  const [rider, setRider] = useState({ name: "Loading...", riderId: "" });
  const [activeDeliveries, setActiveDeliveries] = useState([]);
  const [deliveryHistory, setDeliveryHistory] = useState([]);
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    totalEarnings: 0,
    avgRating: 0,
    totalReviews: 0,
  });
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // -------------------- FETCH RIDER INFO --------------------
  useEffect(() => {
    if (!riderId) return setRider({ name: "Unknown Rider", riderId: "N/A" });

    const getRiderInfo = async () => {
      try {
        const data = await fetchRiderById(riderId);
        setRider({
          name: data?.name || "Unknown Rider",
          riderId: data?.riderId || riderId,
        });
      } catch (err) {
        console.error(err);
        addToast({ title: "Error", description: "Failed to fetch rider info" });
        setRider({ name: "Unknown Rider", riderId });
      }
    };

    getRiderInfo();
  }, [riderId, addToast]);

  // -------------------- FETCH DELIVERIES --------------------
  const fetchDeliveries = async () => {
    try {
      const assigned = await fetchRiderOrders(riderId, "assigned");
      const onTheWay = await fetchRiderOrders(riderId, "on the way");
      const completed = await fetchRiderOrders(riderId, "completed");

      // Active deliveries: assigned + on the way
      const uniqueActive = [...assigned, ...onTheWay].filter(
        (order, idx, self) => idx === self.findIndex((o) => o.id === order.id)
      );

      const uniqueCompleted = completed.filter(
        (order, idx, self) => idx === self.findIndex((o) => o.id === order.id)
      );

      setActiveDeliveries(
        uniqueActive.map((order) => ({
          id: order.id,
          orderId: `ORD-${String(order.id).padStart(3, "0")}`,
          customer_first_name: order.customer_first_name,
          customer_last_name: order.customer_last_name,
          customer_address: order.customer_address,
          customer_phone: order.customer_phone,
          payment_method: order.payment_method,
          status: order.status,
          total_amount: order.total_amount,
          items: order.items.length,
          delivery_instructions: order.delivery_instructions,
          rider_name: order.rider_name,
          rider_phone: order.rider_phone,
        }))
      );

      setDeliveryHistory(
        uniqueCompleted.map((order) => ({
          id: order.id,
          orderId: `ORD-${String(order.id).padStart(3, "0")}`,
          customer: `${order.customer_first_name} ${order.customer_last_name}`,
          completedAt: order.completed_at,
          amount: `₱${order.total_amount}`,
          rating: order.rating || 0,
        }))
      );
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Failed to fetch deliveries" });
    }
  };

  useEffect(() => {
    if (riderId) fetchDeliveries();
  }, [riderId]);

  // -------------------- FETCH STATS --------------------
  const fetchStats = async () => {
    try {
      const data = await fetchRiderStats(riderId);
      setStats(data);
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Failed to fetch stats" });
    }
  };

  useEffect(() => {
    if (riderId) fetchStats();
  }, [riderId]);

  // -------------------- HANDLE ACCEPT DELIVERY --------------------
  const handleAcceptDelivery = async (deliveryId) => {
    try {
      await acceptDelivery(riderId, deliveryId);
      addToast({
        title: "Delivery Accepted",
        description: `You've accepted delivery ORD-${String(
          deliveryId
        ).padStart(3, "0")}`,
      });
      setActiveDeliveries((prev) =>
        prev.map((d) =>
          d.id === deliveryId ? { ...d, status: "on the way" } : d
        )
      );
      fetchStats();
    } catch (err) {
      console.error(err);
      addToast({ title: "Error", description: "Failed to accept delivery" });
    }
  };

  // -------------------- HANDLE MARK DELIVERED --------------------
  const handleMarkDelivered = async (deliveryId) => {
    try {
      await completeDelivery(riderId, deliveryId);
      addToast({
        title: "Delivery Completed",
        description: `Delivery ORD-${String(deliveryId).padStart(
          3,
          "0"
        )} marked as delivered`,
      });

      const delivered = activeDeliveries.find((d) => d.id === deliveryId);
      if (delivered) {
        setDeliveryHistory((prev) => [
          { ...delivered, completedAt: new Date().toISOString(), rating: 0 },
          ...prev,
        ]);
      }

      setActiveDeliveries((prev) => prev.filter((d) => d.id !== deliveryId));
      fetchStats();
    } catch (err) {
      console.error(err);
      addToast({
        title: "Error",
        description: "Failed to mark delivery as completed",
      });
    }
  };

  // -------------------- VIEW MODAL --------------------
  const handleViewInfo = (delivery) => setSelectedDelivery(delivery);
  const closeModal = () => setSelectedDelivery(null);

  // -------------------- STATUS COLOR --------------------
  const getStatusColor = (status) => {
    switch (status) {
      case "assigned":
        return { backgroundColor: "#F2E26D", color: "#0A1A3F" };
      case "on the way":
        return { backgroundColor: "#33C3FF", color: "#FFFFFF" };
      default:
        return { backgroundColor: "#F5F5F5", color: "#374151" };
    }
  };

  // -------------------- RENDER --------------------
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F5F5" }}>
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#0A1A3F",
          color: "#FFF",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              Rider Dashboard
            </h1>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
              {rider.name} • Rider ID: {rider.riderId}
            </p>
          </div>

          {/* ---------------- LOGOUT BUTTON ---------------- */}
          <button
            onClick={() => {
              sessionStorage.clear(); // remove session data
              window.location.href = "/"; // redirect to login or landing page
            }}
            style={{
              backgroundColor: "#F2C94C",
              color: "#0A1A3F",
              fontWeight: 600,
              padding: "0.5rem 1.25rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#E0B941")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#F2C94C")}
          >
            Log Out
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem" }}
      >
        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {[
            {
              icon: Package,
              title: "Today's Deliveries",
              value: stats.totalDeliveries,
              color: "#0A1A3F",
              extra: `From delivery history`,
            },
            {
              icon: TrendingUp,
              title: "Today's Earnings",
              value: `₱${stats.totalEarnings}`,
              color: "#F2C94C",
              extra: `From ${stats.totalDeliveries} deliveries`,
            },
            {
              icon: Star,
              title: "Average Rating",
              value: stats.avgRating.toFixed(1),
              color: "#0A1A3F",
              extra: `Based on ${stats.totalReviews} reviews`,
            },
          ].map((card, idx) => (
            <Card key={idx}>
              <CardHeader style={{ paddingBottom: "0.75rem" }}>
                <CardTitle
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#6B7280",
                  }}
                >
                  <card.icon style={{ width: "1rem", height: "1rem" }} />{" "}
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  style={{
                    fontSize: "1.875rem",
                    fontWeight: "700",
                    color: card.color,
                  }}
                >
                  {card.value}
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#6B7280",
                    marginTop: "0.25rem",
                  }}
                >
                  {card.extra}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TABS */}
        <Tabs defaultValue="assigned" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 gap-4">
            <TabsTrigger value="assigned">
              Active Deliveries ({activeDeliveries.length})
            </TabsTrigger>
            <TabsTrigger value="history">Delivery History</TabsTrigger>
          </TabsList>

          {/* ACTIVE DELIVERIES */}
          <TabsContent value="assigned" className="space-y-4">
            {activeDeliveries.length === 0 ? (
              <Card>
                <CardContent
                  style={{ padding: "3rem 1rem", textAlign: "center" }}
                >
                  <Package
                    style={{
                      height: "3rem",
                      width: "3rem",
                      margin: "0 auto 1rem",
                      color: "#6B7280",
                    }}
                  />
                  <p style={{ color: "#6B7280" }}>
                    No active deliveries at the moment
                  </p>
                </CardContent>
              </Card>
            ) : (
              activeDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardHeader>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <CardTitle
                          style={{
                            fontSize: "1.125rem",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {delivery.orderId}
                        </CardTitle>
                        <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                          {delivery.id}
                        </p>
                      </div>
                      <Badge
                        style={{
                          ...getStatusColor(delivery.status),
                          padding: "0.25rem 1rem",
                          fontWeight: "500",
                        }}
                      >
                        {delivery.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2,1fr)",
                        gap: "1.5rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                          }}
                        >
                          <MapPin
                            style={{
                              width: "1.25rem",
                              height: "1.25rem",
                              color: "#6B7280",
                              marginTop: "0.125rem",
                            }}
                          />
                          <div>
                            <p style={{ fontWeight: 500 }}>
                              {delivery.customer_first_name}{" "}
                              {delivery.customer_last_name}
                            </p>
                            <p
                              style={{ fontSize: "0.875rem", color: "#6B7280" }}
                            >
                              {delivery.customer_address}
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <Phone
                            style={{
                              width: "1.25rem",
                              height: "1.25rem",
                              color: "#6B7280",
                            }}
                          />
                          <p style={{ fontSize: "0.875rem" }}>
                            {delivery.customer_phone}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.75rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{ fontSize: "0.875rem", fontWeight: 500 }}
                          >
                            Items
                          </span>
                          <span style={{ fontWeight: 700 }}>
                            {delivery.items}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{ fontSize: "0.875rem", fontWeight: 500 }}
                          >
                            Amount
                          </span>
                          <span
                            style={{ fontWeight: 700 }}
                          >{`₱${delivery.total_amount}`}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        paddingTop: "0.5rem",
                      }}
                    >
                      {delivery.status === "assigned" ? (
                        <Button
                          style={{
                            flex: 1,
                            backgroundColor: "#F2C94C",
                            color: "#0A1A3F",
                          }}
                          onClick={() => handleAcceptDelivery(delivery.id)}
                        >
                          <CheckCircle2
                            style={{
                              width: "1rem",
                              height: "1rem",
                              marginRight: "0.5rem",
                            }}
                          />
                          Accept Delivery
                        </Button>
                      ) : (
                        <Button
                          style={{
                            flex: 1,
                            backgroundColor: "#2BA94C",
                            color: "#FFF",
                          }}
                          onClick={() => handleMarkDelivered(delivery.id)}
                        >
                          <CheckCircle2
                            style={{
                              width: "1rem",
                              height: "1rem",
                              marginRight: "0.5rem",
                            }}
                          />
                          Mark Delivered
                        </Button>
                      )}
                      <Button
                        style={{ flex: 1 }}
                        onClick={() => handleViewInfo(delivery)}
                      >
                        View Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* DELIVERY HISTORY - Updated design */}
          <TabsContent value="history" className="space-y-4">
            {deliveryHistory.length === 0 ? (
              <Card>
                <CardContent
                  style={{ padding: "3rem 1rem", textAlign: "center" }}
                >
                  <Package
                    style={{
                      height: "3rem",
                      width: "3rem",
                      margin: "0 auto 1rem",
                      color: "#6B7280",
                    }}
                  />
                  <p style={{ color: "#6B7280" }}>No delivery history</p>
                </CardContent>
              </Card>
            ) : (
              deliveryHistory.map((delivery) => {
                const completedDate = delivery.completedAt
                  ? new Date(delivery.completedAt).toLocaleString("en-PH")
                  : "-";
                return (
                  <Card key={delivery.id}>
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 500, fontSize: "1rem" }}>
                          {delivery.customer}
                        </p>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "#6B7280",
                            marginTop: "0.25rem",
                          }}
                        >
                          {delivery.orderId} • Completed on {completedDate}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            fontWeight: 700,
                            color: "#0A1A3F",
                            fontSize: "1rem",
                          }}
                        >
                          {delivery.amount}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            justifyContent: "flex-end",
                            marginTop: "0.5rem",
                          }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                color:
                                  i < delivery.rating ? "#22C55E" : "#4B5563",
                                fill: i < delivery.rating ? "#22C55E" : "none",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>

      <DeliveryModal delivery={selectedDelivery} onClose={closeModal} />
    </div>
  );
};

export default RiderDashboard;
