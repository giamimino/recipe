export default function NotFound({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams.error;

  return <div>404 Not Found {error && `(Reason: ${error})`}</div>;
}