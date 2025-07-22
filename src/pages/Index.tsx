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
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();

  const presetAmounts = [10, 25, 50, 100];
  const [donationType, setDonationType] = useState<'oneoff' | 'monthly'>('oneoff');
  const donationAmounts = [10, 25, 50, 100];

  const heroImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=600&fit=crop',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&h=600&fit=crop'
  ];

  const handleAddToDonationCart = () => {
    const finalAmount = parseFloat(customAmount) || selectedAmount;
    
    if (!finalAmount || finalAmount <= 0) {
      toast({
        title: "Please select an amount",
        description: "Choose a donation amount to continue.",
        variant: "destructive"
      });
      return;
    }

    const newItem: DonationItem = {
      id: Date.now().toString(),
      appeal: 'Quick Donate',
      amount: finalAmount,
      quantity: 1,
      isMonthly: donationType === 'monthly'
    };

    setCartItems([...cartItems, newItem]);
    setSelectedAmount(null);
    setCustomAmount('');

    toast({
      title: "Added to basket! 💚",
      description: `£${finalAmount} ${donationType === 'monthly' ? 'monthly ' : ''}donation added`,
    });
  };

  const appeals = [
    'Emergency Relief Fund',
    'Education for Girls',
    'Healthcare Access',
    'Economic Empowerment',
    'Safe Housing Initiative'
  ];

  // Auto-rotate slides
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

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
    },
    {
      title: 'Healthcare Access for Mothers',
      description: 'Providing essential healthcare services to mothers in remote areas.',
      raised: 12300,
      goal: 20000,
      supporters: 198,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop'
    },
    {
      title: 'Economic Empowerment Training',
      description: 'Skills training and microfinance for women entrepreneurs.',
      raised: 18750,
      goal: 25000,
      supporters: 267,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop'
    },
    {
      title: 'Mental Health Support Program',
      description: 'Counseling and therapy services for trauma survivors.',
      raised: 9850,
      goal: 18000,
      supporters: 143,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop'
    }
  ];

  const [currentCampaignSlide, setCurrentCampaignSlide] = useState(0);
  const campaignsPerSlide = 3;
  const totalSlides = Math.ceil(campaigns.length / campaignsPerSlide);

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

  const addCampaignToCart = (campaign: typeof campaigns[0]) => {
    const newItem: DonationItem = {
      id: Date.now().toString(),
      appeal: campaign.title,
      amount: 25, // Default amount
      quantity: 1,
      isMonthly: false
    };

    setCartItems([...cartItems, newItem]);
    toast({
      title: "Added to basket! 💚",
      description: `£25 donation to ${campaign.title}`,
    });
  };

  const getUpsellSuggestions = () => {
    const currentAppeals = cartItems.map(item => item.appeal);
    return campaigns.filter(campaign => !currentAppeals.includes(campaign.title)).slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Modern Navigation with Mobile Menu */}
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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-primary transition-colors font-medium">About</a>
              <a href="#campaigns" className="text-gray-700 hover:text-primary transition-colors font-medium">Campaigns</a>
              <a href="#involved" className="text-gray-700 hover:text-primary transition-colors font-medium">Get Involved</a>
              <Button
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6"
              >
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="relative border-primary text-primary hover:bg-primary hover:text-white font-medium"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Basket
                {getTotalItems() > 0 && (
                  <Badge className="ml-2 bg-primary text-white">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="relative border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <Badge className="ml-1 bg-primary text-white text-xs px-1">
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
                        <p className="text-primary font-bold">
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
            
            {/* Upsell Suggestions */}
            {cartItems.length > 0 && getUpsellSuggestions().length > 0 && (
              <div className="border-t p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like:</h3>
                <div className="space-y-3">
                  {getUpsellSuggestions().map((campaign) => (
                    <div key={campaign.title} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{campaign.title}</p>
                        <p className="text-primary text-sm font-bold">£25 donation</p>
                      </div>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => addCampaignToCart(campaign)}
                        className="border-primary text-primary hover:bg-primary hover:text-white text-xs px-3"
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {cartItems.length > 0 && (
              <div className="border-t p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-primary">£{getTotalAmount()}</span>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium"
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

      {/* Hero Banner with Image Slider and Quick Donate Widget */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image}
                alt={`Women empowerment slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Quick Donate Widget */}
            <div className="lg:order-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Make a Difference</h2>
                
                <div className="space-y-6">
                  {/* Donation Type Toggle */}
                  <div className="flex bg-white/20 rounded-lg p-1 backdrop-blur-sm">
                    <button
                      onClick={() => setDonationType('oneoff')}
                      className={`flex-1 px-4 py-2 rounded-md font-medium transition-all text-sm ${
                        donationType === 'oneoff'
                          ? 'bg-primary text-white shadow-md'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      One-off
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`flex-1 px-4 py-2 rounded-md font-medium transition-all text-sm ${
                        donationType === 'monthly'
                          ? 'bg-primary text-white shadow-md'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>

                  {/* Amount Options */}
                  <div className="grid grid-cols-2 gap-3">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                          selectedAmount === amount
                            ? 'border-primary bg-primary text-white shadow-lg'
                            : 'border-white/30 bg-white/10 text-white hover:border-primary/50 backdrop-blur-sm'
                        }`}
                      >
                        <div className="font-bold">£{amount}</div>
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="space-y-2">
                    <span className="text-white/80 text-sm">Or enter custom amount</span>
                    <Input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="w-full h-12 bg-white/10 border-2 border-white/30 focus:border-primary text-white placeholder:text-white/60 backdrop-blur-sm"
                    />
                  </div>

                  {/* Donate Now Button */}
                  <button
                    onClick={handleAddToDonationCart}
                    disabled={(!selectedAmount && !customAmount)}
                    className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>


      {/* Active Campaigns Carousel */}
      <section id="campaigns" className="py-24 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Active Campaigns
            </h2>
            <p className="text-xl text-gray-600">
              Support our current initiatives making a difference in women's lives
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentCampaignSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-3 gap-8">
                      {campaigns
                        .slice(slideIndex * campaignsPerSlide, (slideIndex + 1) * campaignsPerSlide)
                        .map((campaign, index) => (
                        <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl group">
                          <div className="h-64 bg-gray-200 relative overflow-hidden">
                            <img 
                              src={campaign.image} 
                              alt={campaign.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-primary text-white px-3 py-1 text-sm font-semibold">
                                Active
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">{campaign.title}</h3>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">{campaign.description}</p>
                            
                            <div className="text-center">
                            <Button 
                              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3"
                              onClick={() => addCampaignToCart(campaign)}
                            >
                              <Heart className="h-4 w-4 mr-2" />
                              Donate Now
                            </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex justify-center items-center mt-8 gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentCampaignSlide(Math.max(0, currentCampaignSlide - 1))}
                disabled={currentCampaignSlide === 0}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCampaignSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentCampaignSlide ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentCampaignSlide(Math.min(totalSlides - 1, currentCampaignSlide + 1))}
                disabled={currentCampaignSlide === totalSlides - 1}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ch_qz8TcMu8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
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
      <section id="about" className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
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
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-primary/5 to-white group">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Shield className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Safe & Secure</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  All donations are processed securely and go directly to women-led initiatives.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-primary/5 to-white group">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Users className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Women-Led</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our programs are designed and implemented by women who understand the challenges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-primary/5 to-white group">
              <CardContent className="pt-8 pb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Globe className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
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
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=80&h=80&fit=crop&crop=face"
                    alt="Amara"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Amara's Education Journey</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    "Thanks to Forgotten Women, I was able to complete my education and now work as a teacher, 
                    helping other girls in my community access learning opportunities."
                  </p>
                  <div className="flex items-center text-primary font-medium">
                    <MapPin className="h-5 w-5 mr-2" />
                    Afghanistan
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-0 rounded-2xl bg-white">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&fit=crop&crop=face"
                    alt="Sarah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Sarah's New Beginning</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    "The safe housing program gave me the security I needed to rebuild my life. 
                    I now run a small business and support other women in similar situations."
                  </p>
                  <div className="flex items-center text-primary font-medium">
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
            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-primary/10 to-white group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 group-hover:bg-primary transition-colors duration-300">
                <Heart className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Donate</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Make a direct impact with financial support for our programs
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6">
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-primary/10 to-white group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 group-hover:bg-primary transition-colors duration-300">
                <Users className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Volunteer</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Join our team of dedicated volunteers making a difference
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6">
                Get Involved
              </Button>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-gradient-to-br from-primary/10 to-white group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 group-hover:bg-primary transition-colors duration-300">
                <Award className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Advocate</h3>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Raise awareness and advocate for women's rights in your community
              </p>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6">
                Learn How
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter - Compact Popup Style */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary/20 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Stay Connected</h2>
            <p className="text-gray-600 mb-6">
              Get updates on our impact and opportunities to help
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-gray-50 text-gray-900 border border-gray-200 h-12 rounded-lg focus:border-primary"
              />
              <Button className="bg-primary text-white hover:bg-primary/90 h-12 px-6 font-medium rounded-lg whitespace-nowrap">
                Subscribe
              </Button>
            </div>
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