import date from "date-and-time";

export default function DateUpdate({ update }) {
  const dateFormat = date.format(new Date(update), 'DD MMMM YYYY HH:mm');

  return (
    <time
      className="py-4 text-gray-500 text-sm"
      datetime={update}
    >
      {dateFormat}
    </time>
  );
}
