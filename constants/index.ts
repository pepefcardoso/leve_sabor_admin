import routes from "@/routes/routes";
import { FaChartBar, FaCog, FaHome } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

export const HOME_LINKS = [
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
    { key: "profile", label: "Meu Perfil", href: routes.home, icon: FaUser },
  ];

  export const SIDEBAR_LINKS = [
    { title: "Dashboard", href: "/dashboard", icon: FaHome },
    { title: "Usuários", href: "/users", icon: FaUser },
    { title: "Configurações", href: "/settings", icon: FaCog },
    { title: "Relatórios", href: "/reports", icon: FaChartBar },
  ];