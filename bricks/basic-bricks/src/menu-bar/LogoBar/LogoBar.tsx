import React, { useEffect } from "react";
import { Link } from "@next-libs/basic-components";
import styles from "./LogoBar.module.css";
import { ReactComponent as Logo } from "../../images/logo-3.1.svg";
import { getRuntime } from "@next-core/brick-kit";

export function LogoBar(): React.ReactElement {
  const brand = getRuntime().getBrandSettings();
  useEffect(() => {
    if (brand.favicon_url) {
      const linkDom = document.querySelector('link[rel="shortcut icon"]');
      linkDom.href = brand.favicon_url;
    }
  }, [brand.favicon_url]);
  return (
    <div className={styles.logoBar}>
      <Link to="/" className={styles.logoLink}>
        {brand.menu_bar_logo_url ? (
          <img
            src={brand.menu_bar_logo_url}
            style={{ height: 32, verticalAlign: "top" }}
          />
        ) : (
          <Logo height={32} style={{ verticalAlign: "top" }} />
        )}
      </Link>
    </div>
  );
}
