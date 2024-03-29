import UserContext from "@/store/user-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const useUserStatus = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  if (user && user.defaultParams.life <= 0) {
    router.push("/actions/hospital");
    return null;
  } else {
    if (user && user.prison?.isPrisoner === true) {
      router.push("/actions/prison");
      return null;
    } else if (user && user.district?.missionsStatus === "inprogress") {
      router.push("/actions/districts");
      return null;
    }
  }

  return true;
};

export default useUserStatus;
