



# 리액트 hook

https://ko.reactjs.org/docs/hooks-effect.html





## class vs function

#### function(hook)

- 과거에는 state를 가질 수 없었음 => hook이 생기면서 state를 처리할 수 있어 life cycle 관리가 가능해짐





## hook?

- 함수 컴포넌트에서 react state와 lifecycle 기능을 연동(hook into)할 수 있게 해주는 함수

- class 안에서는 동작하지 않음. class 없이 react를 사용할 수 있게 해주는 친구





## hooks 사용 규칙

- 같은 hook을 여러번 호출 가능
- 최상위(at the top level)에서만 hook을 호출해야 한다.
  - 반복문, 조건문, 중첩된 함수 내에서 hook실행은 불가능하다.
  - 함수 컴퍼넌트 몸통이 아닌, 몸통 안 복합 실행문의 {}에서는 사용 불가능
  - javascript의 block scope는 block외에서는 사용할 수 없기 때문(지역 변수)
- 비동기 함수 (async 키워드가 붙은 함수)는 콜백함수로 사용 불가능
- 





## useState()

- 컴포넌트의 상태관리

- 배열로 이루어져 있음
- 인자로 초기 state값을 받는다.
- const [item, setItem] = useState(0)
  - useState의 인자로 넘겨주는 값: state의 초기값
  - 반환하는 첫번째 인자 : useState가 관리할 변수
  - 반환하는 두번째 인자 : item의 상태를 바꾸는 함수

```react
 1:  import React, { useState } from 'react';
		// useState hook을 react에서 가져옴
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
     	// useState hook을 이용하면 state변수와 해당 state를 갱신할 수 있는 함수가 만들어짐
     	// 또한 useState의 인자값으로 0을 넘겨주면 count를 0으로 초기화
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
         // 사용자가 버튼 클릭을 하면 setCount함수를 호출, state변수를 갱긴
         // React는 새로운 count변수를 example 컴포넌트에 넘기며 해당 컴포넌트를 리렌더링
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```



## **side effect (or effect)**

- 데이터 가져오기, 구독(subscription) 설정하기, 수동으로 React 컴포넌트의 DOM 수정하기 등
- React 컴포넌트의 두종류 side effects : clean-up이 필요한 것과 그렇지 않은 것
  - react가 dom을 업데이트 한 뒤 추가로 코드를 실행해야 하는 경우 (clean up)
  - 네트워크 리퀘스트 , dom 수동 조작, 로깅등은 정리가 필요 없음





## 정리를 이용하지 않는 Effects

- react에게 컴포넌트가 렌더링 이후에 어떤 일을 수행해야 하는지 노티
- react에 넘긴 함수(effect)를 기억했다가 dom이 업데이트를 수행하면 이후에 effect호출
  - 명령형 api를 불러내는 일도 이친구 일
- 컴포넌트 내부에 두고 effect를 통해 state변수 (또는 그 어떤 prop)에 접근 가능
  - 함수 범위 내부이기 때문에 특별한 api없이도 값을 얻을 수 잇음
- 렌더링 이후 매번 수행

```react
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
}
```

- count state변수를 선언한 뒤 react에게 effect를 사용함을 말하고 있다.
- useEffect hook에 함수를 전달, 이 함수가 effect
- 컴포넌트 렌더링 시 react는 우리가 이용한 effect를 기억했다가 DOM을 업데이트한 이후에 실행
- useEffect에 전달된 함수가 모든 렌더링에서 다르다 !
  - 리렌더링 하는 때마다 모두 이전과 다른 effect로 교체하여 전달.



## 정리를 이용하는 Effects

- 외부 데이터에 구독을 설정해야 하는 경우, 메모리 누수가 발생하지 않도록 정리하는 것이 매우 중요
- 구독의 추가와 제거를 위한 코드는 결합도가 높기 때문에 useEffect는 이를 함께 다루도록 고안
- effect가 함수를 반환하면 react는 그 함수를 정리가 필요한 때에 실행시킴

- React가 effect를 clean-up하는 시점?
  - react는 컴포넌트가 마운트 해제되는 때에 정리 실행
  - effect는 한 번이 아니라 렌더링이 실행되는 때마다 실행 => 리액트가 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect또한 정리하는 이유

```react
useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

- useEffect가 컴포넌트의 렌더링 이후에 다양한 side effects를 표현할 수 있고, 정리가 필요한 경우에는 함수 반환 (반면, 정리가 필요없는 경우에는 어떤것도 반환하지 않는다)





## useEffect

- 어떤 컴포넌트가 Mount(화면에 첫 렌더링), Update(다시 렌더링), Unmount(화면에서 사라질 때) 특정 작업을 처리할 코드를 실행하고 싶을 때 사용

- 기본적으로 인자로 콜백함수(다른함수의 인자로 전달된 함수)를 받음 

  `useEffect(() => {//작업...})`

  ```react
  // 1. 콜백 함수 하나만 인자로 받음
  useEffect(() => {
      // 작업 ...
  })
  
  // 2. 첫번째 인자로 콜백 함수, 두번째 인자로 배열(dependency array)을 받음
  useEffect(() => {
      // 작업...
  }, [value])
  ```

  1. 콜백함수 하나만 인자로 받는 경우
     - 렌더링이 될 때마다 콜백이 실행
     - 즉, mount, rerendering 시 실행
  2. 첫번째 인자로 콜백함수, 두번째 인자로 배열을 받는 경우
     - 화면에 첫 렌더링 될 때, value 값이 바뀔 때 실행
     - 빈 배열을 전달한다면 화면에 첫 렌더링 될 때만 실행

  #### clean up

  > useEffect에서 어떤 서비스를 구독하는 코드를 넣었다면 이후에 구독을 해제해주는 clean up(정리)작업 필요
  >
  > 예를 들어 타이머를 시작했을 때 이후에 더이상 타이머가 필요 없을 때 타이머를 멈추는 작업 필요
  >
  > 어떤 이벤트리스너를 등록했다면 이벤트리스너를 제거해주는 정리작업 필요

  - 위의 상황들에서 정리작업을 처리해주려면 useEffect return값으로 함수를 넣어주면 됨
  - 이 함수 안에서 우리가 원하는 정리하는 작업을 처리해주면 됨(구독해지 기능을 넣어주면 됨)
  - 함수를 리턴해주면 해당 컴포넌트가 unmount될 때, 혹은 다음 렌더링 시 불릴 useEffect가 실행되기 이전에 그 함수가 실행됨
