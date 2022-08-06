import Title from "./Title";
import ConnectButton from "./ConnectButton";
export default function Header() {
  return (
    <div style={{ height: "100px" }}>
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          left: "12%",
        }}
      >
        <img
          src="https://assets.fontsinuse.com/static/use-media-items/156/155346/full-2500x2500/61e34629/Dawn-FM-logo-square-black.jpeg"
          alt="dawn-fm"
          width="100px"
        />
      </div>
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          left: "84%",
          top: "15%",
        }}
      >
        <ConnectButton />
      </div>
      <Title />
    </div>
  );
}
