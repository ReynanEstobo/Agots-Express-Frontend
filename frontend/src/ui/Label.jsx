import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

const Label = React.forwardRef(({ style, children, ...props }, ref) => {
  const defaultStyle = {
    fontSize: "0.875rem",       // text-sm
    fontWeight: 500,            // font-medium
    lineHeight: 1,              // leading-none
    cursor: "pointer",
    opacity: 1,
  };

  // Handle disabled state via props
  if (props.disabled) {
    defaultStyle.cursor = "not-allowed";
    defaultStyle.opacity = 0.7;
  }

  return (
    <LabelPrimitive.Root
      ref={ref}
      style={{ ...defaultStyle, ...style }}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  );
});

Label.displayName = "Label";

export { Label };
