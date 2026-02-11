import { useState } from "react";
import { Check, ChevronRight, Upload, User, MapPin, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const steps = ["Personal Info", "Farm Details", "Documents", "Review"];
const stepIcons = [User, MapPin, Upload, Check];

export default function FarmerOnboarding() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", farmName: "", location: "", size: "", crops: "", capacity: "", bio: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const progress = ((step + 1) / steps.length) * 100;

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-black mb-2">Application Submitted!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you, {form.name}! We'll review your details and verify your farm within 2-3 business days.
            </p>
            <Button className="rounded-full" onClick={() => { setSubmitted(false); setStep(0); setForm({ name: "", phone: "", email: "", farmName: "", location: "", size: "", crops: "", capacity: "", bio: "" }); }}>
              Submit Another
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="font-display text-3xl font-black text-center mb-2">Farmer Registration</h1>
        <p className="text-center text-muted-foreground mb-8">Join Farm2Market and sell directly to buyers</p>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={s} className={`flex flex-col items-center gap-1 ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary/20 text-primary" : "bg-muted"
                  }`}>
                    {i < step ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span className="text-xs hidden md:block">{s}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">{steps[step]}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input placeholder="Your full name" value={form.name} onChange={(e) => update("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label>Farm Name</Label>
                  <Input placeholder="e.g. Green Valley Farms" value={form.farmName} onChange={(e) => update("farmName", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Location / State</Label>
                  <Input placeholder="e.g. Gujarat" value={form.location} onChange={(e) => update("location", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Farm Size (acres)</Label>
                  <Input placeholder="e.g. 50" value={form.size} onChange={(e) => update("size", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Crops Grown</Label>
                  <Input placeholder="e.g. Wheat, Rice, Vegetables" value={form.crops} onChange={(e) => update("crops", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Capacity (tonnes/season)</Label>
                  <Input placeholder="e.g. 200" value={form.capacity} onChange={(e) => update("capacity", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Short Bio</Label>
                  <Textarea placeholder="Tell buyers about your farm..." value={form.bio} onChange={(e) => update("bio", e.target.value)} />
                </div>
              </>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Upload documents for verification (farm ownership, ID proof)</p>
                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="font-display font-bold">Click to upload documents</p>
                  <p className="text-sm text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">Please review your information before submitting</p>
                {[
                  ["Name", form.name],
                  ["Phone", form.phone],
                  ["Email", form.email],
                  ["Farm", form.farmName],
                  ["Location", form.location],
                  ["Size", form.size ? `${form.size} acres` : ""],
                  ["Crops", form.crops],
                  ["Capacity", form.capacity ? `${form.capacity} tonnes/season` : ""],
                ].map(([label, value]) => (
                  value && (
                    <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-semibold">{value}</span>
                    </div>
                  )
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" className="rounded-full" disabled={step === 0} onClick={() => setStep(step - 1)}>
                Back
              </Button>
              {step < steps.length - 1 ? (
                <Button className="rounded-full gap-1" onClick={() => setStep(step + 1)}>
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button className="rounded-full" onClick={() => {
                  setSubmitted(true);
                  toast({ title: "Application submitted! 🎉", description: "We'll review your details shortly." });
                }}>
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
