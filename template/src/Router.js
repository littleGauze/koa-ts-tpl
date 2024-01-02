const { PROMPT, ENUMS } = require("../../src/constants");
const getContent = (params) => {
  if (params[PROMPT.LANG] === ENUMS[PROMPT.LANG].JavaScript) {
    return `
import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { DEPS, ENUMS, PROMPT } from "../../src/constants";

const loadDynamicPage = function () {
  const viteModules = import.meta.glob("./views/*/*.jsx");
  const viteModuleArr = [];
  for (const path in viteModules) {
    const routePath = path.split("/")[2].toLowerCase();
    /* @vite-ignore */
    const component = React.lazy(() => import(path));
    const routeOption = {
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
      <Routes>
        <Route exact path="/" element={<Navigate to={"/home"} />}></Route>
        {...routes}
        <Route path="*" element={<div>404</div>}></Route>
      </Routes>
    </Suspense>
  );
};

export default PageRouter; 
`;
  }
  return `
import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const loadDynamicPage = function () {
  const viteModules = import.meta.glob("./views/*/*.jsx");
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
      <Routes>
        <Route exact path="/" element={<Navigate to={"/home"} />}></Route>
        {...routes}
        <Route path="*" element={<div>404</div>}></Route>
      </Routes>
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
