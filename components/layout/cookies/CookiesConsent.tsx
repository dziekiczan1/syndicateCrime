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
      <div className={styles.innerContainer}>
        <h3 className={styles.cookieHeading}>Cookie Policy</h3>
        <p className={styles.cookieConsent}>
          This website uses cookies to ensure you get the best experience on our
          website. For more information, please see our{" "}
          <span className={styles.privacyLink}>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </span>
          .
        </p>
        <div className={styles.buttonContainer}>
          <Button onClick={acceptCookies} disabled={showConsent} secondary>
            Accept Cookies
          </Button>
          {/* <Button>
            Settings
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default CookiesConsent;
