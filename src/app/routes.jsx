import { Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import Welcome from "../pages/Welcome";
import BootA from "../pages/BootA";
import BootB from "../pages/BootB";
import Verify from "../pages/Verify";
import Open from "../pages/Open";
import Chat from "../pages/Chat";
import Chats from "../pages/Chats";
import Settings from "../pages/Settings";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Recent from "../pages/Recent";

export const routes = [
  {
    path: "/",
    element: (
      <>
        <SignedOut>
          <Welcome />
        </SignedOut>

        <SignedIn>
          <Navigate to="/app/open" replace />
        </SignedIn>
      </>
    ),
  },

  { path: "/boot/a", element: <BootA /> },
  { path: "/boot/b", element: <BootB /> },
  { path: "/verify", element: <Verify /> },

  {
    path: "/app/open",
    element: (
      <>
        <SignedOut>
          <Navigate to="/" replace />
        </SignedOut>

        <SignedIn>
          <Open />
        </SignedIn>
      </>
    ),
  },

  {
    path: "/app",
    element: (
      <>
        <SignedOut>
          <Navigate to="/" replace />
        </SignedOut>

        <SignedIn>
          <Chat />
        </SignedIn>
      </>
    ),
  },

  {
    path: "/app/chats",
    element: (
      <>
        <SignedOut>
          <Navigate to="/" replace />
        </SignedOut>

        <SignedIn>
          <Chats />
        </SignedIn>
      </>
    ),
  },

  {
    path: "/app/recent",
    element: (
      <>
        <SignedOut>
          <Navigate to="/" replace />
        </SignedOut>

        <SignedIn>
          <Recent />
        </SignedIn>
      </>
    ),
  },

  {
    path: "/app/settings",
    element: (
      <>
        <SignedOut>
          <Navigate to="/" replace />
        </SignedOut>

        <SignedIn>
          <Settings />
        </SignedIn>
      </>
    ),
  },

  
  { path: "/app/privacy", element: <Privacy /> },
  { path: "/app/terms", element: <Terms /> },

  { path: "*", element: <Navigate to="/" replace /> },
];