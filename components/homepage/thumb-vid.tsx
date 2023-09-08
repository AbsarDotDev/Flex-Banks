export default function VidThumbnail() {
  return (
    <div className="thumbnail">
      <video autoPlay muted controls className="h-[450px] w-full object-cover">
        <source src="/vidthumb.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
