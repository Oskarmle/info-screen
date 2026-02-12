import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
};

type ActionResult<T> = 
  | { success: true; message: string; data: T }
  | { success: false; message: string; data?: undefined };

const executeAction = async <T>({
  actionFn,
  successMessage = "The actions was successful",
}: Options<T>): Promise<ActionResult<T>> => {
  try {
    const data = await actionFn();

    return {
      success: true,
      message: successMessage,
      data,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "An error has occurred during executing the action",
    };
  }
};

export { executeAction };
