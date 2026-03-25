import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { session, profile: authProfile } = useAuth();
  const [lang, setLang] = useState("en");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session && authProfile) {
      navigate(authProfile.role === "farmer" ? "/farmer-dashboard" : "/buyer-dashboard");
    }
  }, [session, authProfile, navigate]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = phone.replace(/\s/g, "");
    if (!cleaned || cleaned.length < 10) {
      toast({ title: "Enter a valid phone number", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const formattedPhone = cleaned.startsWith("+") ? cleaned : `+91${cleaned}`;
    const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone });
    setIsLoading(false);
    if (error) {
      toast({ title: "Failed to send OTP", description: error.message, variant: "destructive" });
    } else {
      setStep("otp");
      toast({ title: "OTP sent! 📱", description: `Check your messages on ${formattedPhone}` });
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast({ title: "Enter the 6-digit OTP", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const formattedPhone = phone.startsWith("+") ? phone.replace(/\s/g, "") : `+91${phone.replace(/\s/g, "")}`;
    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: "sms",
    });
    setIsLoading(false);
    if (error) {
      toast({ title: "Verification failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Login successful! 🎉", description: "Welcome to Farm2Market." });
    }
  };

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
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sprout className="h-10 w-10 text-primary" />
              <span className="font-display text-3xl font-black text-primary">Farm2Market</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {step === "phone" ? "Enter your phone number to get started" : "Enter the OTP sent to your phone"}
            </p>
          </CardHeader>

          <CardContent className="pt-4">
            {step === "phone" ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-5 w-5" />
                      <span className="text-sm font-semibold border-r border-border pr-2">+91</span>
                    </div>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-14 pl-24 text-lg font-semibold tracking-wide rounded-xl"
                      autoFocus
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 rounded-xl text-lg font-bold gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending OTP..." : "Get OTP"}
                  {!isLoading && <ArrowRight className="h-5 w-5" />}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    className="gap-2"
                  >
                    <InputOTPGroup className="gap-2">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className="h-14 w-12 text-xl font-bold rounded-lg border-2"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <button
                    type="button"
                    onClick={() => { setStep("phone"); setOtp(""); }}
                    className="text-sm text-primary hover:underline"
                  >
                    Change phone number
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 rounded-xl text-lg font-bold gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify & Login"}
                  {!isLoading && <ArrowRight className="h-5 w-5" />}
                </Button>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="w-full text-center text-sm text-muted-foreground hover:text-primary"
                >
                  Didn't receive OTP? Resend
                </button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
