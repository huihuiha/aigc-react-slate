import { AISlate, a, useEditor } from "../src";

function App() {
  const { value, setValue } = useEditor();
  return (
    <>
      {/* 测试 */}
      <div>{a}</div>

      <button onClick={() => setValue(value + 1)}>{value}</button>

      <AISlate></AISlate>
    </>
  );
}

export default App;
