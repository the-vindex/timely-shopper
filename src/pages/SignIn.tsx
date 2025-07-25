import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkSent, setIsLinkSent] = useState(false);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock magic link sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLinkSent(true);
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    // Mock login for demo purposes
    navigate("/");
  };

  if (isLinkSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Check your inbox</h1>
          <p className="text-muted-foreground mb-6">
            We've sent a magic link to <strong>{email}</strong>. Click the link to sign in.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsLinkSent(false)}
            className="w-full"
          >
            Try different email
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles size={28} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Smart Reminders</h1>
          <p className="text-muted-foreground mt-2">
            Never miss a deal or the right moment to buy
          </p>
        </div>

        {/* Sign in form */}
        <Card className="p-8">
          <form onSubmit={handleSendMagicLink} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !email}
              className="w-full h-12 bg-primary hover:bg-primary-dark text-primary-foreground"
            >
              {isLoading ? "Sending..." : "Send Magic Link"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground mb-4">
              Or try the demo
            </p>
            <Button 
              variant="outline" 
              onClick={handleDemoLogin}
              className="w-full"
            >
              Continue as Demo User
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignIn;