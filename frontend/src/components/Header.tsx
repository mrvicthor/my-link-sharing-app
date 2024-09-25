import DevLinkLogo from "@/assets/images/logo-devlinks-large.svg";
import { NavLink, useNavigate } from "react-router-dom";
import LinkIcon from "@/components/LinkIcon";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/api";
import queryClient from "@/config/queryClient";

const Header = () => {
  const navigate = useNavigate();
  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });
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
                  : "text-[#737373] flex hover:text-[#633CFF] hover:bg-[#EFEBFF] px-4 py-2 rounded-md"
              }
            >
              <LinkIcon
                color="#633CFF hover:text-[#633CFF]"
                pathString="M11.154 14.65a.936.936 0 0 1 0 1.329l-.464.464a4.689 4.689 0 1 1-6.631-6.631l1.884-1.884a4.687 4.687 0 0 1 6.432-.194.941.941 0 0 1-1.25 1.407 2.813 2.813 0 0 0-3.857.114l-1.883 1.882a2.813 2.813 0 1 0 3.978 3.978l.464-.464a.936.936 0 0 1 1.327 0ZM16.94 3.558a4.695 4.695 0 0 0-6.63 0l-.465.464a.94.94 0 1 0 1.328 1.328l.464-.464a2.813 2.813 0 0 1 3.978 3.978l-1.883 1.885a2.813 2.813 0 0 1-3.858.111.942.942 0 0 0-1.25 1.407 4.688 4.688 0 0 0 6.43-.19l1.884-1.884a4.695 4.695 0 0 0 .002-6.633v-.002Z"
              />
              <span className="pl-3">Links</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#EFEBFF] px-4 py-2 text-[#633CFF] flex rounded-md"
                  : "text-[#737373] flex hover:text-[#633CFF] hover:bg-[#EFEBFF] px-4 py-2 rounded-md"
              }
            >
              <LinkIcon
                color="#633CFF hover:text-[#633CFF]"
                pathString="M10.5 1.563A8.437 8.437 0 1 0 18.938 10 8.447 8.447 0 0 0 10.5 1.562ZM6.716 15.357a4.688 4.688 0 0 1 7.568 0 6.54 6.54 0 0 1-7.568 0Zm1.596-5.982a2.188 2.188 0 1 1 4.376 0 2.188 2.188 0 0 1-4.376 0Zm7.344 4.683a6.523 6.523 0 0 0-2.265-1.83 4.062 4.062 0 1 0-5.782 0 6.522 6.522 0 0 0-2.265 1.83 6.562 6.562 0 1 1 10.304 0h.008Z"
              />
              <span className="pl-3 capitalize">profile details</span>
            </NavLink>
          </li>
        </ul>
        <div>
          <NavLink
            to={"/preview"}
            className={({ isActive }) =>
              isActive
                ? "bg-[#EFEBFF] text-[#633CFF] flex rounded-md px-4 py-2"
                : "text-[#633CFF] border border-[#633CFF] px-4 py-2 text-sm rounded-md hover:text-[#633CFF] hover:bg-[#EFEBFF]"
            }
          >
            Preview
          </NavLink>
          <Button onClick={() => signOut()} variant={"link"}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;