"use client";

import { useState } from "react";
import LogoutModal from "../modals/LogoutModal";

function LogoutButton() {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const handleClose = () => {
    setShowLogoutModal(false);
  };

  const handleClick = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      <button className="flex items-center gap-4 p-4" onClick={handleClick}>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 14.402H3.33333C2.97971 14.402 2.64057 14.2616 2.39052 14.0115C2.14048 13.7615 2 13.4223 2 13.0687V3.73537C2 3.38175 2.14048 3.04261 2.39052 2.79256C2.64057 2.54251 2.97971 2.40204 3.33333 2.40204H6"
            stroke="var(--light-black-dark-blue)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.6667 11.7354L14 8.40206L10.6667 5.06873"
            stroke="var(--light-black-dark-blue)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 8.40204H6"
            stroke="var(--light-black-dark-blue)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-sm text-light-black-dark-blue">Logout</span>
      </button>

      <LogoutModal open={showLogoutModal} handleClose={handleClose} />
    </>
  );
}

export default LogoutButton;
