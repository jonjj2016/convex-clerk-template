import { useRouter } from "next/navigation";
import { useState } from "react";

import { useSignUp as useClerkSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { RegisterSchema } from "../../schemas";

export const useSignUp = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    reset,
    formState: { errors },
    handleSubmit,
  } = form;
  const router = useRouter();
  const [success, setSuccess] = useState<string | undefined>("");
  const { isLoaded, signUp, setActive } = useClerkSignUp();

  const { mutate: initiateRegistrationFlow } = useMutation({
    mutationFn: async ({
      email,
      password,
      confirmPassword,
      name,
    }: z.infer<typeof RegisterSchema>) => {
      if (!isLoaded) return;

      const rew = await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      const res = "";
      // const res = await register({ email, name, password, confirmPassword });

      return res;
    },
    onSuccess: (data) => {
      setSuccess(data);
      toast("Success", { description: "Welcome Onboard!" });
      reset();
      setIsPending(false);
      router.push("/verify");
    },
    onError: (error: any) => {
      setIsPending(false);
      toast("Error", { description: error.message || "Something went wrong" });
    },
  });

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    initiateRegistrationFlow({
      email: values.email,
      password: values.password,
      name: values.name,
      confirmPassword: values.confirmPassword,
    });
  });

  return {
    onInitiateUserRegistration,
    isPending,
    success,
    errors,
    form,
  };
};
