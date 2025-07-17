import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  ShoppingCart, 
  Plus, 
  X, 
  Edit3, 
  Trash2, 
  Users, 
  Shield, 
  Globe, 
  Award,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Minus,
  Play,
  ArrowRight,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react';

interface DonationItem {
  id: string;
  appeal: string;
  amount: number;
  quantity: number;
  isMonthly: boolean;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<DonationItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedAppeal, setSelectedAppeal] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);
  const { toast } = useToast();

  const presetAmounts = [10, 25, 50, 100];
  const appeals = [
    'Emergency Relief Fund',
    'Education for Girls',
    'Healthcare Access',
    'Economic Empowerment',
    'Safe Housing Initiative'
  ];

  const campaigns = [
    {
      title: 'Emergency Relief for Afghan Women',
      description: 'Providing immediate aid to women and children fleeing conflict.',
      raised: 15420,
      goal: 25000,
      supporters: 234,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=400&fit=crop'
    },
    {
      title: 'Girls Education Program',
      description: 'Supporting education access for girls in underserved communities.',
      raised: 8750,
      goal: 15000,
      supporters: 156,
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop'
    },
    {
      title: 'Safe Housing Initiative',
      description: 'Creating secure accommodation for women escaping violence.',
      raised: 22100,
      goal: 30000,
      supporters: 389,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'
    }
  ];

  const addToCart = () => {
    const finalAmount = parseFloat(customAmount) || selectedAmount;
    
    if (!selectedAppeal) {
      toast({
        title: "Please select an appeal",
        description: "Choose which cause you'd like to support.",
        variant: "destructive"
      });
      return;
    }

    if (!finalAmount || finalAmount <= 0) {
      toast({
        title: "Please select an amount",
        description: "Choose a donation amount or enter a custom amount.",
        variant: "destructive"
      });
      return;
    }

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      item => item.appeal === selectedAppeal && item.amount === finalAmount && item.isMonthly === isMonthly
    );

    if (existingItemIndex !== -1) {
      // If item exists, increase quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // If item doesn't exist, add new item
      const newItem: DonationItem = {
        id: Date.now().toString(),
        appeal: selectedAppeal,
        amount: finalAmount,
        quantity: 1,
        isMonthly: isMonthly
      };
      setCartItems([...cartItems, newItem]);
    }

    // Reset selections
    setSelectedAmount(null);
    setCustomAmount('');

    toast({
      title: "Added to basket! 💚",
      description: `£${finalAmount} ${isMonthly ? 'monthly ' : ''}donation to ${selectedAppeal}`,
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.amount * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Modern Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://forgottenwomen.org/wp-content/uploads/2023/11/FULL-1.png" 
                alt="Forgotten Women" 
                className="h-10 w-auto filter brightness-0"
              />
            </div>
            <div className="flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-red-600 transition-colors font-medium">About</a>
              <a href="#campaigns" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Campaigns</a>
              <a href="#involved" className="text-gray-700 hover:text-red-600 transition-colors font-medium">Get Involved</a>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6"
                onClick={() => document.getElementById('quick-donate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="relative border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-medium"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Basket
                {getTotalItems() > 0 && (
                  <Badge className="ml-2 bg-red-600 text-white">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Slide-out */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-96 max-w-[90vw] bg-white shadow-xl transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Donation Basket</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsCartOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your basket is empty</p>
                  <p className="text-sm">Add donations to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.appeal}</p>
                        <p className="text-red-600 font-bold">
                          £{item.amount} {item.isMonthly ? 'monthly' : 'one-off'}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium px-2">Qty: {item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Subtotal: £{item.amount * item.quantity}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-red-600">£{getTotalAmount()}</span>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium"
                    onClick={() => {
                      toast({
                        title: "Redirecting to secure checkout",
                        description: "Thank you for your generosity!",
                      });
                    }}
                  >
                    Secure Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Browsing
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern Hero Banner */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&h=1080&fit=crop" 
            alt="Women empowerment community gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Empowering <span className="text-red-500">Forgotten</span><br />
              Women Worldwide
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
              Supporting forgotten women through emergency relief, education, 
              and empowerment programs led by women, for women.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg"
                onClick={() => document.getElementById('quick-donate')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                Watch Our Story
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ChevronRight className="h-6 w-6 rotate-90" />
        </div>
      </section>

      {/* Modern Quick Donate Section */}
      <section id="quick-donate" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Make a Difference Today</h2>
            <p className="text-xl text-gray-600">Choose your impact and help us support women in need</p>
          </div>
          
          <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Appeal Selection */}
                <div>
                  <label className="block text-lg font-semibold mb-4 text-gray-800">Select Your Cause</label>
                  <Select value={selectedAppeal} onValueChange={setSelectedAppeal}>
                    <SelectTrigger className="w-full h-14 text-lg rounded-xl border-2">
                      <SelectValue placeholder="Choose which cause to support" />
                    </SelectTrigger>
                    <SelectContent>
                      {appeals.map((appeal) => (
                        <SelectItem key={appeal} value={appeal} className="text-lg py-3">{appeal}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Donation Type Switch */}
                <div className="flex items-center justify-center space-x-6 p-4 bg-gray-50 rounded-xl">
                  <span className={`text-lg font-medium ${!isMonthly ? 'text-red-600' : 'text-gray-500'}`}>
                    One-off
                  </span>
                  <Switch
                    checked={isMonthly}
                    onCheckedChange={setIsMonthly}
                    className="data-[state=checked]:bg-red-600"
                  />
                  <span className={`text-lg font-medium ${isMonthly ? 'text-red-600' : 'text-gray-500'}`}>
                    Monthly
                  </span>
                </div>
                
                {/* Preset Amounts */}
                <div>
                  <label className="block text-lg font-semibold mb-6 text-gray-800">Choose Amount</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        className={`h-20 text-xl font-bold rounded-xl transition-all ${
                          selectedAmount === amount 
                            ? "bg-red-600 text-white hover:bg-red-700 shadow-lg scale-105" 
                            : "border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-600"
                        }`}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                      >
                        £{amount}
                        {isMonthly && <span className="text-sm">/month</span>}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Custom Amount */}
                <div>
                  <label className="block text-lg font-semibold mb-4 text-gray-800">Or Enter Custom Amount</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="h-14 text-lg rounded-xl border-2 focus:border-red-600"
                  />
                </div>

                {/* Donate Now Button */}
                <div className="pt-6">
                  <Button
                    className="w-full h-16 bg-red-600 hover:bg-red-700 text-white px-8 font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transition-all"
                    onClick={addToCart}
                    disabled={!selectedAppeal || (!selectedAmount && !customAmount)}
                  >
                    <Heart className="h-6 w-6 mr-3" />
                    Donate Now
                    <ArrowRight className="h-6 w-6 ml-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
              <Play className="h-8 w-8 text-white ml-1" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See Your Impact in Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch how your donations create real change in the lives of women and girls around the world
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="bg-white/10 backdrop-blur rounded-full p-6 group-hover:bg-red-600 transition-colors duration-300">
                  <Play className="h-12 w-12 text-white ml-1" />
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=600&fit=crop" 
                alt="Video thumbnail showing healthcare for women"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-300 text-lg italic">
                "Every donation creates a ripple effect of hope and empowerment"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Forgotten Women?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide crucial support to women and girls in crisis situations, 
              focusing on emergency relief, education, healthcare, and economic empowerment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-red-50 to-white group">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 group-hover:bg-red-600 transition-colors duration-300">
                  <Shield className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Safe & Secure</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  All donations are processed securely and go directly to women-led initiatives.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-red-50 to-white group">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 group-hover:bg-red-600 transition-colors duration-300">
                  <Users className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Women-Led</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our programs are designed and implemented by women who understand the challenges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-red-50 to-white group">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 group-hover:bg-red-600 transition-colors duration-300">
                  <Globe className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Global Impact</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Supporting women and girls in over 15 countries across 4 continents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Modern Active Campaigns */}
      <section id="campaigns" className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Active Campaigns
            </h2>
            <p className="text-xl text-gray-600">
              Support our current initiatives making a difference in women's lives
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl group">
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-red-600 text-white px-3 py-1 text-sm font-semibold">
                      {Math.round((campaign.raised / campaign.goal) * 100)}% funded
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{campaign.title}</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">{campaign.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-600">£{campaign.raised.toLocaleString()} raised</span>
                      <span className="text-gray-600">£{campaign.goal.toLocaleString()} goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-red-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-600 font-medium">{campaign.supporters} supporters</span>
                      <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6">
                        <Heart className="h-4 w-4 mr-2" />
                        Donate Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Success Stories */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stories of Impact
            </h2>
            <p className="text-xl text-gray-300">
              Real impact stories from the women we support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  A
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Amara's Education Journey</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    "Thanks to Forgotten Women, I was able to complete my education and now work as a teacher, 
                    helping other girls in my community access learning opportunities."
                  </p>
                  <div className="flex items-center text-gray-500 font-medium">
                    <MapPin className="h-5 w-5 mr-2" />
                    Afghanistan
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                  S
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Sarah's New Beginning</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    "The safe housing program gave me the security I needed to rebuild my life. 
                    I now run a small business and support other women in similar situations."
                  </p>
                  <div className="flex items-center text-gray-500 font-medium">
                    <MapPin className="h-5 w-5 mr-2" />
                    Syria
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="involved" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Involved
            </h2>
            <p className="text-xl text-gray-600">
              There are many ways to support our mission
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-red-50 to-white group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <Heart className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Donate</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Make a direct impact with financial support for our programs
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6">
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-red-50 to-white group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <Users className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Volunteer</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Join our team of dedicated volunteers making a difference
              </p>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-6">
                Get Involved
              </Button>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-red-50 to-white group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 group-hover:bg-red-600 transition-colors duration-300">
                <Award className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Advocate</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Raise awareness and advocate for women's rights in your community
              </p>
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-6">
                Learn How
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-xl mb-12 opacity-90">
            Get updates on our impact and opportunities to help
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="bg-white text-gray-900 border-0 h-14 text-lg rounded-xl"
            />
            <Button className="bg-white text-red-600 hover:bg-gray-100 h-14 px-8 font-semibold text-lg rounded-xl">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="https://forgottenwomen.org/wp-content/uploads/2023/11/FULL-1.png" 
                alt="Forgotten Women" 
                className="h-12 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 mb-4">
                Safe Aid for Women by Women - Supporting forgotten women worldwide.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#campaigns" className="text-gray-400 hover:text-white">Campaigns</a></li>
                <li><a href="#involved" className="text-gray-400 hover:text-white">Get Involved</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Impact Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Donate</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Volunteer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Corporate Partnerships</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@forgottenwomen.org
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +44 20 1234 5678
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-1" />
                  London, United Kingdom
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Forgotten Women. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
