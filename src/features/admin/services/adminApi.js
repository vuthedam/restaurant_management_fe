import api from "../../../services/api";

export async function fetchAdminList(path) {
  const { data } = await api.get(path);
  return data?.data ?? [];
}

export async function fetchAdminItem(path) {
  const { data } = await api.get(path);
  return data?.data ?? null;
}

export async function postAdmin(path, body) {
  const { data } = await api.post(path, body);
  return data?.data;
}

export async function patchAdmin(path, body) {
  const { data } = await api.patch(path, body);
  return data?.data;
}

export async function deleteAdmin(path) {
  const { data } = await api.delete(path);
  return data?.data;
}

export function getApiError(err, fallback = "Đã xảy ra lỗi.") {
  return err?.response?.data?.message || err?.message || fallback;
}
