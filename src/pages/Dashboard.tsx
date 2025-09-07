import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Users, Clock, CheckCircle, XCircle, Home } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';

interface Inquiry {
  id: string;
  status: string;
  message: string;
  created_at: string;
  families?: {
    name: string;
    location: string;
  };
  students?: {
    name: string;
    university: string;
  };
}

const Dashboard = () => {
  const { user, userProfile, loading, signOut } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);

  useEffect(() => {
    if (user && userProfile) {
      fetchInquiries();
    }
  }, [user, userProfile]);

  const fetchInquiries = async () => {
    if (!user || !userProfile) return;

    try {
      if (userProfile.user_type === 'student') {
        // Fetch inquiries sent by this student
        const { data: studentData } = await supabase
          .from('students')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (studentData) {
          const { data, error } = await supabase
            .from('inquiries')
            .select(`
              id,
              status,
              message,
              created_at,
              families (
                name,
                location
              )
            `)
            .eq('student_id', studentData.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setInquiries(data || []);
        } else {
          setInquiries([]);
        }
      } else if (userProfile.user_type === 'host_family') {
        // Fetch inquiries received by this family
        const { data: familyData } = await supabase
          .from('families')
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (familyData) {
          const { data, error } = await supabase
            .from('inquiries')
            .select(`
              id,
              status,
              message,
              created_at,
              students (
                name,
                university
              )
            `)
            .eq('family_id', familyData.id)
            .order('created_at', { ascending: false });

          if (error) throw error;
          setInquiries(data || []);
        } else {
          setInquiries([]);
        }
      } else {
        setInquiries([]);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      setInquiries([]);
    } finally {
      setInquiriesLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId: string, status: 'pending' | 'accepted' | 'declined') => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status })
        .eq('id', inquiryId);

      if (error) throw error;
      await fetchInquiries();
    } catch (error) {
      console.error('Error updating inquiry:', error);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />待处理</Badge>;
      case 'accepted':
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />已接受</Badge>;
      case 'declined':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />已拒绝</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold text-primary">
              心灵港湾 <span className="text-sm text-muted-foreground">Soulful Home</span>
            </Link>
            {userProfile.user_type === 'student' && (
              <Link to="/families">
                <Button variant="outline" size="sm">
                  浏览家庭 Browse Families
                </Button>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h1 className="text-xl font-bold text-warm-900">
                {userProfile.user_type === 'student' ? '学生面板' : '家庭面板'}
              </h1>
              <p className="text-sm text-warm-600">
                {userProfile.email}
              </p>
            </div>
            <Button variant="outline" onClick={signOut}>
              退出登录
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总连接数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inquiries.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待处理</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiries.filter(i => i.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已成功</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiries.filter(i => i.status === 'accepted').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards for Host Families */}
        {userProfile.user_type === 'host_family' && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  家庭资料管理 Family Profile Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      管理您的寄宿家庭资料，让学生更好地了解您的家庭
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Create or update your homestay profile to attract international students
                    </p>
                  </div>
                  <Link to="/family-profile">
                    <Button>
                      <Home className="w-4 h-4 mr-2" />
                      管理资料 Manage Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Inquiries List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {userProfile.user_type === 'student' ? '我的连接请求' : '收到的连接请求'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inquiriesLoading ? (
              <div className="text-center py-4">加载中...</div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {userProfile.user_type === 'student' 
                  ? '您还没有发送任何连接请求' 
                  : '您还没有收到任何连接请求'
                }
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-semibold">
                          {userProfile.user_type === 'student'
                            ? inquiry.families?.name
                            : inquiry.students?.name
                          }
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {userProfile.user_type === 'student'
                            ? inquiry.families?.location
                            : inquiry.students?.university
                          }
                        </p>
                      </div>
                      {getStatusBadge(inquiry.status)}
                    </div>
                    
                    <Separator />
                    
                    <p className="text-sm">{inquiry.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(inquiry.created_at).toLocaleString('zh-CN')}
                    </p>

                    {userProfile.user_type === 'host_family' && inquiry.status === 'pending' && (
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => updateInquiryStatus(inquiry.id, 'accepted')}
                        >
                          接受
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateInquiryStatus(inquiry.id, 'declined')}
                        >
                          拒绝
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;