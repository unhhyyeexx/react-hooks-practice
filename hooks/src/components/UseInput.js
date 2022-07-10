import { useInput, useState } from "react"




function UseInput() {
  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (event) => {
      const{target:{value}} = event;
      setValue(value)
    }
    return { value, onChange };
  }
  const name = useInput("Mr.")

  return (
    <div>
      <h1>useInput</h1>
      <input
        placeholder="Name"
        {...name}
      ></input>
    </div>
  )
}

export default UseInput;