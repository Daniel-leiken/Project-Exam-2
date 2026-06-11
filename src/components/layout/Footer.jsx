import { Link } from 'react-router-dom';
import { Globe, Mail } from 'lucide-react';

const links = [
  { label: 'Website', href: 'https://holidaze.com', icon: Globe },
  { label: 'Email us', href: 'mailto:hello@holidaze.com', icon: Mail },
];

/** Site footer: brand, a couple of contact links, and a copyright line. */
function Footer() {
  return (
    <footer className="border-t border-neutral-300 bg-white">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-20">
        <div>
          <Link to="/" className="font-display text-xl font-semibold text-primary-900">
            Holidaze
          </Link>
          <p className="mt-1 text-sm text-neutral-500">Unique places to stay, worldwide.</p>
        </div>

        <ul className="flex items-center gap-4">
          {links.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm px-1 py-1 text-sm text-neutral-500 hover:text-primary-900"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-neutral-300 py-4 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Holidaze. Built for Noroff Project Exam 2.
      </div>
    </footer>
  );
}

export { Footer };
