import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  MapPin
} from 'lucide-react';

interface DonationItem {
  id: string;
  appeal: string;
  amount: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<DonationItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedAppeal, setSelectedAppeal] = useState('');
  const [customAmount, setCustomAmount] = useState('');
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
      image: '/placeholder.svg'
    },
    {
      title: 'Girls Education Program',
      description: 'Supporting education access for girls in underserved communities.',
      raised: 8750,
      goal: 15000,
      supporters: 156,
      image: '/placeholder.svg'
    },
    {
      title: 'Safe Housing Initiative',
      description: 'Creating secure accommodation for women escaping violence.',
      raised: 22100,
      goal: 30000,
      supporters: 389,
      image: '/placeholder.svg'
    }
  ];

  // AI-generated image carousel data
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=600&fit=crop',
      alt: 'Women empowerment community gathering',
      caption: 'Building stronger communities together'
    },
    {
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=600&fit=crop',
      alt: 'Educational support for women',
      caption: 'Education opens doors to opportunity'
    },
    {
      url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=600&fit=crop',
      alt: 'Healthcare access for women',
      caption: 'Healthcare is a fundamental right'
    }
  ];

  const addToCart = (amount: number) => {
    if (!selectedAppeal) {
      toast({
        title: "Please select an appeal",
        description: "Choose which cause you'd like to support.",
        variant: "destructive"
      });
      return;
    }

    const newItem: DonationItem = {
      id: Date.now().toString(),
      appeal: selectedAppeal,
      amount: amount
    };

    setCartItems([...cartItems, newItem]);
    toast({
      title: "Added to basket! 💚",
      description: `£${amount} donation to ${selectedAppeal}`,
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.amount, 0);
  };

  const getTotalItems = () => {
    return cartItems.length;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://forgottenwomen.org/wp-content/uploads/2023/11/FULL-1.png" 
                alt="Forgotten Women" 
                className="h-10 w-auto filter brightness-0"
              />
            </div>
            <div className="flex items-center space-x-6">
              <a href="#about" className="text-gray-700 hover:text-[#93B252] transition-colors font-medium">About</a>
              <a href="#campaigns" className="text-gray-700 hover:text-[#93B252] transition-colors font-medium">Campaigns</a>
              <a href="#involved" className="text-gray-700 hover:text-[#93B252] transition-colors font-medium">Get Involved</a>
              <Button
                variant="outline"
                size="sm"
                className="relative border-[#93B252] text-[#93B252] hover:bg-[#93B252] hover:text-white font-medium"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Basket
                {getTotalItems() > 0 && (
                  <Badge className="ml-2 bg-[#93B252] text-white">
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
                        <p className="text-[#93B252] font-bold">£{item.amount}</p>
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
                  <span className="text-2xl font-bold text-[#93B252]">£{getTotalAmount()}</span>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#93B252] hover:bg-[#7a9642] text-white font-medium"
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#93B252] to-[#7a9642] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Safe Aid for Women <br />by Women
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 text-white">
              Supporting forgotten women worldwide through emergency relief, education, 
              and empowerment programs led by women, for women.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[#93B252] hover:bg-gray-100 font-semibold">
                Donate Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#93B252] font-semibold">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Carousel */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel className="w-full">
            <CarouselContent>
              {heroImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <p className="text-white text-lg font-medium">{image.caption}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </section>

      {/* Quick Donate Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Heart className="h-12 w-12 mx-auto mb-4 text-[#93B252]" />
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Quick Donate</h2>
            <p className="text-lg text-gray-600">Choose an amount and appeal to add to your basket</p>
          </div>
          
          <Card className="bg-white text-gray-900 border shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Appeal Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Select Appeal</label>
                  <Select value={selectedAppeal} onValueChange={setSelectedAppeal}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose which cause to support" />
                    </SelectTrigger>
                    <SelectContent>
                      {appeals.map((appeal) => (
                        <SelectItem key={appeal} value={appeal}>{appeal}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Preset Amounts */}
                <div>
                  <label className="block text-sm font-medium mb-4 text-gray-700">Choose Amount</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className="h-16 text-lg font-semibold border-[#93B252] text-[#93B252] hover:bg-[#93B252] hover:text-white"
                        onClick={() => addToCart(amount)}
                      >
                        £{amount}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Custom Amount */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button
                    className="h-12 bg-[#93B252] hover:bg-[#7a9642] text-white px-8 font-medium"
                    onClick={() => {
                      const amount = parseFloat(customAmount);
                      if (amount > 0) {
                        addToCart(amount);
                        setCustomAmount('');
                      }
                    }}
                    disabled={!customAmount || parseFloat(customAmount) <= 0}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Basket
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Forgotten Women
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide crucial support to women and girls in crisis situations, 
              focusing on emergency relief, education, healthcare, and economic empowerment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Shield className="h-12 w-12 text-[#93B252] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
                <p className="text-gray-600">
                  All donations are processed securely and go directly to women-led initiatives.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Users className="h-12 w-12 text-[#93B252] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Women-Led</h3>
                <p className="text-gray-600">
                  Our programs are designed and implemented by women who understand the challenges.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8">
                <Globe className="h-12 w-12 text-[#93B252] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Global Impact</h3>
                <p className="text-gray-600">
                  Supporting women and girls in over 15 countries across 4 continents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section id="campaigns" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Active Campaigns
            </h2>
            <p className="text-xl text-gray-600">
              Support our current initiatives making a difference in women's lives
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#93B252] text-white">
                      {Math.round((campaign.raised / campaign.goal) * 100)}% funded
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{campaign.title}</h3>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>£{campaign.raised.toLocaleString()} raised</span>
                      <span>£{campaign.goal.toLocaleString()} goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#93B252] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{campaign.supporters} supporters</span>
                      <Button size="sm" className="bg-[#93B252] hover:bg-[#7a9642]">
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

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real impact stories from the women we support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#93B252] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Amara's Education Journey</h3>
                  <p className="text-gray-600 mb-4">
                    "Thanks to Forgotten Women, I was able to complete my education and now work as a teacher, 
                    helping other girls in my community access learning opportunities."
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    Afghanistan
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#93B252] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  S
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sarah's New Beginning</h3>
                  <p className="text-gray-600 mb-4">
                    "The safe housing program gave me the security I needed to rebuild my life. 
                    I now run a small business and support other women in similar situations."
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    Syria
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="involved" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Involved
            </h2>
            <p className="text-xl text-gray-600">
              There are many ways to support our mission
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <Heart className="h-12 w-12 text-[#93B252] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Donate</h3>
              <p className="text-gray-600 mb-6">
                Make a direct impact with financial support for our programs
              </p>
              <Button className="bg-[#93B252] hover:bg-[#7a9642]">
                Donate Now
              </Button>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-[#93B252] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Volunteer</h3>
              <p className="text-gray-600 mb-6">
                Join our team of dedicated volunteers making a difference
              </p>
              <Button variant="outline" className="border-[#93B252] text-[#93B252] hover:bg-[#93B252] hover:text-white">
                Get Involved
              </Button>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <Award className="h-12 w-12 text-[#93B252] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Advocate</h3>
              <p className="text-gray-600 mb-6">
                Raise awareness and advocate for women's rights in your community
              </p>
              <Button variant="outline" className="border-[#93B252] text-[#93B252] hover:bg-[#93B252] hover:text-white">
                Learn How
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#93B252] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl mb-8 opacity-90">
            Get updates on our impact and opportunities to help
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="bg-white text-gray-900 border-0 h-12"
            />
            <Button className="bg-white text-[#93B252] hover:bg-gray-100 h-12 px-8">
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
