const obj = {
    name: "Nicholas",
    age: 33,
    "favorite color": "blue"
  };
  
  const key = "name";
  const dynamicKey = "favorite color";
  
  // ✅ Dot notation — use for hardcoded keys (no spaces or special chars)
  console.log(obj.name); // "Nicholas"
  
  // ❌ Dot notation does NOT work with variables or spaces
  console.log(obj.key);              // undefined (looking for 'key' property)
  console.log(obj.favorite color);   // ❌ Syntax error
  
  // ✅ Bracket notation — use for dynamic keys or keys with spaces
  console.log(obj[key]);             // "Nicholas"
  console.log(obj[dynamicKey]);      // "blue"
  console.log(obj["favorite color"]); // "blue"
  