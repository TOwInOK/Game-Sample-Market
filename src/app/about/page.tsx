import Social_button from "@/app/ui/social_button";

export default async function Page() {
  return (
    <div className="w-full h-full flex-col justify-center items-start gap-24 flex">
      <div className="text-black text-3xl font-normal font-itim">
        Who we are?
      </div>
      <div className="text-black text-3xl font-normal font-itim">
        We are rust developers who fun for our deal!
      </div>
      <div className="self-stretch justify-between items-center flex">
        <div className="text-black text-3xl font-normal font-itim">
          Our links:
        </div>
        <Social_button />
      </div>
    </div>
  );
}
