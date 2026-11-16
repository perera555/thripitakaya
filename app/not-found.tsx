import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card3d mx-auto mt-10 max-w-md p-8 text-center">
      <p className="text-5xl">🪷</p>
      <h1 className="mt-3 text-2xl font-bold">404</h1>
      <p className="mt-2 text-muted">පිටුව හමු නොවීය · Page not found</p>
      <Link href="/" className="btn btn-gold mt-6">
        මුල් පිටුව · Home
      </Link>
    </div>
  );
}
