import Link from "next/link";

export function PostLink({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={`/post/${id}`} className={className}>
      {children}
    </Link>
  );
}
