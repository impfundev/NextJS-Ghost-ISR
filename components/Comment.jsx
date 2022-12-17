import { FacebookProvider, Comments } from "react-facebook";

export default function Comment({ url }) {
  return (
    <>
      <FacebookProvider appId="5628930273871755">
        <Comments href={url} />
      </FacebookProvider>
    </>
  );
}
