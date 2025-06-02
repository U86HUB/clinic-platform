'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../lib/supabase';
import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const supabase = createClient();

type OnboardingData = {
  clinicName: string;
  subdomain: string;
  logoFile: File | null;
  primaryColor: string;
  templateId: string;
};

export default function OnboardingPage() {
  const session = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    clinicName: '',
    subdomain: '',
    logoFile: null,
    primaryColor: '#0066cc',
    templateId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) router.replace('/auth');
  }, [session, router]);

  const createClinicRecord = async () => {
    setLoading(true);
    setError(null);
    let logoUrl = '';

    if (data.logoFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('logos')
        .upload(`public/${session!.user.id}/logo-${Date.now()}`, data.logoFile);
      if (uploadError) {
        setError(uploadError.message);
        setLoading(false);
        return;
      }
      logoUrl = supabase.storage.from('logos').getPublicUrl(uploadData.path).data.publicUrl!;
    }

    const { error: insertError } = await supabase
      .from('clinics')
      .insert({
        owner_id: session!.user.id,
        name: data.clinicName,
        subdomain: data.subdomain,
        template_id: data.templateId || null,
        settings: { logoUrl, primaryColor: data.primaryColor },
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push('/dashboard');
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      createClinicRecord();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl mb-2">Step 1: Clinic Name</h2>
            <input
              type="text"
              placeholder="Acme Dental"
              value={data.clinicName}
              onChange={(e) => setData({ ...data, clinicName: e.target.value })}
              className="w-full border p-2 mb-4"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl mb-2">Step 2: Subdomain</h2>
            <input
              type="text"
              placeholder="acme-dental"
              value={data.subdomain}
              onChange={(e) => setData({ ...data, subdomain: e.target.value })}
              className="w-full border p-2 mb-4"
            />
            <p>Site will be: <strong>{data.subdomain}.yourplatform.com</strong></p>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl mb-2">Step 3: Upload Logo & Pick Color</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setData({ ...data, logoFile: e.target.files![0] })}
              className="w-full mb-4"
            />
            <label className="block mb-1">Primary Color</label>
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
              className="w-16 h-8 border p-0"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl mb-2">Step 4: Select a Template</h2>
            <div className="border p-4 mb-4 flex items-center">
              <img
                src="https://via.placeholder.com/150x80"
                alt="Template Placeholder"
                className="w-36 h-24 object-cover mr-4"
              />
              <div>
                <h3 className="text-lg">Template Placeholder</h3>
                <button
                  onClick={() => setData({ ...data, templateId: '15309646-6c2e-4f30-96eb-ac1c4ed61100' })}
                  className={`mt-2 px-3 py-1 ${
                    data.templateId === '15309646-6c2e-4f30-96eb-ac1c4ed61100' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {data.templateId === '15309646-6c2e-4f30-96eb-ac1c4ed61100' ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded">
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {renderStep()}
      <button
        onClick={handleNext}
        disabled={loading || (step === 4 && !data.templateId)}
        className="mt-4 w-full bg-green-600 text-white p-2"
      >
        {loading ? 'Processing…' : step < 4 ? 'Next' : 'Create Site'}
      </button>
    </div>
  );
}
