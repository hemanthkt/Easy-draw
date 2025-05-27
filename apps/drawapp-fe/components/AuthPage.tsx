"use client";

import { Button } from "@repo/ui/button";
import Input from "@repo/ui/Input";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="flex flex-col  justify-center w-screen h-screen items-center p-1">
      <Input placeholder="email" /> <Input placeholder="password" />{" "}
      <div className="p-4">
        <Button
          onClick={() => {}}
          variant={"primary"}
          classname=""
          size="lg"
          children={isSignin ? "Sign In" : "Sign Up"}
        />
      </div>
    </div>
  );
}
