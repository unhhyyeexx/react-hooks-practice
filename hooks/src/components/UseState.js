import { useState } from "react"

function UseState() {
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  return(
    <div>
      <h1> useState </h1>
      <h2>{item}</h2>
      <button onClick={incrementItem}>Increment</button>
      <button onClick={decrementItem}>Decrement</button>
      <hr></hr>
    </div>
  )
}

export default UseState;