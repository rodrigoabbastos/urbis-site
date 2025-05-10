
// src/hooks/use-toast.jsx
import { useToast as useToastInternal } from "@/components/ui/toast.jsx";

export const useToast = useToastInternal;

export const toast = {
  ...useToastInternal().toast,
  success: (props) => useToastInternal().toast({ ...props, variant: "default" }),
  error: (props) => useToastInternal().toast({ ...props, variant: "destructive" }),
};
