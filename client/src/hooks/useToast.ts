import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function toast(props: ToastProps) {
  const { title, description, variant, duration, action } = props;

  return sonnerToast(title, {
    description,
    duration,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
    className: variant === "destructive" ? "destructive" : "",
  });
}

export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
}
