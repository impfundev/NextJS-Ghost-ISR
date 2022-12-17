import parse from "html-react-parser";

export default function Content({ content }) {
  return (
    <div>
     {parse(content)}
    </div>
  );
}
