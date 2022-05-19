interface Props {
  image?: string;
  text?: string;
  subtext?: string;
}

export default function Card({ image, text, subtext }: Props) {
  return (
    <div
      className="group p-4 aspect-card w-full h-full overflow-hidden rounded-3xl hover:cursor-pointer
                 flex flex-col transition hover:ring-2 hover:ring-outline
               bg-secondaryContainer text-onSecondaryContainer"
    >
      <div className="h-full overflow-hidden rounded-2xl">
        {image && (
          <img
            src={image}
            alt="card image"
            className="w-full h-full object-cover group-hover:scale-110
                       transition duration-500 ease-in-out"
          />
        )}
      </div>

      <div className="space-y-2 py-3">
        {text && <div className="px-1 text-xl overflow-hidden">{text}</div>}
        {subtext && (
          <div className="px-1 text-lg overflow-hidden">{subtext}</div>
        )}
      </div>
    </div>
  );
}