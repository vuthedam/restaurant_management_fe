/**
 * PAGE CONTAINER: Orders.jsx (Live Order Management)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/orders
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Orders.jsx
 *
 * MÔ TẢ:
 * Trang quản lý đơn hàng trực tiếp tại bàn dành cho Admin và Staff.
 * Hiển thị các đơn hàng dạng card theo thời gian thực, hỗ trợ lọc theo bàn và tab trạng thái.
 * Cho phép cập nhật trạng thái đơn hàng, từng món, thêm/sửa/xóa món trong đơn đang hoạt động.
 */

import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "../../../layouts/AdminLayout";
import OrderTable from "../components/orders/OrderTable";
import OrderMobileCard from "../components/orders/OrderMobileCard";
import OrderEditItemsModal from "../components/orders/OrderEditItemsModal";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { mapOrderToCard } from "../utils/adminMappers";
import {
  getApiError,
  patchAdmin,
  postAdmin,
  deleteAdmin,
} from "../services/adminApi";

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tableId = searchParams.get("tableId") || "";

  const {
    items: orders,
    loading,
    error,
    reload,
  } = useAdminList(tableId ? `/orders?tableId=${tableId}` : "/orders");
  const { items: tables } = useAdminList("/tables");
  const { items: orderItems } = useAdminList("/order-items");
  const { items: menuItems } = useAdminList("/menu-items");

  const [updatingId, setUpdatingId] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedAddMenuId, setSelectedAddMenuId] = useState("");
  const [selectedAddQty, setSelectedAddQty] = useState(1);

  const tableLookup = useMemo(() => {
    const map = {};
    tables.forEach((t) => {
      map[String(t._id)] = t;
    });
    return map;
  }, [tables]);

  const itemsByOrder = useMemo(() => {
    const map = {};
    orderItems.forEach((item) => {
      const key = String(item.orderId?._id ?? item.orderId ?? "");
      if (!map[key]) map[key] = [];
      map[key].push(item);
    });
    return map;
  }, [orderItems]);

  const ORDER_STATUS_BADGES = {
    pending: {
      label: "Chờ duyệt",
      classes: "bg-yellow-50 text-yellow-800 border-yellow-200",
    },
    confirmed: {
      label: "Đã duyệt",
      classes: "bg-teal-50 text-teal-800 border-teal-200",
    },
    preparing: {
      label: "Đang nấu",
      classes: "bg-orange-50 text-orange-800 border-orange-200",
    },
    served: {
      label: "Đã lên món",
      classes: "bg-blue-50 text-blue-800 border-blue-200",
    },
    completed: {
      label: "Hoàn thành",
      classes: "bg-slate-50 text-slate-800 border-slate-200",
    },
    cancelled: {
      label: "Đã hủy",
      classes: "bg-gray-50 text-gray-600 border-gray-200",
    },
  };

  const ITEM_STATUS_BADGES = {
    pending: {
      label: "Chờ duyệt",
      classes: "bg-yellow-50 text-yellow-800 border-yellow-200",
    },
    confirmed: {
      label: "Đã duyệt",
      classes: "bg-teal-50 text-teal-800 border-teal-200",
    },
    preparing: {
      label: "Đang nấu",
      classes: "bg-orange-50 text-orange-800 border-orange-200",
    },
    served: {
      label: "Đã lên món",
      classes: "bg-blue-50 text-blue-800 border-blue-200",
    },
    cancelled: {
      label: "Đã hủy",
      classes: "bg-gray-50 text-gray-600 border-gray-200",
    },
  };

  const orderCards = useMemo(
    () =>
      [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((order) =>
          mapOrderToCard(order, {
            tableLookup,
            orderItems: itemsByOrder[String(order._id)] || [],
          }),
        ),
    [orders, tableLookup, itemsByOrder],
  );

  const editingOrderItems = useMemo(() => {
    if (!editingOrder) return [];
    return orderItems.filter(
      (item) =>
        String(item.orderId?._id ?? item.orderId ?? "") ===
        String(editingOrder.id),
    );
  }, [orderItems, editingOrder]);

  const availableMenu = useMemo(
    () =>
      menuItems.filter((m) => m.status === "active" && m.isAvailable !== false),
    [menuItems],
  );

  const handleAdvance = async (order) => {
    if (!order.nextStatus) return;
    setUpdatingId(order.id);
    setActionError(null);
    try {
      await patchAdmin(`/orders/${order.id}`, { status: order.nextStatus });
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không cập nhật được trạng thái đơn."));
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateItemStatus = async (itemId, nextStatus) => {
    setActionError(null);
    try {
      await patchAdmin(`/order-items/${itemId}`, { status: nextStatus });
      await reload();
    } catch (err) {
      setActionError(
        getApiError(err, "Không cập nhật được trạng thái món ăn."),
      );
    }
  };

  const handleUpdateQty = async (item, delta) => {
    const nextQty = item.quantity + delta;
    if (nextQty <= 0) {
      handleDeleteItem(item);
      return;
    }
    setActionError(null);
    try {
      await patchAdmin(`/order-items/${item._id}`, { quantity: nextQty });
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không cập nhật được số lượng."));
    }
  };

  const handleDeleteItem = async (item) => {
    if (!window.confirm(`Xóa món "${item.name}" khỏi đơn hàng này?`)) return;
    setActionError(null);
    try {
      await deleteAdmin(`/order-items/${item._id}`);
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không xóa được món ăn."));
    }
  };

  const handleAddMenuItem = async () => {
    if (!editingOrder || !selectedAddMenuId) return;
    const menuItem = menuItems.find(
      (m) => String(m._id) === String(selectedAddMenuId),
    );
    if (!menuItem) return;

    const existing = editingOrderItems.find(
      (item) =>
        String(item.menuItemId?._id || item.menuItemId) ===
        String(selectedAddMenuId),
    );

    setActionError(null);
    try {
      if (existing) {
        await patchAdmin(`/order-items/${existing._id}`, {
          quantity: existing.quantity + selectedAddQty,
        });
      } else {
        await postAdmin("/order-items", {
          orderId: editingOrder.id,
          menuItemId: menuItem._id,
          name: menuItem.name,
          image: menuItem.image || null,
          price: menuItem.price,
          quantity: selectedAddQty,
          subtotal: menuItem.price * selectedAddQty,
          status: "pending",
        });
      }
      setSelectedAddMenuId("");
      setSelectedAddQty(1);
      await reload();
    } catch (err) {
      setActionError(getApiError(err, "Không thêm được món vào đơn."));
    }
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditingOrder(null);
    setSelectedAddMenuId("");
    setSelectedAddQty(1);
  };

  return (
    <AdminLayout title="Đơn hàng trực tiếp">
      {loading ? <PageLoading /> : null}
      {!loading && error ? (
        <PageError message={error} onRetry={reload} />
      ) : null}

      {actionError ? (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {actionError}
        </p>
      ) : null}

      {tableId && !loading && !error ? (
        <div className="mb-6 flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-600">
              filter_list
            </span>
            <span className="text-sm font-semibold text-orange-950">
              Đang hiển thị đơn hàng của bàn:{" "}
              <strong className="text-base">
                {tableLookup[tableId]?.name || "Bàn..."}
              </strong>
            </span>
          </div>
          <button
            onClick={() => setSearchParams({})}
            className="text-sm font-bold text-orange-700 hover:text-orange-900 underline flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm font-bold">
              close
            </span>
            Xem tất cả các bàn
          </button>
        </div>
      ) : null}

      {!loading && !error ? (
        orderCards.length ? (
          <div className="space-y-6">
            <div className="lg:hidden grid grid-cols-1 gap-6">
              {orderCards.map((order) => (
                <OrderMobileCard
                  key={order.id}
                  order={order}
                  updatingId={updatingId}
                  onAdvance={handleAdvance}
                  onEditItems={(ord) => {
                    setEditingOrder(ord);
                    setEditModalOpen(true);
                  }}
                  orderStatusBadges={ORDER_STATUS_BADGES}
                />
              ))}
            </div>

            <div className="hidden lg:block">
              <OrderTable
                orders={orderCards}
                updatingId={updatingId}
                onAdvance={handleAdvance}
                onUpdateItemStatus={handleUpdateItemStatus}
                onEditItems={(ord) => {
                  setEditingOrder(ord);
                  setEditModalOpen(true);
                }}
                itemStatusBadges={ITEM_STATUS_BADGES}
                orderStatusBadges={ORDER_STATUS_BADGES}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-12">Chưa có đơn hàng.</p>
        )
      ) : null}

      <OrderEditItemsModal
        open={editModalOpen}
        onClose={closeEditModal}
        tableLabel={editingOrder?.table}
        orderItems={editingOrderItems}
        availableMenu={availableMenu}
        selectedMenuId={selectedAddMenuId}
        selectedQty={selectedAddQty}
        onMenuChange={setSelectedAddMenuId}
        onQtyChange={setSelectedAddQty}
        onAdd={handleAddMenuItem}
        onUpdateQty={handleUpdateQty}
        onDelete={handleDeleteItem}
        error={actionError}
      />
    </AdminLayout>
  );
}
