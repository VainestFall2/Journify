import Logo from "../assets/Journify-Logo-s2.png";
import ProfileInfo from "./Card/ProfileInfo";

export default function NavBar() {
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <img src={Logo} alt="Journify-logo" className="h-16" />

      <ProfileInfo />
    </div>
  );
}
