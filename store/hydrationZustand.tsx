"use client";
import { ReactNode, useEffect, useState } from "react";

interface HydrationZustandProps {
  children: ReactNode;
}

const HydrationZustand = ({ children }: HydrationZustandProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? <>{children}</> : null;
};

export default HydrationZustand;
