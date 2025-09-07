import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, MapPin, Users, Clock, Star, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { InquiryModal } from "@/components/InquiryModal";
import { useAuth } from "@/hooks/useAuth";

interface Family {
  id: string;
  name: string;
  location: string;
  hosting_experience: string;
  current_students: number;
  price_range: string;
  photos: string[] | null;
  family_story: string | null;
  why_we_host: string | null;
  values: string[] | null;
  verified: boolean;
  total_students_hosted: number;
  average_stay_months: number;
}

const Families = () => {
  const { user, signOut } = useAuth();
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    fetchFamilies();
  }, []);

  const fetchFamilies = async () => {
    try {
      // Query families table directly with verified filter and authentication
      // This ensures proper RLS policy enforcement
      const { data, error } = await supabase
        .from('families')
        .select(`
          id,
          name,
          location,
          hosting_experience,
          price_range,
          current_students,
          total_students_hosted,
          average_stay_months,
          verified,
          description,
          values,
          photos,
          video_url,
          why_we_host,
          family_story,
          created_at,
          updated_at
        `)
        .eq('verified', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFamilies(data || []);
    } catch (error) {
      console.error('Error fetching families:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectFamily = (family: Family) => {
    setSelectedFamily(family);
    setShowInquiryModal(true);
  };

  const filteredFamilies = families.filter(family => {
    const matchesSearch = searchQuery === "" || 
      family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      family.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === "all" || 
      (filter === "vancouver" && family.location.toLowerCase().includes("vancouver")) ||
      (filter === "toronto" && family.location.toLowerCase().includes("toronto")) ||
      (filter === "experienced" && parseInt(family.hosting_experience) >= 3);
    
    return matchesSearch && matchesFilter;
  });

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
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      面板 Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline">
                      For Families
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button>
                      Student Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title & Search */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            寻找你的温暖家庭
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover families who will welcome you with open hearts
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索城市或家庭名字 Search city or family name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
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
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">Loading families...</div>
          </div>
        ) : filteredFamilies.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground mb-4">
              {searchQuery || filter !== "all" ? "No families match your search" : "No families available yet"}
            </div>
            <p className="text-sm text-muted-foreground">
              {searchQuery || filter !== "all" ? "Try adjusting your filters" : "Host families will appear here once they register"}
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
            {filteredFamilies.map((family) => (
              <Card 
                key={family.id} 
                className="overflow-hidden border-0 shadow-soft hover:shadow-warm transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative">
                  <img 
                    src={family.photos?.[0] || "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop"} 
                    alt={family.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {family.price_range}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    {family.verified && (
                      <Badge className="bg-success text-success-foreground text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg leading-tight">
                      {family.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {family.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {family.hosting_experience}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <p className="text-sm text-foreground leading-relaxed line-clamp-2">
                      {family.why_we_host || family.family_story || "Welcome to our family home!"}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {family.values?.slice(0, 2).map((value, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {value}
                        </Badge>
                      )) || (
                        <Badge variant="secondary" className="text-xs">
                          Welcoming Home
                        </Badge>
                      )}
                      {(family.values?.length || 0) > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{(family.values?.length || 0) - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{family.current_students} current</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span>{family.total_students_hosted} hosted</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Link to={`/family/${family.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          查看详情 View Details
                        </Button>
                      </Link>
                      <Button 
                        size="sm" 
                        onClick={() => handleConnectFamily(family)}
                        disabled={!user}
                        className="flex-1"
                      >
                        {!user ? "Login to Connect" : "连接 Connect"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </main>

      {/* Inquiry Modal */}
      {selectedFamily && (
        <InquiryModal
          isOpen={showInquiryModal}
          onClose={() => {
            setShowInquiryModal(false);
            setSelectedFamily(null);
          }}
          familyId={selectedFamily.id}
          familyName={selectedFamily.name}
        />
      )}
    </div>
  );
};

export default Families;