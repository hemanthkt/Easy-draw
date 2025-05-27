"use client";
export function AuthPage({ isSignin }: { isSignin: boolean }) {
  return (
    <div className="flex flex-col justify-center w-screen h-screen items-center p-1">
      <div className="p-1">
        <input className="bg-white rounded" placeholder="Email" type="email" />
      </div>
      <div className="rounded">
        <input
          className="bg-white rounded "
          placeholder="Password"
          type="password"
        />
      </div>
      <div className="p-4">
        <button className="bg-red-300 rounded w-16" onClick={() => {}}>
          {isSignin ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
