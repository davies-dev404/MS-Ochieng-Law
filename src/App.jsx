import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Practice from "@/pages/Practice";
import Philosophy from "@/pages/Philosophy";
import WhyUs from "@/pages/WhyUs";
import Consultation from "@/pages/Consultation";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import ServiceCharter from "@/pages/ServiceCharter";
import OurPeople from "@/pages/OurPeople";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

const queryClient = new QueryClient();

function Router() {
  return (
    /*#__PURE__*/
    _jsxs(Switch, {
      children: [
        /*#__PURE__*/ _jsx(Route, { path: "/", component: Home }) /*#__PURE__*/,
        _jsx(Route, { path: "/about-us", component: AboutUs }) /*#__PURE__*/,
        _jsx(Route, { path: "/practice", component: Practice }) /*#__PURE__*/,
        _jsx(Route, {
          path: "/philosophy",
          component: Philosophy,
        }) /*#__PURE__*/,
        _jsx(Route, { path: "/why-us", component: WhyUs }) /*#__PURE__*/,
        _jsx(Route, {
          path: "/consultation",
          component: Consultation,
        }) /*#__PURE__*/,
        _jsx(Route, {
          path: "/blog",
          component: Blog,
        }) /*#__PURE__*/,
        _jsx(Route, {
          path: "/service-charter",
          component: ServiceCharter,
        }) /*#__PURE__*/,
        _jsx(Route, {
          path: "/people",
          component: OurPeople,
        }) /*#__PURE__*/,
        _jsx(Route, {
          path: "/blog/:id",
          component: BlogPost,
        }) /*#__PURE__*/,
        _jsx(Route, { path: "/privacy", component: Privacy }) /*#__PURE__*/,
        _jsx(Route, { path: "/terms", component: Terms }) /*#__PURE__*/,
        _jsx(Route, { component: NotFound }),
      ],
    })
  );
}

function App() {
  return (
    /*#__PURE__*/
    _jsx(QueryClientProvider, {
      client: queryClient,
      /*#__PURE__*/
      children: _jsxs(TooltipProvider, {
        children: [
          /*#__PURE__*/
          _jsx(WouterRouter, {
            base: import.meta.env.BASE_URL.replace(/\/$/, ""),
            /*#__PURE__*/ children: _jsx(Router, {}),
          }) /*#__PURE__*/,
          _jsx(Toaster, {}),
        ],
      }),
    })
  );
}

export default App;
