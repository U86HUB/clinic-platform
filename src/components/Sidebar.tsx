import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="w-48 bg-gray-100 h-screen p-4">
      <ul>
        <li className="mb-2">
          <Link href="/dashboard">Dashboard Home</Link>
        </li>
        <li className="mb-2">
          <Link href="/dashboard/content-blocks">Content Blocks</Link>
        </li>
        <li className="mb-2">
          <Link href="/dashboard/settings">Settings</Link>
        </li>
        <li className="mb-2">
          <Link href="/dashboard/blog">Blog</Link>
        </li>
        <li className="mt-4">
          <Link href="/auth">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}
