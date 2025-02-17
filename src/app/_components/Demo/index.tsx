'use client'

import Chat from './Chat'
import HoveredChat from './HoveredChat'

const Demo = () => {
  return (
    <div className="h-full w-full max-w-[400px] overflow-hidden overflow-y-scroll pt-10 scrollbar-hide">
      <HoveredChat>
        <Chat sender="빌리" time="1:17 PM" message="반가와요~">
          <Chat.Reaction emoji="👋" count={25} />
          <Chat.Reaction
            emoji={<Chat.EmojiImage src="/emojis/hello.gif" />}
            count={42}
          />
        </Chat>
      </HoveredChat>

      <Chat
        sender="빌리"
        time="1:20 PM"
        message={
          <>
            <h1 className="mb-2 text-lg font-bold">우아모지 사용법</h1>
            <ol className="list-inside list-decimal text-sm">
              <li className="mb-2">나만의 우아모지를 예쁘게 꾸민다 ✨</li>
              <li className="mb-2">완성된 우아모지를 저장한다 💾</li>
              <li>우테코 슬랙에 등록하고, 멋진 우아모지를 자랑한다! 🚀</li>
            </ol>
          </>
        }
        className="breakpoint:flex hidden"
      >
        <Chat.Reaction
          emoji={<Chat.EmojiImage src="/emojis/wow.gif" />}
          count={23}
        />
        <Chat.Reaction
          emoji={<Chat.EmojiImage src="/emojis/download.gif" />}
          count={17}
        />
        <Chat.Reaction emoji="🚀" count={12} />
        <Chat.Reaction emoji="✅" count={10} />
        <Chat.Reaction
          emoji={<Chat.EmojiImage src="/emojis/use.gif" />}
          count={32}
        />
      </Chat>

      <Chat
        sender="빌리"
        time="6:30 PM"
        message="PR 올렸습니당 리뷰 부탁드려요~"
        className="breakpoint:flex hidden"
      >
        <Chat.Reaction
          emoji={<Chat.EmojiImage src="/emojis/okay.gif" />}
          count={1}
        />
        <Chat.Reaction emoji="👍" count={3} />
        <Chat.Reaction
          emoji={<Chat.EmojiImage src="/emojis/reviewed.gif" />}
          count={1}
        />
      </Chat>
    </div>
  )
}

export default Demo
