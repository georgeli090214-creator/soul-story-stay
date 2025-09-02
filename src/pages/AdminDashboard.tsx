import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Home, MessageCircle, Shield } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, userProfile, loading, signOut } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalFamilies: 0,
    totalInquiries: 0,
    pendingInquiries: 0
  });
  const [users, setUsers] = useState([]);
  const [families, setFamilies] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (user && userProfile?.user_type === 'admin') {
      fetchAdminData();
    }
  }, [user, userProfile]);

  const fetchAdminData = async () => {
    try {
      // Fetch stats
      const [usersRes, studentsRes, familiesRes, inquiriesRes] = await Promise.all([
        supabase.from('user_profiles').select('*', { count: 'exact' }),
        supabase.from('students').select('*', { count: 'exact' }),
        supabase.from('families').select('*'),
        supabase.from('inquiries').select('*')
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        totalStudents: studentsRes.count || 0,
        totalFamilies: familiesRes.data?.length || 0,
        totalInquiries: inquiriesRes.data?.length || 0,
        pendingInquiries: inquiriesRes.data?.filter(i => i.status === 'pending').length || 0
      });

      setUsers(usersRes.data || []);
      setFamilies(familiesRes.data || []);
      setInquiries(inquiriesRes.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
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

  if (userProfile.user_type !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-warm-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-warm-900 flex items-center gap-2">
              <Shield className="h-8 w-8" />
              管理员面板
            </h1>
            <p className="text-warm-600 mt-2">
              系统管理和数据监控
            </p>
          </div>
          <Button variant="outline" onClick={signOut}>
            退出登录
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总用户数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">学生数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">家庭数</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFamilies}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总连接数</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInquiries}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">待处理</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingInquiries}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">用户管理</TabsTrigger>
            <TabsTrigger value="families">家庭管理</TabsTrigger>
            <TabsTrigger value="inquiries">连接管理</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>所有用户</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {users.map((user: any) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{user.email}</p>
                        <p className="text-sm text-muted-foreground">
                          创建时间: {new Date(user.created_at).toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                      <Badge variant={
                        user.user_type === 'admin' ? 'destructive' :
                        user.user_type === 'host_family' ? 'default' : 'secondary'
                      }>
                        {user.user_type === 'admin' ? '管理员' :
                         user.user_type === 'host_family' ? '寄宿家庭' : '学生'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="families" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>寄宿家庭</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {families.map((family: any) => (
                    <div key={family.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{family.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {family.location} • {family.hosting_experience}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          当前学生: {family.current_students} • 价格: {family.price_range}
                        </p>
                      </div>
                      <Badge variant={family.verified ? 'default' : 'secondary'}>
                        {family.verified ? '已验证' : '待验证'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>连接请求</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {inquiries.map((inquiry: any) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex-1">
                        <p className="text-sm">{inquiry.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(inquiry.created_at).toLocaleDateString('zh-CN')}
                        </p>
                      </div>
                      <Badge variant={
                        inquiry.status === 'pending' ? 'secondary' :
                        inquiry.status === 'accepted' ? 'default' : 'destructive'
                      }>
                        {inquiry.status === 'pending' ? '待处理' :
                         inquiry.status === 'accepted' ? '已接受' : '已拒绝'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;