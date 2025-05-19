
import React from 'react';
import { useToast } from "@/hooks/use-toast";

// Singleton pattern to allow access to toast from anywhere
let toastFunction: any = null;

export const registerToast = (toast: any) => {
  toastFunction = toast;
};

export const toast = {
  success: (title: string, description?: string) => {
    if (toastFunction) {
      toastFunction({
        title,
        description,
        variant: "default",
      });
    }
  },
  error: (title: string, description?: string) => {
    if (toastFunction) {
      toastFunction({
        title,
        description,
        variant: "destructive",
      });
    }
  },
  info: (title: string, description?: string) => {
    if (toastFunction) {
      toastFunction({
        title,
        description,
      });
    }
  },
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast: hookToast } = useToast();
  
  // Register the toast function from the hook
  registerToast(hookToast);
  
  return <>{children}</>;
};
