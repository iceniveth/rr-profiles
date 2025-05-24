export default function ErrorMessage({
  message,
}: {
  message: string[] | string | null | undefined;
}) {
  if (message == null) return null;

  if (Array.isArray(message)) {
    return message.map((msg) => (
      <p key={msg} className="text-xs text-red-500">
        {msg}
      </p>
    ));
  }

  return <p className="text-red-500">{message}</p>;
}
