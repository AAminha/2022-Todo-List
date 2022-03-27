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