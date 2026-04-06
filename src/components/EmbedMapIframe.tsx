interface EmbedMapIframeProps {
  address: string;
  aspectRatio?: string;
}

const EmbedMapIframe: React.FC<EmbedMapIframeProps> = ({
  address,
  aspectRatio,
  // aspectRatio = "16/9",
}) => {
  const q = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${q}&output=embed`;

  return (
    <div
      className="w-full h-full rounded-md"
      style={aspectRatio ? { aspectRatio, minHeight: 240 } : undefined}

      // style={{ aspectRatio: aspectRatio, minHeight: 240 }}
    >
      <iframe
        title={`Map of ${address}`}
        src={src}
        className="w-full h-full border-0 rounded-md"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default EmbedMapIframe;
