import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ExternalLink, CheckCircle } from 'lucide-react';

const EmailSetupGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-6 w-6 text-blue-600" />
            <span>Configurare Sistem Email</span>
          </CardTitle>
          <CardDescription>
            Pentru a activa trimiterea automată de email-uri de confirmare, urmează acești pași:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Option 1: EmailJS */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-green-700">
              Opțiunea 1: EmailJS (Recomandat - Gratuit)
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Creează cont pe EmailJS</p>
                  <p className="text-sm text-muted-foreground">
                    Mergi pe <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">emailjs.com</a> și creează un cont gratuit
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Configurează serviciul de email</p>
                  <p className="text-sm text-muted-foreground">
                    Conectează-ți contul Gmail sau alt provider de email
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Creează template-uri</p>
                  <p className="text-sm text-muted-foreground">
                    Configurează template-urile pentru confirmări rezervări și evenimente
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Actualizează configurația</p>
                  <p className="text-sm text-muted-foreground">
                    Înlocuiește valorile din <code>src/lib/emailService.js</code> cu ID-urile tale
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Option 2: Resend */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 text-blue-700">
              Opțiunea 2: Resend (Profesional)
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Creează cont pe Resend</p>
                  <p className="text-sm text-muted-foreground">
                    Mergi pe <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">resend.com</a> și creează un cont
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Obține API Key</p>
                  <p className="text-sm text-muted-foreground">
                    Generează o cheie API din dashboard
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Configurează domeniul</p>
                  <p className="text-sm text-muted-foreground">
                    Adaugă și verifică domeniul tău pentru trimiterea email-urilor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-yellow-800">
              Status Actual
            </h3>
            <p className="text-yellow-700 text-sm">
              Momentan, sistemul simulează trimiterea email-urilor și afișează conținutul în consolă. 
              Pentru a activa trimiterea reală, urmează unul dintre pașii de mai sus.
            </p>
          </div>

          {/* Code Example */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Exemplu Configurare EmailJS</h3>
            <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
{`// În src/lib/emailService.js
export const emailConfig = {
  emailjs: {
    serviceId: 'service_xxxxxxx',    // ID-ul serviciului tău
    templateId: 'template_xxxxxxx',  // ID-ul template-ului
    publicKey: 'xxxxxxxxxxxxxxxx'   // Cheia ta publică
  }
};`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSetupGuide;
