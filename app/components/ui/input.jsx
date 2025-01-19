import React from "react";
import clsx from "clsx"; // Ensure you have installed clsx with `npm install clsx`

const Input = React.forwardRef((props, ref) => {
  const { className, type, ...otherProps } = props;

  return (
    <input
      type={type}
      className={clsx(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white",
        className
      )}
      ref={ref}
      {...otherProps}
    />
  );
});

Input.displayName = "Input";

export { Input };
