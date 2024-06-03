/*  2024-06-03 05:19:11

Kyle's folder structure suggestions...

-assets
-components
    -common components like shadCN, etc
-contexts
    -context and state management lib util 
    -form
    -ui
-data
    -Json data
-features
    -make directory structure just same as components
    -authentication
        -components
        -hooks (features/authentication/components 에서만 사용되는 hooks)
        -services (features/authentication/components 에서만 사용되는 services)
        -contexts (features/authentication/components 에서만 사용되는 contexts)
        index.js(exports only here!!)
        ESLint 룰이 필요하다. 
-hooks
    -all custom hooks
-layouts
    -Navbar
    -PageContainer
    -Sidebar
    -Footer
-lib
    -3rd party external libraries like axios, fetch
-pages
    -Home.tsx, About.tsx, etc
    -세부 비즈니스 로직은 모두 features 에 분할 분포 되어있으므로, pages 는 심플하게 관리된다. 
-services
    -interacting api, analytics api, etc
-types
    -initial types, interfaces, zod schemas
    -and initial  States
-utils
    -format utility functions etc



*/

import { ErrorBoundary } from "./layouts/ErrorBoundary";
import BaseLayout from "./layouts/BaseLayout";

export default function Home() {
  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <h1>Home for Root</h1>
      </ErrorBoundary>
    </>
  );
}
