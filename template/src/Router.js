const { PROMPT, ENUMS } = require("../../src/constants");
const getContent = (params) => {
  const isTs = params[PROMPT.LANG] === ENUMS[PROMPT.LANG].TypeScript;
  return `
import React, { Suspense } from "react";
import { Route, Routes, Navigate, HashRouter } from "react-router-dom";

const loadDynamicPage = function () {
  const viteModules = import.meta.glob("./views/*/*.${isTs ? "tsx" : "jsx"}");
  const viteModuleArr: any[] = [];
  for (const path in viteModules) {
    const routePath = path.split("/")[2].toLowerCase();
    /* @vite-ignore */
    const component = React.lazy(() => import(path));
    const routeOption: any = {
      path: \`/\${routePath}\`,
      component: component,
    };
    viteModuleArr.push(routeOption);
  }
  return viteModuleArr;
};

const routes = loadDynamicPage().map((item) => {
  const { path, component: Component } = item;
  return <Route path={path} exact element={<Component />}></Route>;
});
const PageRouter = () => {
  return (
    <Suspense fallback={<div></div>}>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to={"/home"} />}></Route>
          {...routes}
          <Route path="*" element={<div>404</div>}></Route>
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

export default PageRouter;
`;
};
const getExt = (params) => {
  return params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript ? "jsx" : "tsx";
};
module.exports = {
  getContent,
  getExt,
};
