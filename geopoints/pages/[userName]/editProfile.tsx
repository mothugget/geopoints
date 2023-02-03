import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useUserData } from "../../hooks/useUserData";
import React from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

function editProfile() {
  const { user } = useUser();

  const { isError, isLoading, data, error, refetch } = useUserData(user!);

  return <div>
    
  </div>;
}

export default editProfile;
