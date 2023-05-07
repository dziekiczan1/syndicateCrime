import { signOut, useSession } from "next-auth/react";

import Button from "@/components/ui/button/Button";
import styles from "./Uikit.module.scss";

interface Props {
  user?: {
    [key: string]: any;
  };
}

const UiKit: React.FC<Props> = ({ user }) => {
  const { data: session, status } = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <div className={styles.container}>
      {!session && status !== "loading" && (
        <div>
          <h1>Zaloguj się</h1>
          <Button link="/">Login</Button>
        </div>
      )}
      {session && (
        <div>
          <h1>Jesteś zalogowany jako {user?.username}</h1>
          <Button onClick={logoutHandler}>Logout</Button>
        </div>
      )}
      <div className={styles.colors}>
        <h1 className={styles.heading}>Color Variables</h1>
        <p>$color-base-light: #f5f5f5</p>
        <p>$color-base-dark: #333333</p>
        <p>$color-base-dark-100: #404040</p>
        <p>$color-base-dark-500: #666666</p>
        <p>$color-base-red: #990000</p>
        <p>$color-base-gold: #ffd700</p>
        <p>$color-base-orange: #ffa500</p>
      </div>
      <div className={styles.typography}>
        <h1 className={styles.heading}>Typography</h1>
        <p>$font-weight-normal</p>
        <p>$font-weight-bold</p>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <p>Paragraph</p>
      </div>
      <div className={styles.spacing}>
        <h1 className={styles.heading}>Spacing</h1>
        <p>$base-size: 0.4rem // 4px</p>
        <p>$size-1: 1px</p>
        <p>$size-2: 2px</p>
        <p>$size-4: 4px</p>
        <p>$size-8: 8px</p>
        <p>$size-12: 12px</p>
        <p>$size-14: 14px</p>
        <p>$size-16: 16px</p>
        <p>$size-20: 20px</p>
        <p>$size-24: 24px</p>
        <p>$size-32: 32px</p>
        <p>$size-48: 48px</p>
        <p>$size-64: 64px</p>
      </div>
      <div className={styles.mixins}>
        <h1 className={styles.heading}>Mixins</h1>
        <p>
          Font size mixin <span>@include font-size($size-12)</span>
        </p>
        <p>
          Media queries mixin <span>@include screen(mobile)</span> /{" "}
          <span>@include screen(tablet)</span> /{" "}
          <span>@include screen(desktop)</span>
        </p>
        <p>
          Flexbox mixin
          <span>
            @include flexbox($justify-content: space-between, $align-items:
            flex-start);
          </span>
        </p>
      </div>
      <div>
        <h1 className={styles.heading}>Forms and Inputs</h1>
        <label htmlFor="input-one">Input</label>
        <input
          type="text"
          placeholder="Placeholder"
          name="input"
          id="input-one"
        />
        <label htmlFor="select-one">Select</label>
        <select name="select" id="select-one">
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
      </div>
    </div>
  );
};

export default UiKit;
