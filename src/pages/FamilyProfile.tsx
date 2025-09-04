import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Home, Users, MapPin, Save, Plus, X } from 'lucide-react';

interface FamilyData {
  name: string;
  location: string;
  hosting_experience: string;
  price_range: string;
  current_students: number;
  total_students_hosted: number;
  average_stay_months: number;
  family_story: string;
  why_we_host: string;
  description: string;
  values: string[];
  photos: string[];
}

const FamilyProfile = () => {
  const { user, userProfile, loading } = useAuth();
  const { toast } = useToast();
  const [familyData, setFamilyData] = useState<FamilyData>({
    name: '',
    location: '',
    hosting_experience: '',
    price_range: '',
    current_students: 0,
    total_students_hosted: 0,
    average_stay_months: 0,
    family_story: '',
    why_we_host: '',
    description: '',
    values: [],
    photos: []
  });
  const [newValue, setNewValue] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingFamily, setExistingFamily] = useState(null);

  useEffect(() => {
    if (user && userProfile?.user_type === 'host_family') {
      fetchExistingFamily();
    }
  }, [user, userProfile]);

  const fetchExistingFamily = async () => {
    try {
      const { data, error } = await supabase
        .from('families')
        .select('*')
        .eq('user_id', user!.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setExistingFamily(data);
        setFamilyData({
          name: data.name || '',
          location: data.location || '',
          hosting_experience: data.hosting_experience || '',
          price_range: data.price_range || '',
          current_students: data.current_students || 0,
          total_students_hosted: data.total_students_hosted || 0,
          average_stay_months: data.average_stay_months || 0,
          family_story: data.family_story || '',
          why_we_host: data.why_we_host || '',
          description: data.description || '',
          values: data.values || [],
          photos: data.photos || []
        });
      }
    } catch (error: any) {
      console.error('Error fetching family profile:', error);
    }
  };

  const handleInputChange = (field: keyof FamilyData, value: string | number) => {
    setFamilyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addValue = () => {
    if (newValue.trim() && !familyData.values.includes(newValue.trim())) {
      setFamilyData(prev => ({
        ...prev,
        values: [...prev.values, newValue.trim()]
      }));
      setNewValue('');
    }
  };

  const removeValue = (index: number) => {
    setFamilyData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };

  const addPhoto = () => {
    if (newPhoto.trim() && !familyData.photos.includes(newPhoto.trim())) {
      setFamilyData(prev => ({
        ...prev,
        photos: [...prev.photos, newPhoto.trim()]
      }));
      setNewPhoto('');
    }
  };

  const removePhoto = (index: number) => {
    setFamilyData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    try {
      const familyPayload = {
        user_id: user.id,
        name: familyData.name,
        location: familyData.location,
        hosting_experience: familyData.hosting_experience,
        price_range: familyData.price_range,
        current_students: familyData.current_students,
        total_students_hosted: familyData.total_students_hosted,
        average_stay_months: familyData.average_stay_months,
        family_story: familyData.family_story,
        why_we_host: familyData.why_we_host,
        description: familyData.description,
        values: familyData.values.length > 0 ? familyData.values : null,
        photos: familyData.photos.length > 0 ? familyData.photos : null,
        verified: false
      };

      let error;
      if (existingFamily) {
        const { error: updateError } = await supabase
          .from('families')
          .update(familyPayload)
          .eq('id', existingFamily.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('families')
          .insert([familyPayload]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "资料已保存",
        description: existingFamily ? "您的家庭资料已成功更新" : "您的家庭资料已成功创建",
      });

    } catch (error: any) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !userProfile) {
    return <Navigate to="/auth" replace />;
  }

  if (userProfile.user_type !== 'host_family') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-warm-900 flex items-center gap-2">
              <Home className="h-8 w-8" />
              {existingFamily ? '编辑家庭资料' : '创建家庭资料'}
            </h1>
            <p className="text-warm-600 mt-2">
              {existingFamily ? '更新您的家庭信息' : '创建您的寄宿家庭档案'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                基本信息 Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">家庭名称 Family Name *</Label>
                  <Input
                    id="name"
                    value={familyData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="The Johnson Family"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">位置 Location *</Label>
                  <Input
                    id="location"
                    value={familyData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Vancouver, BC"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hosting_experience">寄宿经验 Hosting Experience *</Label>
                  <Input
                    id="hosting_experience"
                    value={familyData.hosting_experience}
                    onChange={(e) => handleInputChange('hosting_experience', e.target.value)}
                    placeholder="3 years hosting international students"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_range">价格区间 Price Range *</Label>
                  <Input
                    id="price_range"
                    value={familyData.price_range}
                    onChange={(e) => handleInputChange('price_range', e.target.value)}
                    placeholder="$800-900/month"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current_students">当前学生数 Current Students</Label>
                  <Input
                    id="current_students"
                    type="number"
                    min="0"
                    value={familyData.current_students}
                    onChange={(e) => handleInputChange('current_students', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_students_hosted">累计接待学生 Total Students Hosted</Label>
                  <Input
                    id="total_students_hosted"
                    type="number"
                    min="0"
                    value={familyData.total_students_hosted}
                    onChange={(e) => handleInputChange('total_students_hosted', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="average_stay_months">平均居住月数 Average Stay (Months)</Label>
                  <Input
                    id="average_stay_months"
                    type="number"
                    min="0"
                    value={familyData.average_stay_months}
                    onChange={(e) => handleInputChange('average_stay_months', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Family Story */}
          <Card>
            <CardHeader>
              <CardTitle>家庭故事 Family Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="family_story">家庭故事 Family Story</Label>
                <Textarea
                  id="family_story"
                  rows={4}
                  value={familyData.family_story}
                  onChange={(e) => handleInputChange('family_story', e.target.value)}
                  placeholder="Tell students about your family, your background, and what makes your home special..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="why_we_host">为什么接待学生 Why We Host</Label>
                <Textarea
                  id="why_we_host"
                  rows={4}
                  value={familyData.why_we_host}
                  onChange={(e) => handleInputChange('why_we_host', e.target.value)}
                  placeholder="Explain your motivation for hosting international students..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">家庭描述 Family Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={familyData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of your family and home..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Values & Photos */}
          <Card>
            <CardHeader>
              <CardTitle>特色与照片 Values & Photos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Values */}
              <div className="space-y-2">
                <Label>家庭价值观/特色 Family Values</Label>
                <div className="flex gap-2">
                  <Input
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Add a family value or highlight..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addValue())}
                  />
                  <Button type="button" onClick={addValue} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {familyData.values.map((value, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {value}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => removeValue(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Photos */}
              <div className="space-y-2">
                <Label>照片链接 Photo URLs</Label>
                <div className="flex gap-2">
                  <Input
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                    placeholder="Add photo URL..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPhoto())}
                  />
                  <Button type="button" onClick={addPhoto} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {familyData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={photo} 
                        alt={`Family photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=200&h=150&fit=crop";
                        }}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-6 h-6 p-0"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link to="/dashboard">
              <Button type="button" variant="outline">
                取消 Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              {isSubmitting ? '保存中...' : '保存资料 Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FamilyProfile;