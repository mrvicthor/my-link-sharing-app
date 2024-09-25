import LinkIcon from "@/assets/images/icon-links-header.svg";
import DevLinkLogo from "@/assets/images/logo-devlinks-large.svg";
import ProfileIcon from "@/assets/images/icon-profile-details-header.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-6 my-6 h-[4.875rem] container">
      <nav className="bg-[#ffffff] w-full  flex h-full rounded-md items-center justify-between pl-6 pr-4">
        <NavLink to="/" className="">
          <img src={DevLinkLogo} alt="devlinks logo" />
        </NavLink>

        <ul className="flex items-center gap-4">
          <li>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#EFEBFF] px-4 py-2 text-[#633CFF] flex rounded-md"
                  : "text-[#737373] flex"
              }
            >
              <img src={LinkIcon} alt="link icon" />{" "}
              <span className="pl-3">Links</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#EFEBFF] px-4 py-2 text-[#633CFF] flex rounded-md"
                  : "text-[#737373] flex"
              }
            >
              <img src={ProfileIcon} alt="profile icon" />{" "}
              <span className="pl-3 capitalize">profile details</span>
            </NavLink>
          </li>
        </ul>
        <div>
          <NavLink
            to={"/preview"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#EFEBFF] text-[#633CFF]"
                : "text-[#633CFF] border border-[#633CFF] px-4 py-2 text-sm rounded-md"
            }
          >
            Preview
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
