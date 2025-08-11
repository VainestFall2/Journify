import { useNavigate } from "react-router-dom";
import Logo from "../assets/Journify-Logo-s2.png";
import ProfileInfo from "./Card/ProfileInfo";

interface UserInfoProps {
  created_at: string;
  email: string;
  fullName: string;
  id: string;
  password: string;
  updated_at: string;
}

interface NavBarProps {
  userInfo: UserInfoProps | null;
}

export default function NavBar({ userInfo }: NavBarProps) {
  const navigate = useNavigate();
  const isToken = localStorage.getItem("Journify:token");
  const showProfileInfo = isToken && userInfo;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={Logo} alt="Journify-logo" className="h-16" />

      {showProfileInfo && (
        <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />
      )}
    </div>
  );
}
