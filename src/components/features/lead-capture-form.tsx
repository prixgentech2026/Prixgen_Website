'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitLead } from '@/actions/hubspot';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Magnetic } from '@/components/animations/magnetic';

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  firstname: z.string().min(2, { message: "First name must be at least 2 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

/**
 * Lead capture form component.
 */
export function LeadCaptureForm({ source }: { source: string }) {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await submitLead({ ...data, source });
      if (result.success) {
        setIsSuccess(true);
        reset();
      } else {
        setError(result.message);
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg border border-green-100 animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">Success!</h3>
        <p className="text-green-800 text-center text-sm">
          Thank you for reaching out. A specialist will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="firstname" className="block text-sm font-medium mb-1 text-prixgen-dark/70">First Name</label>
        <Input
          id="firstname"
          placeholder="Enter your first name"
          {...register('firstname')}
          className={errors.firstname ? 'border-red-500' : ''}
        />
        {errors.firstname && <p className="text-xs text-red-500 mt-1">{errors.firstname.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-prixgen-dark/70">Work Email</label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1 text-prixgen-dark/70">Company</label>
        <Input
          id="company"
          placeholder="Company Name"
          {...register('company')}
          className={errors.company ? 'border-red-500' : ''}
        />
        {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1 text-prixgen-dark/70">Phone Number (Optional)</label>
        <Input
          id="phone"
          type="tel"
          placeholder="e.g. +1 (555) 000-0000"
          {...register('phone')}
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1 text-prixgen-dark/70">Message (Optional)</label>
        <Textarea
          id="message"
          rows={3}
          placeholder="How can we help you?"
          {...register('message')}
        />
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 p-3 rounded border border-red-100">{error}</p>}

      <Magnetic>
        <Button
          type="submit"
          className="w-full h-12 text-base font-bold shadow-blue-500/20"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Book a Consultation'
          )}
        </Button>
      </Magnetic>
    </form>
  );
}
