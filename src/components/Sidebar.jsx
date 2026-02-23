import { NavLink, useNavigate } from "react-router-dom";
import {
  SquarePen,
  MessageCircle,
  History,
  Settings as SettingsIcon,
} from "lucide-react";

const iconStyle = ({ isActive }) => ({
  width: 44,
  height: 44,
  borderRadius: 14,
  display: "grid",
  placeItems: "center",
  color: isActive ? "var(--brand)" : "rgba(255,255,255,.55)",
  background: isActive ? "rgba(3,165,216,.12)" : "transparent",
  transition: "all 0.2s ease",
});

export default function Sidebar() {
  const nav = useNavigate();

  return (
    <aside
      style={{
        width: 72,
        borderRight: "1px solid var(--line)",
        padding: "18px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 18,
      }}
    >
   
   

  
      <NavLink to="/app/open" style={iconStyle}>
        <SquarePen size={20} strokeWidth={1.8} />
      </NavLink>


      <NavLink to="/app/chats" style={iconStyle}>
        <MessageCircle size={20} strokeWidth={1.8} />
      </NavLink>

  
      <NavLink to="/app/recent" style={iconStyle}>
        <History size={20} strokeWidth={1.8} />
      </NavLink>

      <div style={{ flex: 1 }} />

     
      <NavLink to="/app/settings" style={iconStyle}>
        <SettingsIcon size={20} strokeWidth={1.8} />
      </NavLink>
    </aside>
  );
}
