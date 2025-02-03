import { TITLE } from './metadata'
import { ExternalLinks } from './links'

const FooterText = {
  NOTICE: `${TITLE.kr}는 오픈소스 프로젝트에요!`,
  CREATED_BY: '만든사람',
} as const

export const FOOTER_CONTENT = {
  notice: {
    text: FooterText.NOTICE,
    link: ExternalLinks.GITHUB_REPO,
  },
  creator: {
    label: FooterText.CREATED_BY,
    name: '정환희',
    github: ExternalLinks.GITHUB_PROFILE,
  },
} as const
