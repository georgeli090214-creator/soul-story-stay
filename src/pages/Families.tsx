import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Users, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Families = () => {
  const [filter, setFilter] = useState<string>("all");

  // Mock family data - in real app this would come from API
  const families = [
    {
      id: 1,
      name: "The Johnson Family",
      chineseName: "约翰逊家庭",
      location: "Vancouver, BC",
      experience: "3 years hosting",
      currentStudents: 2,
      price: "$850/month",
      rating: 4.9,
      reviewCount: 15,
      image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop",
      highlights: ["Cultural celebrations", "Home-cooked meals", "Airport pickup"],
      hostingStyle: "像家人一样关爱每位学生 - Treating every student like family"
    },
    {
      id: 2,
      name: "The Chen-Williams Family",
      chineseName: "陈-威廉姆斯家庭",
      location: "Toronto, ON",
      experience: "5 years hosting",
      currentStudents: 1,
      price: "$900/month",
      rating: 4.8,
      reviewCount: 23,
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
      highlights: ["Bilingual household", "University connections", "Study support"],
      hostingStyle: "中西文化融合，助力学业成功 - East meets West for academic success"
    },
    {
      id: 3,
      name: "The Thompson Family",
      chineseName: "汤普森家庭",
      location: "Vancouver, BC",
      experience: "2 years hosting",
      currentStudents: 1,
      price: "$800/month",
      rating: 5.0,
      reviewCount: 8,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      highlights: ["Pet-friendly", "Garden access", "Cooking together"],
      hostingStyle: "温馨小家庭，分享加拿大生活 - Cozy family sharing Canadian life"
    },
    {
      id: 4,
      name: "The Rodriguez Family",
      chineseName: "罗德里格斯家庭",
      location: "Montreal, QC",
      experience: "4 years hosting",
      currentStudents: 2,
      price: "$750/month",
      rating: 4.7,
      reviewCount: 19,
      image: "https://images.unsplash.com/photo-1574469172761-808fbc0be0af?w=400&h=300&fit=crop",
      highlights: ["Multilingual", "City center", "Cultural activities"],
      hostingStyle: "多元文化体验，探索魁北克文化 - Multicultural experience in Quebec"
    }
  ];

  const filteredFamilies = families; // In real app, apply actual filtering

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              心灵港湾 <span className="text-sm text-muted-foreground">Soulful Home</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Button variant="outline">
                For Families
              </Button>
              <Button>
                Student Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            寻找你的温暖家庭
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover families who will welcome you with open hearts
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Families
          </Button>
          <Button 
            variant={filter === "vancouver" ? "default" : "outline"}
            onClick={() => setFilter("vancouver")}
          >
            Vancouver
          </Button>
          <Button 
            variant={filter === "toronto" ? "default" : "outline"}
            onClick={() => setFilter("toronto")}
          >
            Toronto
          </Button>
          <Button 
            variant={filter === "experienced" ? "default" : "outline"}
            onClick={() => setFilter("experienced")}
          >
            3+ Years Experience
          </Button>
        </div>

        {/* Family Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {filteredFamilies.map((family) => (
            <Card 
              key={family.id} 
              className="overflow-hidden border-0 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={family.image} 
                  alt={family.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {family.price}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{family.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg leading-tight">
                    {family.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {family.chineseName}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {family.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {family.experience}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    {family.hostingStyle}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {family.highlights.slice(0, 2).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {family.highlights.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{family.highlights.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{family.currentStudents} current students</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <span>{family.reviewCount} reviews</span>
                    </div>
                  </div>

                  <Link to={`/family/${family.id}`}>
                    <Button className="w-full mt-4" size="sm">
                      查看家庭故事 View Story
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Families
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Families;