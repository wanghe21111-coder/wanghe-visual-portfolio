import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-grid flex min-h-screen flex-col justify-center py-24">
      <p className="mb-5 text-xs uppercase tracking-studio text-paper/40">404</p>
      <h1 className="max-w-3xl text-5xl uppercase leading-none text-paper md:text-7xl">
        This page is not in the archive yet.
      </h1>
      <Link className="mt-8 text-xs uppercase tracking-studio text-paper/60 hover:text-paper" href="/">
        Back to home
      </Link>
    </main>
  );
}
