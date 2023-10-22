import Button from "@/components/ui/button/Button";
import { hasCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CookiesConsent.module.scss";

const CookiesConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState<boolean>(false);

  useEffect(() => {
    setShowConsent(hasCookie("cookies_consent"));
  }, []);

  const acceptCookies = () => {
    setShowConsent(true);
    setCookie("cookies_consent", "true", {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });
  };

  if (showConsent) return null;

  return (
    <div className={styles.container}>
      This website uses cookies to ensure you get the best experience on our
      website. By using our website, you consent to our use of cookies. For more
      information, please see our{" "}
      <Link href="/privacy-policy">Privacy Policy</Link>.
      <Button onClick={acceptCookies} disabled={showConsent}>
        Accept
      </Button>
    </div>
  );
};

export default CookiesConsent;
