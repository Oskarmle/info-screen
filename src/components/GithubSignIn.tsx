import { Github } from "lucide-react";
import { Button } from "./ui/button";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
      }}
    >
      <Button className="w-full" variant="outline">
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };
