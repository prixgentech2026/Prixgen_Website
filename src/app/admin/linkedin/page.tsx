'use client';

import { useState, useEffect } from 'react';
import { updateLinkedInSettings, getLinkedInSettings } from '@/actions/linkedin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, RefreshCw, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LinkedInAdminPage() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [settings, setSettings] = useState<{ accessToken: string, orgId: string, lastUpdated?: string } | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getLinkedInSettings();
      if (data) setSettings(data);
      setInitialLoading(false);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await updateLinkedInSettings(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'LinkedIn settings updated successfully!' });
      const updated = await getLinkedInSettings();
      setSettings(updated);
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update settings' });
    }
    setLoading(false);
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <RefreshCw className="animate-spin text-prixgen-blue w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 p-12 overflow-hidden relative"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-prixgen-blue/5 rounded-bl-[5rem] -mr-10 -mt-10" />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-prixgen-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Shield size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">LinkedIn Sync Engine</h1>
                <p className="text-slate-500 text-sm font-medium">Automated Enterprise Content Distribution</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 mb-10 flex items-start gap-4">
              <AlertCircle className="text-prixgen-blue shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-900 mb-1">Authorization Notice</p>
                LinkedIn Access Tokens typically expire every 60 days. Ensure you use a <strong>Permanent</strong> or <strong>Long-Lived</strong> token from the <a href="https://www.linkedin.com/developers/" target="_blank" rel="noreferrer" className="text-prixgen-blue underline flex-inline items-center gap-1">LinkedIn Developer Portal <ExternalLink size={12} className="inline" /></a>.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgId" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">LinkedIn Organization ID</Label>
                  <Input 
                    id="orgId" 
                    name="orgId" 
                    defaultValue={settings?.orgId}
                    placeholder="e.g. 12345678" 
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-prixgen-blue transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessToken" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Token</Label>
                  <Input 
                    id="accessToken" 
                    name="accessToken" 
                    type="password"
                    defaultValue={settings?.accessToken}
                    placeholder="Paste your OAuth2 token here..." 
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-prixgen-blue transition-all"
                  />
                </div>
              </div>

              {settings?.lastUpdated && (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Last updated: {new Date(settings.lastUpdated).toLocaleString()}
                </p>
              )}

              {message && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  {message.text}
                </motion.div>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-[1.5rem] bg-prixgen-blue hover:bg-prixgen-lightblue text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-200 transition-all active:scale-[0.98]"
              >
                {loading ? <RefreshCw className="animate-spin mr-2" size={16} /> : null}
                Update Sync Credentials
              </Button>
            </form>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-slate-400 text-xs font-medium">
          Note: This page is for administrative use only. Content is synchronized daily at 00:00 UTC.
        </p>
      </div>
    </div>
  );
}
