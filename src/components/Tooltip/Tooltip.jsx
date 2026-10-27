import { Tooltip as BsTooltip } from "bootstrap";
import React, { useEffect, useRef } from "react";
import styles from "./Tooltip.module.css";

export const Tooltip = (p) => {
  const childRef = useRef(undefined);

  useEffect(() => {
    const t = new BsTooltip(childRef.current, {
      title: p.text,
      placement: p.placement,
      trigger: "hover",
    });
    return () => t.dispose();
  }, [p.text]);

  return React.cloneElement(p.children, {
    ref: childRef,
    className: [p.children.props.className, styles.root]
      .filter(Boolean)
      .join(" "),
  });
};
