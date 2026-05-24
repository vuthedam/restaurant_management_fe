import { useCallback, useEffect, useState } from "react";
import { fetchAdminList } from "../services/adminApi";

export default function useAdminList(path) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminList(path);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Không tải được dữ liệu. Kiểm tra backend đang chạy.",
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, reload: load };
}
