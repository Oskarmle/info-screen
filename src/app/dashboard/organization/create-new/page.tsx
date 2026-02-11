import { createOrganization } from "@/lib/actions";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { redirect } from "next/navigation";

const Page = () => {
  return (
    <div>
      <form
        className="space-y-4"
        action={async (formData: FormData) => {
          "use server";
          const res = await createOrganization(formData);
          if (res.success) {
            redirect("/dashboard");
          }
        }}
      >
        <Input
          name="name"
          placeholder="Organization Name"
          type="text"
          required
          autoComplete="organization"
        />
        <Input
          name="street"
          placeholder="Street"
          type="text"
          required
          autoComplete="street-address"
        />
        <Input
          name="postalCode"
          placeholder="Postal Code"
          type="number"
          required
          autoComplete="postal-code"
        />
        <Input
          name="city"
          placeholder="City"
          type="text"
          required
          autoComplete="address-level2"
        />
        <Input
          name="cvrNumber"
          placeholder="CVR Number"
          type="text"
          autoComplete="organization"
        />
        <Input
          name="logo"
          placeholder="Logo URL"
          type="text"
          autoComplete="logo"
        />
        <Button className="w-full" type="submit">
          Create Organization
        </Button>
      </form>
    </div>
  );
};

export default Page;
