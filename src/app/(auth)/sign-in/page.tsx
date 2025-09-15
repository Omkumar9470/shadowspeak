'use client';

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// --- Helper Functions and Schemas (Replaces External Imports) ---

// Replicates useRouter from 'next/navigation'
const useRouter = () => ({
  replace: (path: string) => {
    if (typeof window !== 'undefined') {
      console.log(`Navigating to: ${path}`);
      // In a real app, this changes the URL. Here we log it.
      alert(`Redirecting to ${path}`);
    }
  }
});

// Replicates signInSchema from '@/schemas/signInSchema'
const signInSchema = z.object({
  identifier: z.string().min(1, { message: 'Username or email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// Mock signIn function from 'next-auth/react'
const signIn = async (provider: string, options: { redirect: boolean, identifier: string, password?: string }) => {
  console.log('Attempting sign in with:', options);
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a successful login
  if (options.identifier === "user" && options.password === "password") {
    console.log("Sign-in successful");
    return { error: null, URL: "/dashboard" };
  }
  
  // Simulate a failed login
  console.log("Sign-in failed");
  return { error: "Incorrect Username or password", URL: null };
};


// --- Main Page Component ---

const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  // Mock useToast hook
  const useToast = () => ({
    toast: (options: { title: string, description: string, variant?: string }) => {
      alert(`${options.title}: ${options.description}`);
    }
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    });
    
    if (result?.error) {
      toast({
        title: "Login Failed",
        description: "Incorrect Username or password",
        variant: "destructive"
      });
    }

    if (result?.URL) {
      router.replace('/dashboard');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back
          </h1>
          <p className="mb-4">Sign In to continue your anonymous adventure</p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email/Username</label>
            <input 
              placeholder="email or username"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              {...form.register("identifier")}
            />
            {form.formState.errors.identifier && <p className="text-red-500 text-sm mt-1">{form.formState.errors.identifier.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password"
              placeholder="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              {...form.register("password")}
            />
            {form.formState.errors.password && <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>}
          </div>

          <button type="submit" className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400' disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;

