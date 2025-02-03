const STEP = [
  '나만의 우아모지를 예쁘게 꾸민다 ✨',
  '완성된 우아모지를 저장한다 💾',
  '우테코 슬랙에 등록하고, 멋진 우아모지를 자랑한다! 🚀',
]

const Manual = () => (
  <ol className="list-inside list-decimal text-sm">
    {STEP.map((step, index) => (
      <li key={index} className="mb-2">
        {step}
      </li>
    ))}
  </ol>
)

export default Manual
