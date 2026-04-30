import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Practice from "@/pages/Practice";
import Consultation from "@/pages/Consultation";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Terms from "@/pages/Terms";
import ServiceCharter from "@/pages/ServiceCharter";
import OurPeople from "@/pages/OurPeople";
import Admin from "@/pages/Admin";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/practice" component={Practice} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/service-charter" component={ServiceCharter} />
      <Route path="/people" component={OurPeople} />
      <Route path="/admin" component={Admin} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
