/**
 * PAGE CONTAINER: Menu.jsx (Menu Management)
 * TUYẾN ĐƯỜNG (ROUTE): /admin/menu
 * ĐỊA CHỈ FILE: table-order-ap/src/features/admin/pages/Menu.jsx
 *
 * MÔ TẢ:
 * Trang quản lý thực đơn dành cho Admin và Staff (quyền chỉnh sửa hạn chế).
 * Hỗ trợ hiển thị danh sách món ăn phân theo danh mục, tìm kiếm và lọc.
 * Cho phép Admin thêm mới món ăn, chỉnh sửa thông tin món ăn (tên, mô tả, giá,
 * hình ảnh, trạng thái còn/hết hàng) thông qua MenuItemFormModal.
 */

import { useMemo, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import CategoryTabs from "../components/menu/CategoryTabs";
import CategorySection from "../components/menu/CategorySection";
import MenuItemFormModal from "../components/menu/MenuItemFormModal";
import { PageError, PageLoading } from "../components/common/PageState";
import useAdminList from "../hooks/useAdminList";
import { mapMenuItemForCard } from "../utils/adminMappers";
import { canManageMenu } from "../../../config/adminPermissions";
import { useAuth } from "../../../contexts/AuthContext";

export default function Menu() {
  const { user } = useAuth();
  const allowManage = canManageMenu(user?.role);
  const { items: menuItems, loading: menuLoading, error: menuError, reload } =
    useAdminList("/menu-items");
  const { items: categories, loading: catLoading } = useAdminList("/categories");
  const [activeTab, setActiveTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const loading = menuLoading || catLoading;
  const error = menuError;

  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((c) => {
      map[String(c._id)] = c.name;
    });
    return map;
  }, [categories]);

  const mappedItems = useMemo(
    () =>
      menuItems.map((item) => {
        const id = item.categoryId?._id ?? item.categoryId;
        let categoryName = "—";
        if (typeof item.categoryId === "object" && item.categoryId?.name) {
          categoryName = item.categoryId.name;
        } else if (id) {
          categoryName = categoryMap[String(id)] || "—";
        }
        return mapMenuItemForCard(item, categoryName);
      }),
    [menuItems, categoryMap],
  );

  const filtered =
    activeTab === "all"
      ? mappedItems
      : mappedItems.filter((item) => {
          const cat = categories.find((c) => c._id === activeTab);
          return item.category === cat?.name;
        });

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach((item) => {
      const key = item.category || "Khác";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, [filtered]);

  const tabs = useMemo(
    () => [
      { id: "all", label: "Tất cả" },
      ...categories.map((c) => ({ id: c._id, label: c.name })),
    ],
    [categories],
  );

  return (
    <AdminLayout
      title="Quản lý thực đơn"
      actionLabel={allowManage ? "Thêm món mới" : undefined}
      onAction={allowManage ? () => setModalOpen(true) : undefined}
    >
      {allowManage ? (
        <MenuItemFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          categories={categories}
          onSuccess={reload}
        />
      ) : null}

      {loading ? <PageLoading /> : null}
      {!loading && error ? <PageError message={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <div className="space-y-8">
          <CategoryTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {Object.keys(grouped).length ? (
            Object.entries(grouped).map(([title, items]) => (
              <CategorySection
                key={title}
                title={title}
                items={items}
                readOnly={!allowManage}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-12">Chưa có món trong thực đơn.</p>
          )}
        </div>
      ) : null}
    </AdminLayout>
  );
}
