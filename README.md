React 에서 전역 상태관리…
React 생태계에서 전역 상태관리는 3rd 파티 라이브러리를 통해 구현하는 게 일반적입니다.

React 에서 상태관리 라이브러리로는 Redux, Recoil, Zustand 등이 널리 사용되고 있는데, 이 중 Zustand 의 보급과 사용이 확산되고 있는 추세인 것 같습니다. (npm 다운로드 Zustand 3.4m/w 으로, Redux 3.5m/w 와 거의 비슷해졌습니다.) State of JS 2023 은 아직이지만 그 비슷한 보고는 많이 접하고 있어요. State of JS 2023 발표에서는 아마도 Zustand 가 꽤 높은 인지도와 추세를 보이게 될 것으로 전망합니다.

Zustand 는 배우고 사용하기가 매우 쉬우면서 빠릿한 느낌입니다. 아마도 누구라도 한시간 정도면 큰 어려움 없이 사용할 수 있게 될 것이라고 생각합니다.

하지만 React 18 의 useReducer 와 useContext 를 사용하면, 별도의 3rd 파티 상태관리 라이브러리가 필요없을 정도로 완벽한 전역상태관리가 가능해집니다.

바닐라 코드가 대체로 그렇듯, 처음엔 조금 복잡해 보일 수도 있는데, 바닐라 코드만의 찌릿찌릿한 매력과 성취가 있습니다. (그리고 애착도 생겨서 이런 비생산적인 글을 생산하게 되기도 하죠.)

저 개인적으로도 Zustand 에 대한 이해를 좀 더 다지고 넘어가고 싶었고, useContext 의 커스텀 훅을 나름 최종판으로 만들어낸 결과물을 보고 싶어서 이 프로젝트를 기획해 봤습니다.

이 프로젝트의 태스크 & 목표
LocalStorage 에서 Todo List 를 전역상태관리 툴로 관리해봅니다.

Zustand 버전으로도 관리하고,

useContext 버전으로도 관리해 봅니다.

Complete Source Code & Working Demo
Working Demo @Vercel

https://zustand-and-usecontext.vercel.app/

Github Repository

https://github.com/KangWoosung/zustand-and-usecontext

StackBlitz

https://stackblitz.com/~/github.com/KangWoosung/zustand-and-usecontext

*첫 접속시 환경 준비에 시간이 좀 많이 걸립니다. 2~3분?

*StackBlitz 는 터미널 창에 커서가 준비되면 npm run dev 커맨드를 입력해줘야 합니다.

*아직 Beta 라서 모든 개발환경에서 안정적인 작동을 하지 않습니다. 현재는 node_module 호환 에러로 커맨드와 미리보기는 작동 안되네요. stackoverflow 에 해당 문제에 대한 해결방법이 있긴 한데, 패스 합니다.

프로젝트 준비
그러면 이제 Zustand 와 useContext 의 코드를 차례차례 만들고 비교해 봅시다.

따라해보실 분들은 이렇게 따라오시면 됩니다.

NextJS 프로젝트 생성
// cd zustand-and-usecontext
npx create-next-app@latest . --typescript --eslint
Tailwind…
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// tailwind.config.ts 를 남겨두고 tailwind.config.js 는 삭제합니다.
ZuStand
npm i zustand
그리고, RHF+Zod+Resolver
npm install react-hook-form
npm install @hookform/resolvers
npm install zod
react-icons
npm i react-icons
shadCN UI
npx shadcn-ui@latest init
npx shadcn-ui@latest add checkbox
//npx shadcn-ui@latest add button
