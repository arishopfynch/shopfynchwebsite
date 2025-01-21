import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  read_time_minutes: string;
  publish_date: string;
  published: boolean;
  middle_cta_enabled: boolean;
  bottom_cta_enabled: boolean;
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
  created_at?: string;
  updated_at?: string;
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const postsRef = collection(db, 'blog_posts');
    const q = query(postsRef, orderBy('publish_date', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return empty array instead of throwing
  }
};

export const saveBlogPost = async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost> => {
  try {
    const postsRef = collection(db, 'blog_posts');
    const docRef = await addDoc(postsRef, {
      ...post,
      publish_date: post.publish_date || new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    return {
      id: docRef.id,
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

export const updateBlogPost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
  try {
    const docRef = doc(db, 'blog_posts', id);
    await updateDoc(docRef, {
      ...updates,
      updated_at: new Date().toISOString()
    });

    return {
      id,
      ...updates,
      updated_at: new Date().toISOString()
    } as BlogPost;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'blog_posts', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};