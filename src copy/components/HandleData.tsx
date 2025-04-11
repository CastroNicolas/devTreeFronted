import { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
  data: UserHandle;
};

export const HandleData = ({ data }: HandleDataProps) => {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (item: SocialNetwork) => item.enabled
  );
  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl font-black text-center">{data.handle}</p>
      {data.image && (
        <img
          src={data.image}
          alt={data.name}
          className="max-w-[250px] mx-auto"
        />
      )}
      <p className="text-lg font-bold text-center">{data.description}</p>
      <div className="mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link: SocialNetwork) => (
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              key={link.name}
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`/social/icon_${link.name}.svg`}
                  alt={link.name}
                  className="w-12"
                />
                <p className="text-black capitalize font-bold text-lg">
                  Visit me at: {link.name}
                </p>
              </div>
            </a>
          ))
        ) : (
          <p className="text-center">There aren't links</p>
        )}
      </div>
    </div>
  );
};
