# 숭실대 유어슈 2022-1 Recruit 사전과제

Drag & Drop 기능이 있는 Todo List 구현

## 새로 배운 점
### json-server
- 정의 : 짧은 시간에 REST API를 구축해주는 라이브러리
- 이 프로그램을 사용해 테스트용, 공부용 데이터베이스를 만들어서 서버와 통신하는 것을 구현해볼 수 있다.

### 로컬 스토리지(localStorage)
웹 스토리지(web storage)에는 로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage)가 있다.
- 세션 스토리지 : 웹페이지의 세션이 끝날 때 저장된 데이터가 지워짐.
- 로컬 스토리지 : 웹페이지의 세션이 끝나더라도 데이터가 지워지지 않음.

#### 기본 API
웹 스토리지는 기본적으로 키(key)와 값(value)으로 이루어진 데이터를 저장할 수 있다.
```
/*
주의사항 : 오직 문자형(string) 데이터 타입만 지원
*/

// 키에 데이터 쓰기
localStorage.setItem("key", value);

// 키로 부터 데이터 읽기
localStorage.getItem("key");

// 키의 데이터 삭제
localStorage.removeItem("key");

// 모든 키의 데이터 삭제
localStorage.clear();

// 저장된 키/값 쌍의 개수
localStorage.length;
```

### 디바운스(Debounce)
디바운스(Debounce)는 함수를 여러 번 호출하고 마지막 호출에서 일정 시간이 지난 후 해당 함수의 기능이 동작하는 기법.
ex) 디바운스 시간으로 200ms를 지정할 경우, 검색어를 입력해 onChange가 계속 발생해도 수행되지 않다가 200ms동안 입력하지 않으면 그 때 발생되어 검색어 후보군을 보여줌.

#### 디바운스를 사용하는 경우
Debounce 기법은 검색창에서 자동 완성을 구현해야 하는 경우 또는 마우스를 빠르게 여러 번 클릭했을 때, 마지막 클릭에서 기능이 동작해야 하는 경우 사용할 수 있다.  
[참고 링크](https://developer-talk.tistory.com/248)

ex) 네이버 검색창에 "naver"를 검색하는 경우
- 검색 키워드에 대한 자동완성 리스트를 보여주기 위해서는 입력할 때마다 API 요청을 해야한다.
- 따라서 "naver"을 검색해야 하는 경우 5번의 API 요청을 해야한다. => 비효율적
- 디바운스 기법 사용 시, 함수는 5번 호출되지만 일정 시간이 지난 후 마지막 호출에서 검색 키워드에 대한 API 요청한다. => 효율적

#### 디바운스 구현
- 리액트의 Hook 중 하나인 useEffect 사용
- 디바운스 관련 메소드 : `lodash`
[참코 링크](https://hwani.dev/react-debouncing/)


### Drag Event
HTML tag에 `draggable`속성을 주면 해당 요소를 드래깅할 수 있다.

#### 웹 API에서 지원되는 Events
`onDrag` : item을 잡았을 때 발생하는 이벤트
`onDragEnter` : 잡은 item이 다른 item이랑 겹쳤을 때 발생하는 이벤트
`onDragLeave` : 잡은 item이 다른 item을 떠났을 때 발생하는 이벤트
`onDragOver` : 잡은 item이 다른 item과 겹쳐졌을 때 밀리초마다 발생하는 이벤트
`onDragStart` : item을 잡기 시작했을 때 발생하는 이벤트
`onDrop` : 잡은 item을 적절한 곳에 놓았을 때 발생하는 이벤트
`onDragEnd` : 잡은 item을 놓았을 때 발생하는 이벤트


### 추가) useRef
1. DOM을 선택하는 용도
2. 컴포넌트 안에서 조회 및 수정할 수 있는 변수 관리 (변수 값이 바뀌어도 리렌더링 하지 않음.)
[참고 자료](https://react.vlpt.us/basic/12-variable-with-useRef.html)