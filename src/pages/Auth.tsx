import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { user, signUp, signIn, loading } = useAuth();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [university, setUniversity] = useState('');
  const [hometown, setHometown] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/families" replace />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const additionalData = userType === 'student' ? {
      name,
      age: parseInt(age),
      university,
      hometown,
      bio
    } : undefined;

    const { error } = await signUp(email, password, userType, additionalData);
    
    if (error) {
      toast({
        title: "注册失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "注册成功",
        description: "请检查您的邮箱并确认账户",
      });
    }
    
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      toast({
        title: "登录失败",
        description: error.message,
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 to-warm-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-warm-900">心灵港湾</CardTitle>
          <CardDescription>寄宿家庭连接平台</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">登录</TabsTrigger>
              <TabsTrigger value="signup">注册</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">邮箱</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">密码</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '登录中...' : '登录'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-3">
                  <Label>用户类型</Label>
                  <RadioGroup value={userType} onValueChange={setUserType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">学生</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="host_family" id="host_family" />
                      <Label htmlFor="host_family">寄宿家庭</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email">邮箱</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">密码</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                {userType === 'student' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">姓名</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">年龄</Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                        min="16"
                        max="35"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">大学</Label>
                      <Input
                        id="university"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hometown">家乡</Label>
                      <Input
                        id="hometown"
                        value={hometown}
                        onChange={(e) => setHometown(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">简介</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="简单介绍一下您自己..."
                        rows={3}
                      />
                    </div>
                  </>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '注册中...' : '注册'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;