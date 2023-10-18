import { BsGithub } from "react-icons/bs";
interface FooterProps {
  name: string;
  repo: string;
}

export default function Footer({ name, repo }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center text-center">
      <div className="w-full flex justify-between items-center bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
        <a href="https://somtodev.brimble.app" className="text-primary">
          {name}
        </a>
        <div className="flex items-center justify-between gap-x-2">
          <div className="border-r-[1px] border-primary border-opacity-30 px-2">
            <a
              className="text-secondary"
              rel="no-referrer"
              target="_blank"
              href={repo}
            >
              <BsGithub size={20} />
            </a>
          </div>
          <span className="text-primary opacity-30">&copy;&nbsp;{year}</span>
        </div>
      </div>
    </footer>
  );
}
