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
      size="icon"
      onClick={props.onClick}
      disabled={props.disabled}
      variant={isActive ? "default" : "secondary"}
    >
      {props.children}
    </Button>
  );
}
