import { useRouter } from "next/router";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import SecondContainer from "@/components/SecondContainer";
import { useEffect } from "react";

const ProtectedPage = () => {
  const user = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  if (user === null) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth status
  }

  return (
    <div>
      <SecondContainer />
    </div>
  );
};

export default ProtectedPage;
