import { FOOTER_CONTENT } from '@/constants'
import Image from 'next/image'

const Footer = () => (
  <footer className="row-start-3 flex flex-col gap-2 items-center justify-center">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href={FOOTER_CONTENT.notice.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/icons/github.svg"
        alt="File icon"
        width={16}
        height={16}
      />
      {FOOTER_CONTENT.notice.text}
    </a>
    <p>
      {FOOTER_CONTENT.creator.label} @
      <a
        href={FOOTER_CONTENT.creator.github}
        className="hover:underline hover:underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        {FOOTER_CONTENT.creator.name}
      </a>
    </p>
  </footer>
)

export default Footer
