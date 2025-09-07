import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Shield, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-welcome.jpg";

const Landing = () => {
  const { user, userProfile, signOut } = useAuth();
  const [selectedCity, setSelectedCity] = useState<string>("");

  const cities = [
    "Vancouver, BC",
    "Toronto, ON",
    "Montreal, QC",
    "Calgary, AB",
    "Ottawa, ON"
  ];

  const features = [
    {
      icon: Heart,
      title: "真诚的家庭故事",
      subtitle: "Authentic Family Stories",
      description: "了解每个家庭的真实故事和文化理解，不只是房间照片"
    },
    {
      icon: Shield,
      title: "安全可信赖",
      subtitle: "Safe & Trustworthy",
      description: "经过验证的家庭，真实的学生评价和成长记录"
    },
    {
      icon: Users,
      title: "文化桥梁",
      subtitle: "Cultural Bridge",
      description: "找到真正理解和支持国际学生成长的温暖家庭"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-white">
              心灵港湾 <span className="text-sm text-white/80">Soulful Home</span>
            </Link>
            
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/80">
                    {user.email}
                  </span>
                  {userProfile?.user_type === 'student' && (
                    <Link to="/families">
                      <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/20">
                        浏览家庭 Browse Families
                      </Button>
                    </Link>
                  )}
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/20">
                      面板 Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={signOut}
                    className="text-white border-white/30 hover:bg-white/20"
                  >
                    退出登录 Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline" size="sm" className="text-white border-white/30 hover:bg-white/20">
                      For Families 
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Student Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            心灵港湾
            <br />
            <span className="text-3xl md:text-4xl font-light opacity-90">Soulful Home</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-95">
            不只是寻找住宿，而是寻找理解你的温暖家庭
            <br />
            <span className="text-lg opacity-80">More than accommodation, find families who truly understand you</span>
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col gap-4">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="h-14 text-lg bg-white/95 backdrop-blur-sm border-white/20">
                  <MapPin className="w-5 h-5 mr-2" />
                  <SelectValue placeholder="选择你的城市 / Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Link to="/families">
                <Button 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-warm transition-all duration-300 hover:shadow-glow hover:scale-105"
                  disabled={!selectedCity}
                >
                  开始寻找家庭 Find Families
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-sm opacity-75">
            已帮助 <span className="font-semibold text-primary-glow">200+</span> 名学生找到温暖的家
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              为什么选择心灵港湾？
            </h2>
            <p className="text-xl text-muted-foreground">
              Why choose Soulful Home?
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft transition-all duration-300 hover:shadow-warm hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-4">
                    {feature.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            开始你的温暖家庭之旅
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of international students who found their home away from home
          </p>
          
          <Link to="/families">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg font-semibold px-8 py-4 shadow-warm hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              浏览家庭故事 Browse Family Stories
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;