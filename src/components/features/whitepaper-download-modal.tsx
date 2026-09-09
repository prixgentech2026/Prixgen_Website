'use client';

import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { submitWhitepaperDownload } from '@/actions/whitepaper';

interface WhitepaperDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  whitepaperTitle?: string;
  slug?: string;
  downloadPath?: string;
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India (+91)', digits: 10 },
  { code: '+1', country: 'United States / Canada (+1)', digits: 10 },
  { code: '+44', country: 'United Kingdom (+44)', digits: 10 },
  { code: '+971', country: 'United Arab Emirates (+971)', digits: 9 },
  { code: '+966', country: 'Saudi Arabia (+966)', digits: 9 },
  { code: '+65', country: 'Singapore (+65)', digits: 8 },
  { code: '+49', country: 'Germany (+49)', digits: 10 },
  { code: '+61', country: 'Australia (+61)', digits: 9 },
  { code: '+27', country: 'South Africa (+27)', digits: 9 },
  { code: '+33', country: 'France (+33)', digits: 9 },
  { code: '+81', country: 'Japan (+81)', digits: 10 },
];

export function WhitepaperDownloadModal({
  isOpen,
  onClose,
  whitepaperTitle = 'From Polymer to Pipe: Building a Connected Operating Model for PVC & Plastics Manufacturers',
  slug = 'pvc-manufacturing',
  downloadPath = '/PVC_whitepaper.pdf',
}: WhitepaperDownloadModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    company: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCountryConfig = COUNTRY_CODES.find((c) => c.code === formData.countryCode) || { digits: 10 };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric digits
    const rawValue = e.target.value.replace(/\D/g, '');
    const maxDigits = currentCountryConfig.digits;

    if (rawValue.length <= maxDigits) {
      setFormData((prev) => ({ ...prev, phone: rawValue }));
      if (fieldErrors.phone) {
        setFieldErrors((prev) => ({ ...prev, phone: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter a valid full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid corporate email address.';
    }

    const expectedDigits = currentCountryConfig.digits;
    if (!formData.phone.trim() || formData.phone.length < expectedDigits) {
      errors.phone = `Please enter a valid ${expectedDigits}-digit phone number.`;
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      errors.company = 'Please enter your company or manufacturing plant name.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;

    try {
      const res = await submitWhitepaperDownload({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: fullPhoneNumber,
        company: formData.company.trim(),
        whitepaperTitle,
        slug,
        downloadPath,
      });

      if (res.success) {
        setSubmitted(true);
        // Automatically trigger download of the valid binary PDF
        const link = document.createElement('a');
        link.href = res.downloadUrl || downloadPath;
        link.download = 'Prixgen_PVC_Manufacturing_Operating_Model.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setGeneralError(res.message || 'Please check the entered details and try again.');
      }
    } catch (err) {
      setGeneralError('Unable to process the request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', countryCode: '+91', phone: '', company: '' });
    setFieldErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/60 backdrop-blur-sm">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-lg bg-white border border-slate-200 shadow-2xl rounded-2xl z-10 overflow-hidden text-slate-900 my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
            Prixgen Industrial Research
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {!submitted ? (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                From Polymer to Pipe
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Building a Connected Operating Model for PVC & Plastics Manufacturers
              </p>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Fill in your contact details below to download the complete technical reference architecture and operational framework.
              </p>
            </div>

            {generalError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {generalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-slate-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                  }}
                  placeholder="Your full name"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004B87] placeholder:text-slate-400 transition-colors ${
                    fieldErrors.name ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#004B87]'
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{fieldErrors.name}</p>
                )}
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Work Email <span className="text-slate-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                  }}
                  placeholder="name@company.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004B87] placeholder:text-slate-400 transition-colors ${
                    fieldErrors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#004B87]'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{fieldErrors.email}</p>
                )}
              </div>

              {/* Phone Number with Country Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-slate-400">*</span>
                </label>
                <div className="flex gap-2">
                  {/* Country Code Dropdown */}
                  <select
                    value={formData.countryCode}
                    onChange={(e) => {
                      setFormData({ ...formData, countryCode: e.target.value, phone: '' });
                      if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                    }}
                    className="w-36 px-2.5 py-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#004B87] focus:border-[#004B87] cursor-pointer"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} ({c.country.split(' ')[0]})
                      </option>
                    ))}
                  </select>

                  {/* Phone Input with max length & digit enforcement */}
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder={`${currentCountryConfig.digits} digits`}
                    className={`flex-1 px-3.5 py-2.5 rounded-lg border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004B87] placeholder:text-slate-400 transition-colors ${
                      fieldErrors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#004B87]'
                    }`}
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  {fieldErrors.phone ? (
                    <p className="text-xs text-red-600 font-medium">{fieldErrors.phone}</p>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Country: {COUNTRY_CODES.find((c) => c.code === formData.countryCode)?.country}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formData.phone.length}/{currentCountryConfig.digits}
                  </span>
                </div>
              </div>

              {/* Company / Manufacturing Plant */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Manufacturing Plant <span className="text-slate-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => {
                    setFormData({ ...formData, company: e.target.value });
                    if (fieldErrors.company) setFieldErrors({ ...fieldErrors, company: '' });
                  }}
                  placeholder="e.g. Acme Polymers"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#004B87] placeholder:text-slate-400 transition-colors ${
                    fieldErrors.company ? 'border-red-500 bg-red-50/30' : 'border-slate-300 focus:border-[#004B87]'
                  }`}
                />
                {fieldErrors.company && (
                  <p className="text-xs text-red-600 mt-1 font-medium">{fieldErrors.company}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg bg-[#004B87] hover:bg-[#003866] text-white font-semibold text-sm shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Validating & Downloading...</span>
                    </>
                  ) : (
                    <span>Download Whitepaper (PDF)</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-[#004B87] mx-auto flex items-center justify-center font-bold text-lg border border-slate-200">
              ✓
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Download Started
              </h3>
              <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
                Your copy of <strong className="text-slate-800">From Polymer to Pipe</strong> has started downloading.
              </p>
            </div>

            <div className="pt-2 pb-1">
              <a
                href={downloadPath}
                download="Prixgen_PVC_Manufacturing_Operating_Model.pdf"
                className="text-xs font-semibold text-[#004B87] hover:underline"
              >
                Click here if download didn&apos;t start automatically
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={handleReset}
                className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
