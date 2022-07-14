import { useState } from "react"

function UseInput() {
  const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue)
    const onChange = (event) => {
      const{target:{value}} = event;
      let willUpdate = true;
      if (typeof validator === "function") {
        willUpdate = validator(value);
      }
      if (willUpdate) {
        setValue(value);
      }
    }
    return { value, onChange };
  }
  // 입력 길이가 10을 넘으면 더이상 입력 안됨
  const maxLen = (value) => value.length <= 10;
  // @를 포함하면 입력 x
  // const maxLen = (value) => !value.includes("@");

  const name = useInput("Mr.", maxLen)

  return (
    <div>
      <h1>useInput</h1>
      <input
        placeholder="Name"
        {...name}
      ></input>
      <hr></hr>
    </div>
  )
}

export default UseInput;