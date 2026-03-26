import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Phone, ArrowRight, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
];

type Step = "input" | "otp";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { session, profile: authProfile } = useAuth();
  const [lang, setLang] = useState("en");

  // Signup state
  const [signupPhone, setSignupPhone] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupRole, setSignupRole] = useState<"buyer" | "farmer">("buyer");
  const [signupStep, setSignupStep] = useState<Step>("input");
  const [signupOtp, setSignupOtp] = useState("");

  // Login state
  const [loginPhone, setLoginPhone] = useState("");
  const [loginStep, setLoginStep] = useState<Step>("input");
  const [loginOtp, setLoginOtp] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session && authProfile) {
      navigate(authProfile.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard");
    }
  }, [session, authProfile, navigate]);

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\s/g, "");
    return cleaned.startsWith("+") ? cleaned : `+91${cleaned}`;
  };

  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/\s/g, "");
    return cleaned.length >= 10;
  };

  // ── Signup Flow ──
  const handleSignupSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim()) {
      toast({ title: "Enter your name", variant: "destructive" });
      return;
    }
    if (!validatePhone(signupPhone)) {
      toast({ title: "Enter a valid phone number", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const formattedPhone = formatPhone(signupPhone);
    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
      options: {
        data: { full_name: signupName, role: signupRole },
      },
    });
    setIsLoading(false);
    if (error) {
      toast({ title: "Failed to send OTP", description: error.message, variant: "destructive" });
    } else {
      setSignupStep("otp");
      toast({ title: "OTP sent! 📱", description: `Check your messages on ${formattedPhone}` });
    }
  };

  const handleSignupVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupOtp.length < 6) {
      toast({ title: "Enter the 6-digit OTP", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const formattedPhone = formatPhone(signupPhone);
    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: signupOtp,
      type: "sms",
    });
    setIsLoading(false);
    if (error) {
      toast({ title: "Verification failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created! 🎉", description: `Welcome to Farm2Market, ${signupName}!` });
    }
  };

  // ── Login Flow ──
  const handleLoginSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(loginPhone)) {
      toast({ title: "Enter a valid phone number", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const formattedPhone = formatPhone(loginPhone);
    const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
    setIsLoading(false);
    if (error) {
      toast({ title: "Failed to send OTP", description: error.message, variant: "destructive" });
    } else {
      setLoginStep("otp");
      toast({ title: "OTP sent! 📱", description: `Check your messages on ${formattedPhone}` });
    }
  };

  const handleLoginVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginOtp.length < 6) {
      toast({ title: "Enter the 6-digit OTP", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const formattedPhone = formatPhone(loginPhone);
    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: loginOtp,
      type: "sms",
    });
    setIsLoading(false);
    if (error) {
      toast({ title: "Verification failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Login successful! 🎉", description: "Welcome back to Farm2Market." });
    }
  };

  const PhoneInput = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, "");
      if (raw.length <= 10) {
        onChange(raw);
      }
    };

    return (
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground pointer-events-none">
          <Phone className="h-5 w-5" />
          <span className="text-sm font-semibold border-r border-border pr-2">+91</span>
        </div>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="98765 43210"
          value={value}
          onChange={handleChange}
          className="flex h-14 w-full rounded-xl border border-input bg-background pl-24 pr-3 py-2 text-lg font-semibold tracking-wide ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
    );
  };

  const OTPEntry = ({
    otp,
    setOtp,
    onSubmit,
    onResend,
    onChangePhone,
    submitLabel,
  }: {
    otp: string;
    setOtp: (v: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onResend: (e: React.FormEvent) => void;
    onChangePhone: () => void;
    submitLabel: string;
  }) => (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your phone</p>
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup className="gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot key={i} index={i} className="h-14 w-12 text-xl font-bold rounded-lg border-2" />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <button type="button" onClick={onChangePhone} className="text-sm text-primary hover:underline">
          Change phone number
        </button>
      </div>
      <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold gap-2" disabled={isLoading}>
        {isLoading ? "Verifying..." : submitLabel}
        {!isLoading && <ArrowRight className="h-5 w-5" />}
      </Button>
      <button type="button" onClick={onResend as any} className="w-full text-center text-sm text-muted-foreground hover:text-primary">
        Didn't receive OTP? Resend
      </button>
    </form>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-br from-farm-green-light via-background to-farm-yellow-light">
        <Card className="w-full max-w-md">
          {/* Language toggle */}
          <div className="flex flex-wrap gap-1.5 p-4 pb-0 justify-center">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  lang === l.code
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <CardHeader className="text-center pt-4 pb-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sprout className="h-10 w-10 text-primary" />
              <span className="font-display text-3xl font-black text-primary">Farm2Market</span>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="gap-1.5" onClick={() => setLoginStep("input")}>
                  <LogIn className="h-4 w-4" /> Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="gap-1.5" onClick={() => setSignupStep("input")}>
                  <UserPlus className="h-4 w-4" /> Sign Up
                </TabsTrigger>
              </TabsList>

              {/* ── Login Tab ── */}
              <TabsContent value="login">
                {loginStep === "input" ? (
                  <form onSubmit={handleLoginSendOTP} className="space-y-6">
                    <p className="text-sm text-muted-foreground text-center">Enter your registered phone number</p>
                    <PhoneInput value={loginPhone} onChange={setLoginPhone} />
                    <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold gap-2" disabled={isLoading}>
                      {isLoading ? "Sending OTP..." : "Get OTP"}
                      {!isLoading && <ArrowRight className="h-5 w-5" />}
                    </Button>
                  </form>
                ) : (
                  <OTPEntry
                    otp={loginOtp}
                    setOtp={setLoginOtp}
                    onSubmit={handleLoginVerify}
                    onResend={handleLoginSendOTP}
                    onChangePhone={() => { setLoginStep("input"); setLoginOtp(""); }}
                    submitLabel="Verify & Login"
                  />
                )}
              </TabsContent>

              {/* ── Signup Tab ── */}
              <TabsContent value="signup">
                {signupStep === "input" ? (
                  <form onSubmit={handleSignupSendOTP} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        placeholder="Your name"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <PhoneInput value={signupPhone} onChange={setSignupPhone} />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">I am a</label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          type="button"
                          variant={signupRole === "buyer" ? "default" : "outline"}
                          className="h-14 rounded-xl text-base font-bold"
                          onClick={() => setSignupRole("buyer")}
                        >
                          🛒 Buyer
                        </Button>
                        <Button
                          type="button"
                          variant={signupRole === "farmer" ? "default" : "outline"}
                          className="h-14 rounded-xl text-base font-bold"
                          onClick={() => setSignupRole("farmer")}
                        >
                          🌾 Farmer
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold gap-2" disabled={isLoading}>
                      {isLoading ? "Sending OTP..." : "Get OTP & Sign Up"}
                      {!isLoading && <ArrowRight className="h-5 w-5" />}
                    </Button>
                  </form>
                ) : (
                  <OTPEntry
                    otp={signupOtp}
                    setOtp={setSignupOtp}
                    onSubmit={handleSignupVerify}
                    onResend={handleSignupSendOTP}
                    onChangePhone={() => { setSignupStep("input"); setSignupOtp(""); }}
                    submitLabel="Verify & Create Account"
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
