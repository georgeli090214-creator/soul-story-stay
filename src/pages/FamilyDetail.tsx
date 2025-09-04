import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InquiryModal } from "@/components/InquiryModal";
import { useAuth } from "@/hooks/useAuth";
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Phone,
  Mail,
  Home,
  Camera,
  MessageCircle,
  CheckCircle
} from "lucide-react";

const FamilyDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [family, setFamily] = useState<any>(null);
  const [studentStories, setStudentStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchFamilyData();
    }
  }, [id]);

  const fetchFamilyData = async () => {
    try {
      // Fetch family data
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .select('*')
        .eq('id', id)
        .single();

      if (familyError) throw familyError;
      setFamily(familyData);

      // Fetch student stories for this family
      const { data: storiesData, error: storiesError } = await supabase
        .from('student_stories')
        .select(`
          *,
          students (
            name,
            university,
            hometown
          )
        `)
        .eq('family_id', id);

      if (storiesError && storiesError.code !== 'PGRST116') {
        console.error('Error fetching stories:', storiesError);
      } else {
        setStudentStories(storiesData || []);
      }
    } catch (error: any) {
      console.error('Error fetching family data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading family details...</div>
      </div>
    );
  }

  if (!family) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Family not found</h1>
          <Link to="/families">
            <Button>Back to Families</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/families" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Back to Families
            </Link>
            
            <Link to="/" className="text-xl font-bold text-primary">
              心灵港湾
            </Link>
            
            <Button onClick={() => setShowInquiryModal(true)} disabled={!user}>
              <MessageCircle className="w-4 h-4 mr-2" />
              {!user ? "Login to Connect" : "Connect with Family"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Family Header */}
        <div className="mb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <img 
                src={family.photos?.[0] || "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&h=600&fit=crop"} 
                alt={family.name}
                className="w-full h-96 object-cover rounded-xl shadow-warm"
              />
            </div>

            {/* Family Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {family.name}
                </h1>
                
                <div className="flex items-center gap-2 mb-4">
                  {family.verified && (
                    <Badge className="bg-success text-success-foreground">
                      Verified Family
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{family.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{family.hosting_experience} • {family.total_students_hosted || 0} students hosted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>Currently hosting {family.current_students || 0} students</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary mb-1">
                  {family.price_range}
                </div>
                <p className="text-sm text-muted-foreground">
                  Monthly homestay fee
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {family.values?.map((value: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {value}
                  </Badge>
                )) || (
                  <Badge variant="secondary">Welcoming Home</Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="story" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="story">Family Story</TabsTrigger>
            <TabsTrigger value="room">Room & Home</TabsTrigger>
            <TabsTrigger value="students">Student Experiences</TabsTrigger>
            <TabsTrigger value="practical">Practical Info</TabsTrigger>
          </TabsList>

          <TabsContent value="story" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Our Family Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {family.family_story || family.description || "Welcome to our family! We look forward to sharing our home and culture with international students."}
                </p>
                
                {family.why_we_host && (
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Why We Host Students:</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {family.why_we_host}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-3">Family Information:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Hosting Experience: {family.hosting_experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Average Stay: {family.average_stay_months || 0} months</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span>Total Students Hosted: {family.total_students_hosted || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="room" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {(family.photos || []).slice(1).map((image: string, index: number) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`Home photo ${index + 1}`}
                    className="w-full h-64 object-cover rounded-xl shadow-soft"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/50 text-white">
                      <Camera className="w-3 h-3 mr-1" />
                      Photo {index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  Home Environment & Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">What We Offer:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Comfortable private room
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Meals included
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Wi-Fi and utilities included
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Laundry facilities
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Family environment
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Location Benefits:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Close to public transportation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Near shopping and dining
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Safe neighborhood
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Easy access to universities
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="space-y-6">
              {studentStories.length > 0 ? (
                studentStories.map((story: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{story.students?.name}</span>
                        <Badge variant="outline">{story.story_type}</Badge>
                      </CardTitle>
                      <p className="text-sm text-primary">{story.students?.university}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {story.photos && story.photos.length > 0 && (
                        <div className="flex gap-3 overflow-x-auto">
                          {story.photos.map((photo: string, photoIndex: number) => (
                            <img 
                              key={photoIndex}
                              src={photo} 
                              alt={`${story.students?.name} memory ${photoIndex + 1}`}
                              className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                          ))}
                        </div>
                      )}
                      
                      <div>
                        <h5 className="font-medium text-sm mb-2">{story.title || "My Experience"}:</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {story.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">
                      No student experiences shared yet. Be the first to share your story!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="practical" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>House Rules & Lifestyle</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Respectful household environment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Open communication encouraged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Cultural exchange welcome</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Help with local orientation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Family-style meals</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location & Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Location:</span> {family.location}
                  </div>
                  <div>
                    <span className="font-medium">Price Range:</span> {family.price_range}
                  </div>
                  <div>
                    <span className="font-medium">Current Students:</span> {family.current_students || 0}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span> {family.hosting_experience}
                  </div>
                  <div>
                    <span className="font-medium">Verification:</span> {family.verified ? "Verified Family" : "Pending Verification"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        familyId={family.id}
        familyName={family.name}
      />
    </div>
  );
};

export default FamilyDetail;