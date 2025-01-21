import React, { useState, useRef } from 'react';
import { X, Upload, Loader, Bold, Italic, List, Link as LinkIcon, AlertCircle, Heading1, Heading2, Heading3, Quote, Code, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import { saveBlogPost, updateBlogPost, BlogPost } from '../utils/blogService';
import { uploadImage } from '../utils/imageService';

interface BlogEditorProps {
  post?: BlogPost;
  onClose: () => void;
  onSave: () => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  
  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="sticky top-0 z-10 border border-gray-200 rounded-t-lg p-2 flex flex-wrap gap-1 bg-white shadow-sm">
      <div className="flex gap-1 items-center border-r border-gray-200 pr-1 mr-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
          title="Code"
        >
          <Code className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r border-gray-200 pr-1 mr-1">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r border-gray-200 pr-1 mr-1">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Numbered List"
        >
          <List className="h-4 w-4 rotate-180" />
        </button>
      </div>

      <div className="flex gap-1 items-center border-r border-gray-200 pr-1 mr-1">
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-1 items-center">
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('blockquote') ? 'bg-gray-200' : ''}`}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default function BlogEditor({ post, onClose, onSave }: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    author: post?.author || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    image: post?.image || '',
    category: post?.category || '',
    read_time_minutes: post?.read_time_minutes || '',
    publish_date: post?.publish_date || new Date().toISOString(),
    slug: post?.slug || '',
    published: post?.published ?? false,
    middle_cta_enabled: post?.middle_cta_enabled ?? false,
    bottom_cta_enabled: post?.bottom_cta_enabled ?? false,
    cta_title: post?.cta_title || 'Join Our Beta Program',
    cta_description: post?.cta_description || 'Get early access and transform your e-commerce experience.',
    cta_button_text: post?.cta_button_text || 'Join Beta',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showUnsavedChanges, setShowUnsavedChanges] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
      }),
      TiptapImage.configure({
        inline: true,
      }),
    ],
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        content: editor.getHTML()
      }));
      setShowUnsavedChanges(true);
    },
  });

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
      errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
    }
    
    if (!formData.excerpt.trim()) {
      errors.excerpt = 'Excerpt is required';
    }
    
    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    }
    
    if (!formData.image) {
      errors.image = 'Featured image is required';
    }
    
    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }
    
    if (!formData.read_time_minutes.trim()) {
      errors.read_time_minutes = 'Read time is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      if (post?.id) {        
        await updateBlogPost(post.id, formData);
      } else {
        await saveBlogPost(formData);
      }
      setShowUnsavedChanges(false);
      onSave();
    } catch (err) {
      setError('Failed to save post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setShowUnsavedChanges(true);
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
          <h2 className="text-xl font-semibold text-[#351431]">
            {post ? `Edit Post: ${post.title}` : 'New Post'}
            {showUnsavedChanges && (
              <span className="ml-2 text-sm font-normal text-amber-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Unsaved changes
              </span>
            )}
          </h2>
          <button
            onClick={() => {
              if (showUnsavedChanges) {
                if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
                  onClose();
                }
              } else {
                onClose();
              }
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={generateSlug}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent ${
                    validationErrors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {validationErrors.title && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {validationErrors.title}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <div>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent ${
                    validationErrors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {validationErrors.slug && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {validationErrors.slug}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent ${
                  validationErrors.author ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {validationErrors.author && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {validationErrors.author}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publish Date
              </label>
              <input
                type="datetime-local"
                name="publish_date"
                value={formData.publish_date.slice(0, 16)}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent ${
                  validationErrors.publish_date ? 'border-red-500' : 'border-gray-300'
                }`}
                required
              />
              {validationErrors.publish_date && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {validationErrors.publish_date}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent ${
                validationErrors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors.excerpt && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {validationErrors.excerpt}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
              {validationErrors.content && (
                <span className="text-sm text-red-500 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-4 w-4" />
                  {validationErrors.content}
                </span>
              )}
            </label>
            <div className={`border rounded-lg focus-within:ring-2 focus-within:ring-[#008080] focus-within:border-transparent ${
              validationErrors.content ? 'border-red-500' : 'border-gray-300'
            }`}>
              <MenuBar editor={editor} />
              <EditorContent 
                editor={editor} 
                className="prose max-w-none p-4 min-h-[400px] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image
              </label>
              <div className="mt-1 flex items-center gap-4">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                )}
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isUploading ? 
                      <Loader className="animate-spin h-5 w-5 mr-2" /> :
                      <Upload className="h-5 w-5 mr-2" />
                    }
                    {isUploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>
              </div>
              {validationErrors.image && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {validationErrors.image}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent ${
                  validationErrors.category ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.category && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {validationErrors.category}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Read Time
              </label>
              <input
                type="text"
                name="read_time_minutes"
                value={formData.read_time_minutes}
                onChange={handleChange}
                placeholder="5 min read"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent ${
                  validationErrors.read_time_minutes ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.read_time_minutes && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {validationErrors.read_time_minutes}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#008080] focus:ring-[#008080] border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Publish immediately
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Call to Action Settings</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="middle_cta_enabled"
                    checked={formData.middle_cta_enabled}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#008080] focus:ring-[#008080] border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Show CTA in middle of content
                  </span>
                </label>
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="bottom_cta_enabled"
                    checked={formData.bottom_cta_enabled}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#008080] focus:ring-[#008080] border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Show CTA at bottom of content
                  </span>
                </label>
              </div>
            </div>

            {(formData.middle_cta_enabled || formData.bottom_cta_enabled) && (
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Title
                  </label>
                  <input
                    type="text"
                    name="cta_title"
                    value={formData.cta_title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CTA Description
                  </label>
                  <textarea
                    name="cta_description"
                    value={formData.cta_description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    name="cta_button_text"
                    value={formData.cta_button_text}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008080] focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                if (showUnsavedChanges) {
                  if (window.confirm('You have unsaved changes. Are you sure you want to close?')) {
                    onClose();
                  }
                } else {
                  onClose();
                }
              }}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white rounded-lg transition-colors ${
                isSubmitting 
                  ? 'bg-[#008080]/70 cursor-not-allowed'
                  : 'bg-[#008080] hover:bg-[#006666]'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {post ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                post ? 'Update Post' : 'Create Post'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}