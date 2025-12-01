import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "../api/assignments";
import { runQuery } from "../api/execute";
import { getHint } from "../api/hint";
import Editor from "../components/Editor";
import "../styles/attempt.scss";

export default function AssignmentPage() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [sql, setSql] = useState("");
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState("");

  useEffect(() => {
    getAssignmentById(id).then((res) => setAssignment(res.data));
  }, [id]);

  if (!assignment) return <div className="container">Loading...</div>;

  // const execute = async () => {
  //   try {
  //     const res = await runQuery(sql);
  //     setResult(res.data);
  //   } catch (err) {
  //     setResult({ error: err.response?.data?.error });
  //   }
  // };

  const execute = async () => {
  try {
    const res = await runQuery(assignment._id, sql);
    console.log(res.data);
    setResult(res.data);
  } catch (err) {
    setResult({ error: err.response?.data?.error });
  }
};


  const askHint = async () => {
    if (!sql.trim()) {
      alert("Enter some SQL query to get a hint!");
      return;
    }

    try {
      const res = await getHint(assignment._id, sql);
      setHint(res.data.hint);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch hint. Check console for details.");
    }
  };

  const renderSampleTables = () => {
    return assignment.sampleTables.map((table) => (
      <div key={table._id} className="sample-box">
        <h3>Sample Table: {table.tableName}</h3>
        <table>
          <thead>
            <tr>
              {table.columns.map((c) => (
                <th key={c._id}>{c.columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, idx) => (
              <tr key={idx}>
                {table.columns.map((col) => (
                  <td key={col._id}>{row[col.columnName]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  const renderResult = () => {
  if (!result) return null;

  if (result.error) return <p className="error">❌ {result.error}</p>;

  const { type = "table", value = [], columns = [] } = result;

  switch (type) {
    case "table":
      if (!value.length) return <p>No data</p>;
      return (
        <table>
          <thead>
            <tr>
              {columns.length
                ? columns.map((c) => <th key={c}>{c}</th>)
                : Object.keys(value[0]).map((k) => <th key={k}>{k}</th>)}
            </tr>
          </thead>
          <tbody>
            {value.map((row, idx) => (
              <tr key={idx}>
                {columns.length
                  ? columns.map((c, i) => <td key={i}>{row[c]}</td>)
                  : Object.values(row).map((v, i) => <td key={i}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      );
    default:
      return <p>Unknown result type</p>;
  }
};


  // const renderResult = () => {
  //   if (!result) return null;

  //   if (result.error) return <p className="error">❌ {result.error}</p>;

  //   const { type, value, columns, rows } = result;

  //   switch (type) {
  //     case "single_value":
  //     case "count":
  //       return <p>{value}</p>;
  //     case "row":
  //       return (
  //         <table>
  //           <thead>
  //             <tr>
  //               {Object.keys(value).map((k) => (
  //                 <th key={k}>{k}</th>
  //               ))}
  //             </tr>
  //           </thead>
  //           <tbody>
  //             <tr>
  //               {Object.values(value).map((v, idx) => (
  //                 <td key={idx}>{v}</td>
  //               ))}
  //             </tr>
  //           </tbody>
  //         </table>
  //       );
  //     case "column":
  //       return (
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Value</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {value.map((v, idx) => (
  //               <tr key={idx}>
  //                 <td>{v}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       );
  //     case "table":
  //       if (!value.length) return <p>No data</p>;
  //       return (
  //         <table>
  //           <thead>
  //             <tr>
  //               {Object.keys(value[0]).map((k) => (
  //                 <th key={k}>{k}</th>
  //               ))}
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {value.map((row, idx) => (
  //               <tr key={idx}>
  //                 {Object.values(row).map((v, i) => (
  //                   <td key={i}>{v}</td>
  //                 ))}
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       );
  //     default:
  //       return <p>Unknown result type</p>;
  //   }
  // };

  return (
    <div className="container assignment-page">
      <h1>{assignment.title}</h1>

      <div className="question-box">
        <h3>Description</h3>
        <p>{assignment.description}</p>
        <p><strong>Question:</strong> {assignment.question}</p>
      </div>

      {renderSampleTables()}

      <Editor value={sql} onChange={setSql} />

      <div className="action-row">
        <button onClick={execute}>Run Query</button>
        <button onClick={askHint} className="hint-btn">
          Get Hint
        </button>
      </div>

      <div className="result-box">{renderResult()}</div>

      {hint && <div className="hint-box">{hint}</div>}
    </div>
  );
}
