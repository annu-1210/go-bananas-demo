import * as React from "react";
import { useState } from "react";
import Header from "./components/Header/Header";
import TableDisplay from "./components/Table/TableDisplay";

function App() {
 const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <div>
        <Header setSearchQuery={setSearchQuery}/>
      </div>
      <TableDisplay searchQuery={searchQuery}/>
    </>
  );
}

export default App;
