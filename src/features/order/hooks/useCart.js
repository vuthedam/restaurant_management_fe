import { useCallback, useMemo, useState } from "react";

export default function useCart() {
  const [lines, setLines] = useState([]);

  const addItem = useCallback((menuItem) => {
    const unitPrice = menuItem.unitPrice ?? menuItem.salePrice ?? menuItem.price;
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.menuItemId === menuItem._id);
      if (idx >= 0) {
        const next = [...prev];
        const qty = next[idx].quantity + 1;
        next[idx] = {
          ...next[idx],
          quantity: qty,
          subtotal: unitPrice * qty,
        };
        return next;
      }
      return [
        ...prev,
        {
          menuItemId: menuItem._id,
          name: menuItem.name,
          image: menuItem.image,
          unitPrice,
          quantity: 1,
          subtotal: unitPrice,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((menuItemId, delta) => {
    setLines((prev) =>
      prev
        .map((line) => {
          if (line.menuItemId !== menuItemId) return line;
          const quantity = line.quantity + delta;
          if (quantity <= 0) return null;
          return {
            ...line,
            quantity,
            subtotal: line.unitPrice * quantity,
          };
        })
        .filter(Boolean),
    );
  }, []);

  const removeLine = useCallback((menuItemId) => {
    setLines((prev) => prev.filter((l) => l.menuItemId !== menuItemId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.subtotal, 0),
    [lines],
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, line) => sum + line.quantity, 0),
    [lines],
  );

  return {
    lines,
    total,
    itemCount,
    addItem,
    updateQty,
    removeLine,
    clear,
  };
}
