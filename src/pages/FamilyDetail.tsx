import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");

  // Mock family data - in real app this would come from API
  const family = {
    id: 1,
    name: "The Johnson Family",
    chineseName: "约翰逊家庭",
    location: "Vancouver, BC",
    address: "Kitsilano neighborhood",
    experience: "3 years hosting",
    currentStudents: 2,
    totalStudents: 15,
    price: "$850/month",
    rating: 4.9,
    reviewCount: 15,
    mainImage: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&h=600&fit=crop",
    familyMembers: ["David (父亲/Father)", "Sarah (母亲/Mother)", "Emma (女儿/Daughter, 16)"],
    languages: ["English", "Basic Mandarin"],
    highlights: ["Cultural celebrations", "Home-cooked meals", "Airport pickup", "Study support", "Pet-friendly"],
    roomImages: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=300&fit=crop"
    ],
    story: "我们的家庭热爱文化交流，已经接待了来自不同国家的15名学生。我们相信通过分享生活，可以建立终生的友谊。每年春节，我们都会和学生一起包饺子庆祝。\n\nOur family loves cultural exchange and has welcomed 15 students from different countries. We believe that by sharing life together, we can build lifelong friendships. Every Chinese New Year, we make dumplings together with our students to celebrate.",
    whyHost: "We started hosting because we wanted Emma to experience different cultures at home. What we discovered was how much joy and learning comes from opening our hearts to young people from around the world.",
    studentExperiences: [
      {
        name: "Li Wei (李伟)",
        period: "2023-2024",
        study: "UBC Computer Science",
        story: "在Johnson家的一年让我感受到了家的温暖。Sarah阿姨经常做中式菜给我吃，David叔叔教我开车，Emma像妹妹一样关心我。\n\nMy year with the Johnson family made me feel the warmth of home. Aunt Sarah often cooked Chinese dishes for me, Uncle David taught me to drive, and Emma cared for me like a little sister.",
        growth: "从刚来时的害羞内向，到现在能自信地用英语演讲，这个家庭给了我无条件的支持和鼓励。\n\nFrom being shy and introverted when I first arrived, to now being able to give confident English presentations, this family gave me unconditional support and encouragement.",
        photos: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop"]
      },
      {
        name: "Wang Mei (王美)",
        period: "2022-2023", 
        study: "SFU Business",
        story: "Johnson家不仅给了我住宿，更给了我一个真正的家。他们参加了我的毕业典礼，我永远不会忘记那一刻的感动。\n\nThe Johnson family didn't just give me accommodation, they gave me a real home. They attended my graduation ceremony, and I will never forget how moved I was at that moment.",
        growth: "学会了独立生活，也学会了如何与不同文化背景的人相处。现在我在加拿大工作，经常回去看望他们。\n\nI learned to live independently and how to get along with people from different cultural backgrounds. Now I work in Canada and often visit them."
      }
    ]
  };

  const handleConnect = () => {
    setShowContactForm(true);
  };

  const handleSendMessage = () => {
    // In real app, this would send the message
    console.log("Sending message:", message);
    setShowContactForm(false);
    setMessage("");
    // Show success message
  };

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
            
            <Button onClick={handleConnect}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Connect with Family
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
                src={family.mainImage} 
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
                <p className="text-lg text-primary font-medium mb-4">
                  {family.chineseName}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{family.rating}</span>
                    <span className="text-muted-foreground">({family.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{family.location} • {family.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{family.experience} • {family.totalStudents} students hosted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>Currently hosting {family.currentStudents} students</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary mb-1">
                  {family.price}
                </div>
                <p className="text-sm text-muted-foreground">
                  Includes meals, utilities, internet
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {family.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary">
                    {highlight}
                  </Badge>
                ))}
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
                  {family.story}
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Why We Host Students:</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {family.whyHost}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Family Members:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {family.familyMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Languages Spoken:</h4>
                  <div className="flex gap-2">
                    {family.languages.map((language, index) => (
                      <Badge key={index} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="room" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {family.roomImages.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`Room view ${index + 1}`}
                    className="w-full h-64 object-cover rounded-xl shadow-soft"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/50 text-white">
                      <Camera className="w-3 h-3 mr-1" />
                      Room {index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  Room Features & Home Environment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Your Room Includes:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Queen-size bed with quality linens
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Study desk with ergonomic chair
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Large closet for storage
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        High-speed Wi-Fi access
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Natural light and garden view
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Shared Spaces:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Fully equipped kitchen
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Comfortable living room
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Shared bathroom (private available)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Laundry facilities
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-success" />
                        Backyard and garden access
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="space-y-6">
              {family.studentExperiences.map((student, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{student.name}</span>
                      <Badge variant="outline">{student.period}</Badge>
                    </CardTitle>
                    <p className="text-sm text-primary">{student.study}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {student.photos && (
                      <div className="flex gap-3">
                        {student.photos.map((photo, photoIndex) => (
                          <img 
                            key={photoIndex}
                            src={photo} 
                            alt={`${student.name} memory`}
                            className="w-24 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-sm mb-2">My Experience:</h5>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {student.story}
                        </p>
                      </div>
                      
                      {student.growth && (
                        <div>
                          <h5 className="font-medium text-sm mb-2">My Growth:</h5>
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                            {student.growth}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    <span>No smoking indoors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Guests welcome with advance notice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Quiet hours: 10 PM - 7 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Share in household chores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Family dinners encouraged</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location & Transportation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Distance to UBC:</span> 15 minutes by bus
                  </div>
                  <div>
                    <span className="font-medium">Nearest Bus Stop:</span> 2 minutes walk
                  </div>
                  <div>
                    <span className="font-medium">Grocery Stores:</span> 5 minutes walk
                  </div>
                  <div>
                    <span className="font-medium">Recreation Center:</span> 8 minutes walk
                  </div>
                  <div>
                    <span className="font-medium">Downtown Vancouver:</span> 25 minutes by transit
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Connect with {family.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Introduce yourself (in Chinese or English):
                  </label>
                  <Textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hi! I'm a student at UBC looking for a warm homestay family. I would love to learn more about your family and share my culture with you.

你好！我是UBC的学生，正在寻找温暖的寄宿家庭。我希望了解更多关于你们家庭的信息，也想与你们分享我的文化。"
                    rows={6}
                    className="resize-none"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowContactForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="flex-1"
                  >
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default FamilyDetail;