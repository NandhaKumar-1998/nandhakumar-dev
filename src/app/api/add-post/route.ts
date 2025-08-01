import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Add a new test post to JSON server
    const newPost = {
      id: Date.now(),
      title: body.title || `Test Post ${Date.now()}`,
      content: body.content || `This is a test post created at ${new Date().toISOString()} to demonstrate ISR functionality.`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      slug: body.slug || `test-post-${Date.now()}`,
      category: body.category || "Test Category",
      tags: body.tags || ["Test", "ISR", "Demo"],
      readTime: body.readTime || "2 min read"
    };
    
    const res = await fetch('http://localhost:3001/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    
    if (!res.ok) {
      throw new Error('Failed to add post');
    }
    
    const addedPost = await res.json();
    
    return NextResponse.json({ 
      success: true, 
      post: addedPost,
      message: 'Post added successfully. ISR will update the pages within 60 seconds.'
    });
  } catch (error) {
    console.error('Error adding post:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to add post' 
    }, { status: 500 });
  }
}