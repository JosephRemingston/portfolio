# Admin Authentication Setup Guide

Your blog admin panel now has full authentication protection using Supabase. Follow these steps to get started:

## 1. Create a Supabase User for Admin

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Click on your project
3. Go to **Authentication** → **Users**
4. Click **Invite** or **Create new user**
5. Enter your admin email and a strong password
6. Click **Send invitation** (or create directly if available)

## 2. Update Environment Variables

Make sure your `.env.local` file has both Supabase credentials:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Access the Admin Panel

1. Start your dev server: `pnpm dev`
2. Navigate to `http://localhost:3000/admin/blog`
3. You'll see the login form
4. Enter the email and password you created in step 1
5. Click "Sign In"

## 4. Features

✅ **Login Form** - Clean admin login page at `/admin/blog`
✅ **Protected Routes** - Admin panel is only accessible when logged in
✅ **Auto Authentication Check** - Session persists across page reloads
✅ **Logout Button** - Log out from the blog management header
✅ **Error Handling** - Clear error messages for failed login attempts

## 5. Security Notes

- The admin panel uses Supabase's built-in JWT authentication
- Sessions are automatically managed and persist across page reloads
- Passwords are securely hashed by Supabase
- Unauthorized users cannot access `/admin/blog` (redirected to login)

## 6. Advanced: Multiple Admins

Want to add more admins? Go to your Supabase Dashboard and create additional users with the same process.

## 7. Troubleshooting

**"Invalid login credentials"**
- Double-check email and password in Supabase dashboard
- Make sure user status is "Confirmed" in Auth Users list

**"useAuth must be used within AuthProvider"**
- Auth context is already configured in the root route
- Make sure you're importing `useAuth` from `src/context/AuthContext`

**Session not persisting**
- Clear browser cookies/storage and try again
- Check browser console for any errors
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct

## Next Steps

- Add more admins as needed from the Supabase dashboard
- The blog creation/editing automatically tracks which user created each post
- Consider enabling email auto-confirmation for a better user experience
