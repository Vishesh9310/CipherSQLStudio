import MonacoEditor from "react-monaco-editor";

export default function Editor({ value, onChange }) {
  return (
    <div style={{ height: "300px", marginTop: "15px" }}>
      <MonacoEditor
        language="sql"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v)}
        options={{ fontSize: 14 }}
      />
    </div>
  );
}
