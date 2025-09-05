export default function NavigationLink({
  children,
  url,
  addClass,
}: {
  children: React.ReactNode;
  url: string;
  addClass?: string;
}) {
  return (
    <li>
      <a href={url} className={`block py-2 px-3 rounded ${addClass}`}>
        {children}
      </a>
    </li>
  );
}
