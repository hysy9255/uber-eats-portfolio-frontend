interface SideBarInfoTextProps {
  className?: string;
}

const SideBarInfoText: React.FC<SideBarInfoTextProps> = ({ className }) => {
  return (
    <article className={className}>
      <p>
        © 2026 Google LLC, Sundar Pichai, 1600 Amphitheatre Parkway, Mountain
        View CA 94043, USA, 0807-882-594 (free),
        yt-support-solutions-kr@google.com, Hosted by Google LLC, Business
        Information, Report illegally filmed content
      </p>
      <p>
        Products shown, tagged or featured on YouTube by creators are sold by
        merchants and are subject to merchant's terms and conditions. YouTube
        does not sell these products and is not responsible for them.
      </p>
    </article>
  );
};

export default SideBarInfoText;
