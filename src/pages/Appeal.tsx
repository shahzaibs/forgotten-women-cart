import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Users, Target, Clock } from "lucide-react";

const Appeal = () => {
  const [donationAmount, setDonationAmount] = useState<number | string>('');
  const [customAmount, setCustomAmount] = useState('');

  const predefinedAmounts = [25, 50, 100, 250, 500];
  const goalAmount = 50000;
  const raisedAmount = 32500;
  const progressPercentage = (raisedAmount / goalAmount) * 100;

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setDonationAmount(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Image Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary to-primary-glow overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&h=600" 
          alt="Appeal header" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              URGENT APPEAL
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Help Us Save Lives Today
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Your donation can make an immediate impact in our community
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Section */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-primary">${raisedAmount.toLocaleString()}</span>
                  <span className="text-muted-foreground">of ${goalAmount.toLocaleString()} goal</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{Math.round(progressPercentage)}% funded</span>
                  <span>30 days left</span>
                </div>
              </CardContent>
            </Card>

            {/* Story Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">The Story</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-lg leading-relaxed mb-4">
                  Every day, families in our community face challenges that threaten their basic needs. 
                  From providing clean water to ensuring children have access to education, your support 
                  makes a real difference in the lives of those who need it most.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  This appeal focuses on our most urgent needs: emergency shelter for displaced families, 
                  medical care for vulnerable populations, and educational resources for underprivileged children.
                </p>
                <p className="text-lg leading-relaxed">
                  With your help, we can continue to be a beacon of hope in our community. Every donation, 
                  no matter the size, contributes to our mission of creating lasting positive change.
                </p>
              </CardContent>
            </Card>

            {/* Impact Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">1,250</div>
                  <div className="text-sm text-muted-foreground">People helped</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-sm text-muted-foreground">Communities reached</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Emergency support</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Donate Widget */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-2 border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary to-primary-glow text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Make a Donation
                </CardTitle>
                <CardDescription className="text-white/90">
                  Choose your donation amount
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Predefined Amounts */}
                <div className="grid grid-cols-2 gap-3">
                  {predefinedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={donationAmount === amount ? "default" : "outline"}
                      onClick={() => handleAmountSelect(amount)}
                      className="h-12 text-lg"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      className="pl-8 h-12 text-lg"
                    />
                  </div>
                </div>

                {/* Donation Impact */}
                {donationAmount && (
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2">Your Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      ${donationAmount} can provide emergency supplies for a family of four for one week.
                    </p>
                  </div>
                )}

                {/* Donate Button */}
                <Button 
                  className="w-full h-12 text-lg"
                  disabled={!donationAmount}
                >
                  Donate ${donationAmount || 0}
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  Your donation is secure and will be processed immediately.
                  Tax receipts will be emailed to you.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appeal;