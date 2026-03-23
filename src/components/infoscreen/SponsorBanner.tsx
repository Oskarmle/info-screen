import { fetchAllSponsorsForOrganization } from "@/lib/sponsorActions";
import { cookies } from "next/headers";
import Image from "next/image";

const SponsorBanner = async () => {
  const cookieStore = await cookies();
  const selectedOrganizationId = cookieStore.get(
    "selectedOrganizationId",
  )?.value;

  const sponsors = await fetchAllSponsorsForOrganization(
    selectedOrganizationId ?? "",
  );

  console.log("Sponsors for organization:", sponsors.data);

  return (
    <div className="flex flex-row gap-8 px-4 w-full bg-accent border-t h-32 items-center">
      {sponsors.data?.map((sponsor) => (
        <div key={sponsor.id}>
          <div className="relative h-20 w-48 rounded-lg">
            <Image
              src={sponsor.logo || "/placeholder-logo.png"}
              fill
              className="rounded-lg object-contain"
              alt="Sponsor logo"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SponsorBanner;
