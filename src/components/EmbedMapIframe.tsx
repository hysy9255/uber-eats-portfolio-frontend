export default function EmbedMapIframe({
  //   address = "1600 Amphitheatre Parkway, Mountain View, CA",
  address = "G/F, 23 Jervois Street, Sheung Wan, Hong Kong China",
}) {
  const q = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${q}&output=embed`;

  return (
    <div
      className="w-full border border-gray-300 rounded-md p-3"
      style={{ aspectRatio: "16/9", minHeight: 240 }}
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
}
