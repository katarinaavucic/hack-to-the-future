import React from "react";
import clsx from "clsx"; // Ensure clsx is installed: npm install clsx

const Button = React.forwardRef((props, ref) => {
  const { children, className, type = "button", disabled = false, ...otherProps } = props;

  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "bg-primary text-white hover:bg-primary-dark",
        className
      )}
      disabled={disabled}
      ref={ref}
      {...otherProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
