import Link from "next/link";
import { GithubSignIn } from "@/src/components/GithubSignIn";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { signUp } from "@/lib/actions";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { GoogleSignIn } from "@/src/components/GoogleSignIn";

const Page = async () => {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="w-full border p-4 rounded-lg max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

      <GithubSignIn />
      <GoogleSignIn />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <form
        className="space-y-4"
        action={async (formData: FormData) => {
          "use server";
          const res = await signUp(formData);
          if (res.success) {
            redirect("/sign-in");
          }
        }}
      >
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          autoComplete="email"
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          autoComplete="new-password"
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>

      <div className="text-center">
        <Button asChild variant="link">
          <Link href="/sign-in">Already have an account? Sign in</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
