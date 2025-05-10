
// src/hooks/use-toast.js
import { useToast as useToastInternal } from "@/components/ui/toast";

export const useToast = useToastInternal;

export const toast = {
  ...useToastInternal().toast,
  success: (props) => useToastInternal().toast({ ...props, variant: "default" }),
  error: (props) => useToastInternal().toast({ ...props, variant: "destructive" }),
};
