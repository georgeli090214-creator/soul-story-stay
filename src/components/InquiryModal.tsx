import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyId: string;
  familyName: string;
}

export const InquiryModal = ({ isOpen, onClose, familyId, familyName }: InquiryModalProps) => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile || userProfile.user_type !== 'student') {
      toast({
        title: "登录错误",
        description: "请先以学生身份登录",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Get student ID
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (studentError || !studentData) {
        throw new Error('学生资料未找到');
      }

      // Create inquiry
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            student_id: studentData.id,
            family_id: familyId,
            message: message || '我对您的寄宿家庭很感兴趣，希望能进一步了解。',
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "连接请求已发送",
        description: `您的连接请求已发送给${familyName}`,
      });

      setMessage('');
      onClose();
    } catch (error: any) {
      toast({
        title: "发送失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>连接 {familyName}</DialogTitle>
          <DialogDescription>
            发送您的连接请求，让寄宿家庭了解您的兴趣
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">个人消息 (可选)</Label>
            <Textarea
              id="message"
              placeholder="简单介绍一下您自己，或者表达您的兴趣..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '发送中...' : '发送连接请求'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};