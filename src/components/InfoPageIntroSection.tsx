import ProfilePageBanner from "./Images/ProfilePageBanner/ProfilePageBanner";

interface InfoPageIntroSectionProps {
  mainHeader: string;
  mainDesc: string;
  secondHeader: string;
  secondDesc: string;
}

const InfoPageIntroSection: React.FC<InfoPageIntroSectionProps> = ({
  mainHeader,
  mainDesc,
  secondHeader,
  secondDesc,
}) => {
  return (
    <>
      {" "}
      <section className="flex flex-col items-center justify-center gap-2">
        <label className="text-2xl font-semibold">{mainHeader}</label>
        <p>{mainDesc}</p>
      </section>
      <section className="grid gap-x-2 gap-y-4 my-10 min-[700px]:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-2 order-2 min-[700px]::order-1">
          <label className="text-2xl font-semibold">{secondHeader}</label>
          <p>{secondDesc}</p>
        </div>
        <div className="flex items-center justify-center order-1 min-[700px]:order-2">
          <ProfilePageBanner className="w-[360px] h-[128px]" />
        </div>
      </section>
    </>
  );
};

export default InfoPageIntroSection;
