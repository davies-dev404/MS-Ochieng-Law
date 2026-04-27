import { Link } from "wouter";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen w-full flex items-center justify-center bg-white px-6">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-12">
              <span className="font-serif-heading text-4xl text-primary font-bold">404</span>
            </div>
            
            <h1 className="font-serif-heading text-4xl md:text-6xl text-secondary mb-8 font-bold">
              Mandate Not Found
            </h1>
            
            <div className="h-1 w-20 bg-primary/20 mx-auto mb-10" />
            
            <p className="font-sans text-foreground/50 text-lg font-light leading-relaxed mb-12 max-w-md mx-auto">
              The page you were looking for has been moved or is not available. 
              We are here to help you find the right legal solution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="inline-block font-serif-sub tracking-[0.25em] uppercase text-xs bg-primary text-white px-10 py-5 hover:bg-secondary transition-all duration-300 font-bold shadow-lg no-underline"
              >
                Return to Chambers
              </Link>
              <Link 
                href="/consultation" 
                className="inline-block font-serif-sub tracking-[0.25em] uppercase text-xs border border-border text-secondary/60 px-10 py-5 hover:border-primary hover:text-primary transition-all duration-300 font-bold no-underline"
              >
                Request Assistance
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
