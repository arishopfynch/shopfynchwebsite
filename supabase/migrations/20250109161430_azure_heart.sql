-- Drop existing policies
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON blog_posts;
DROP POLICY IF EXISTS "Enable read access for published posts" ON blog_posts;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to read all posts
CREATE POLICY "Allow authenticated users to read all posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create a policy that allows authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create a policy that allows authenticated users to update posts
CREATE POLICY "Allow authenticated users to update posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a policy that allows authenticated users to delete posts
CREATE POLICY "Allow authenticated users to delete posts"
  ON blog_posts
  FOR DELETE
  TO authenticated
  USING (true);

-- Create a policy that allows anonymous users to read published posts
CREATE POLICY "Allow public to read published posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);