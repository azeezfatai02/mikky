// components/withAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../app/firebase";
import { onAuthStateChanged } from "firebase/auth";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthenticated(true);
          setLoading(false);
        } else {
          router.push("/login");
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
