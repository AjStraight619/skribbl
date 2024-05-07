import { Button, ButtonProps } from "./button";

type ToolbarButtonProps = ButtonProps & {
  isActive?: boolean;
};

export default function ToolbarButton({
  isActive,
  ...props
}: ToolbarButtonProps) {
  return (
    <Button
      className={`${isActive ? "hover:bg-transparent" : ""}`}
      size="icon"
      onClick={props.onClick}
      disabled={props.disabled}
      variant={isActive ? "outline" : "secondary"}
    >
      {props.children}
    </Button>
  );
}
