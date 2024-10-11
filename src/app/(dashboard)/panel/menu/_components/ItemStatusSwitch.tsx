import React, { useCallback, useEffect, useState } from "react";
import BasicSwitch from "@/components/forms/BasicSwitch";
import { MenuItem, useUpdateItem } from "@/store/menu";

interface ItemStatusSwitchProps {
  item: MenuItem;
  categoryId: string;
}

const ItemStatusSwitch: React.FC<ItemStatusSwitchProps> = ({
  item,
  categoryId,
}) => {
  const [enabled, setEnabled] = useState(item.status === "active");

  const updateItem = useUpdateItem();

  const onToggle = useCallback(() => {
    setEnabled(!enabled);

    updateItem(categoryId, {
      ...item,
      status: enabled ? "hidden" : "active",
    });
  }, [item, categoryId, enabled, updateItem]);

  useEffect(() => {
    setEnabled(item.status === "active");
  }, [item.status]);

  return <BasicSwitch name="status" enabled={enabled} onChange={onToggle} />;
};

export default ItemStatusSwitch;
