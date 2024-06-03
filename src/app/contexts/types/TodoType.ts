// 1. Initial Type .. 프로젝트 전역 State 객체의 타입을 결정합니다.
export type TodoType = {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
};
