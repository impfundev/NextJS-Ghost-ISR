import date from "date-and-time";

export default function Date({ update, publish }) {
  const dateFormat = date.format(new Date(`${update ? update : publish}`), 'DD MMMM YYYY HH:mm');

  return (
    <time
      className="py-4 text-gray-500 text-sm"
      datetime={update ? update : publish}
    >
      {dateFormat}
    </time>
  );
}
