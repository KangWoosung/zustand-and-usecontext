/*  2024-06-07 13:13:34

version shift:

ver01: useIonicReducer 커스텀 훅을 사용한 버전
ver02: dispatch 를 사용한 개별 커스텀 훅을 리턴해주는 버전

하나만 선택해야 합니다.

2024-06-08 07:36:41
Version management attempt failed!!
Back to single version using ver02.

*/

// if (process.env.REACT_APP_USE_CONTEXT_VERSION === "ver01") {
//     export * from "./ver01/useIonicContext";
// }

// else if (process.env.REACT_APP_USE_CONTEXT_VERSION === "ver02") {
//     export * from "./ver02/useIonicContextVer02";
// }
// export * from "./ver01/useIonicContext";
export * from "./ver02/useIonicContextVer02";
