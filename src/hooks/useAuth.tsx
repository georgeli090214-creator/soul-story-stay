import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: any | null;
  loading: boolean;
  signUp: (email: string, password: string, userType: string, additionalData?: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  createProfile: (userType: string, data: any) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile after auth state changes
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .maybeSingle();
            setUserProfile(profile);
            setLoading(false);
          }, 0);
        } else {
          setUserProfile(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userType: string, additionalData?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (!error && data.user) {
      // Wait a moment for trigger to create profile, then update user type if needed
      setTimeout(async () => {
        if (userType !== 'student') {
          const { error: profileError } = await supabase
            .from('user_profiles')
            .update({ user_type: userType as any })
            .eq('user_id', data.user.id);

          if (profileError) {
            console.error('Error updating user type:', profileError);
          }
        }

        // Create student profile if needed
        if (userType === 'student' && additionalData) {
          const { error: studentError } = await supabase
            .from('students')
            .insert([
              {
                user_id: data.user.id,
                name: additionalData.name,
                age: additionalData.age,
                university: additionalData.university,
                hometown: additionalData.hometown,
                bio: additionalData.bio
              }
            ]);

          if (studentError) {
            console.error('Error creating student profile:', studentError);
          }
        }
      }, 100);

      return { error: null };
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { error };
  };

  const signOut = async () => {
    try {
      // Clear local state first
      setUser(null);
      setSession(null);
      setUserProfile(null);
      
      // Then try to sign out from Supabase
      const { error } = await supabase.auth.signOut({
        scope: 'global'
      });
      
      if (error) {
        console.error('Logout error:', error);
      }
      
      // Clear localStorage
      localStorage.removeItem('supabase.auth.token');
      localStorage.clear();
      
      // Force redirect to home page
      window.location.href = '/';
    } catch (err) {
      console.error('Logout exception:', err);
      // Force clear everything and redirect
      setUser(null);
      setSession(null);
      setUserProfile(null);
      localStorage.clear();
      window.location.href = '/';
    }
  };

  const createProfile = async (userType: string, data: any) => {
    if (!user) return { error: 'No user logged in' };

    if (userType === 'student') {
      const { error } = await supabase
        .from('students')
        .insert([
          {
            user_id: user.id,
            ...data
          }
        ]);
      return { error };
    }

    return { error: 'Invalid user type' };
  };

  const value = {
    user,
    session,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    createProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};