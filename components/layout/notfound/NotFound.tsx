import { ArrowLeftIcon, ArrowRightIcon, Icon } from "@/components/ui/icons";
import otherImages from "@/constants/images/other";
import Image from "next/image";
import Link from "next/link";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerWrapper}>
        <Image
          src={otherImages.notfound}
          alt="Not Found"
          width={680}
          height={360}
          className="sectionImage"
          priority={true}
        />
        <h1 className={styles.heading}>404 - Page Not Found</h1>
        <p>
          Sorry, but it looks like you took a wrong turn in this dark alley. The
          mafia&apos;s secrets are well-hidden, just like this page.
        </p>
        <p>
          It seems you&apos;re not part of our exclusive club yet. The
          underworld of syndicates and gangs isn&apos;t for the faint-hearted,
          but don&apos;t worry, we&apos;re here to guide you back to safety.
        </p>
        <h2 className={styles.headingMove}>What&apos;s Your Next Move?</h2>
        <ul className={styles.movesList}>
          <li className={styles.movesListItem}>
            <Icon
              component={ArrowRightIcon}
              width={24}
              height={24}
              viewBox="24 24"
            />
            <p>
              Return to the shadows by clicking{" "}
              <Link href="/game" className={styles.link}>
                here
              </Link>{" "}
              and explore our secrets from the shadows.
            </p>
          </li>
          <li className={styles.movesListItem}>
            <Icon
              component={ArrowRightIcon}
              width={24}
              height={24}
              viewBox="24 24"
            />
            <p>
              Or, if you&apos;re feeling brave, report this issue to our IT
              specialist. They might grant you access to the mafia&apos;s
              deepest secrets.
            </p>
          </li>
        </ul>
        <p>
          Remember, in our world, it&apos;s either loyalty or betrayal, and
          there&apos;s no room for errors.
        </p>
        <Link href="/game" className={styles.linkBack}>
          <Icon
            component={ArrowLeftIcon}
            width={24}
            height={24}
            viewBox="24 24"
          />
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
