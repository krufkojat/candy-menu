import React from "react";
import { Switch } from "@headlessui/react";

interface BasicSwitchProps {
  name: string;
  enabled: boolean;
  onChange: () => void;
}

const BasicSwitch: React.FC<BasicSwitchProps> = ({
  name,
  enabled,
  onChange,
}) => (
  <Switch
    name={name}
    checked={enabled}
    onChange={onChange}
    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary-600"
  >
    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
  </Switch>
);

export default BasicSwitch;
