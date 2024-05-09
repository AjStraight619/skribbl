import { useAuth } from "@clerk/nextjs";
import { TooltipProps } from "@radix-ui/react-tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type MyToolTipProps = TooltipProps & {
  content: string;
};

export default function MyToolTip({ content, ...props }: MyToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip {...props}>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
