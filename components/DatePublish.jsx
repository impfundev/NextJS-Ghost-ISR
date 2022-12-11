import date from "date-and-time";

export default function DatePublish({ publish }) {
  const dateFormat = date.format(new Date(publish), 'DD MMMM YYYY HH:mm');

  return (
    <time
      className="py-4 text-gray-500 text-sm"
      datetime={publish}
    >
      {dateFormat}
    </time>
  );
}
