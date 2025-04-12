declare module "react-katex" {
  import React from "react";

  interface KatexProps {
    /** The math to be rendered */
    math: string;
    /** Whether to render in display mode (centered, larger symbols) or inline mode */
    block?: boolean;
    /** Error callback if the math cannot be rendered */
    errorColor?: string;
    /** KaTeX rendering options */
    settings?: Record<string, unknown>;
    /** Additional CSS class name */
    className?: string;
  }

  export const InlineMath: React.FC<KatexProps>;
  export const BlockMath: React.FC<KatexProps>;
}
