import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Coffee, Flower, Users, Check, Mail, AlertCircle } from 'lucide-react';
import { reservationAPI } from '@/lib/api';
import { testConnection } from '@/lib/supabase';

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reservationType: '',
    date: '',
    time: '',
    partySize: '',
    specialRequests: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Test database connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const result = await reservationAPI.testDatabaseConnection();
        if (result.success) {
          setConnectionStatus('connected');
          console.log('Database connection verified');
        } else {
          setConnectionStatus('error');
          console.error('Database connection failed:', result.error);
        }
      } catch (error) {
        setConnectionStatus('error');
        console.error('Connection test failed:', error);
      }
    };

    checkConnection();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Submitting reservation with data:', formData);
      
      // Validare locală
      if (!formData.name.trim()) {
        alert('Te rugăm să introduci numele tău.');
        setIsLoading(false);
        return;
      }
      
      if (!formData.email.trim()) {
        alert('Te rugăm să introduci adresa de email.');
        setIsLoading(false);
        return;
      }
      
      if (!formData.reservationType) {
        alert('Te rugăm să selectezi tipul rezervării.');
        setIsLoading(false);
        return;
      }
      
      if (!formData.date) {
        alert('Te rugăm să selectezi data rezervării.');
        setIsLoading(false);
        return;
      }
      
      if (!formData.time) {
        alert('Te rugăm să selectezi ora rezervării.');
        setIsLoading(false);
        return;
      }

      const result = await reservationAPI.createReservation(formData);
      
      if (result.success) {
        setSubmissionResult(result);
        setIsSubmitted(true);
        console.log('Reservation submitted successfully');
      } else {
        console.error('Reservation submission failed:', result.error);
        alert(`Eroare: ${result.error}`);
      }
    } catch (error) {
      console.error('Unexpected error during submission:', error);
      alert('A apărut o eroare neașteptată. Te rugăm să încerci din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show connection status
  if (connectionStatus === 'checking') {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p>Se verifică conexiunea la baza de date...</p>
        </div>
      </div>
    );
  }

  if (connectionStatus === 'error') {
    return (
      <div className="min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            Problemă de conexiune
          </h1>
          <p className="text-red-700 mb-4">
            Nu ne putem conecta la baza de date momentan. Te rugăm să încerci din nou mai târziu.
          </p>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Încearcă din nou
          </Button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <Check className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-800 mb-4">
              Rezervare trimisă cu succes!
            </h1>
            <p className="text-green-700 mb-4">
              Mulțumim pentru rezervarea ta, <strong>{formData.name}</strong>!
            </p>
            
            {submissionResult?.emailSent ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-blue-700 font-medium">
                  ✅ Rezervarea a fost salvată cu succes
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Echipa noastră te va contacta în următoarele 24 de ore pentru confirmare.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-700">
                  ✅ Cererea de rezervare a fost salvată. În scurt timp veți primi confirmarea pe email.
                </p>
              </div>
            )}
            
            <p className="text-green-700 mb-6">
              {submissionResult?.message || "Echipa noastră te va contacta în următoarele 24 de ore pentru a confirma toate detaliile."}
            </p>
            
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setSubmissionResult(null);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  reservationType: '',
                  date: '',
                  time: '',
                  partySize: '',
                  specialRequests: ''
                });
              }}
              variant="outline"
            >
              Fă o altă rezervare
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Fă o rezervare</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rezervă o masă, comandă flori sau închiriază spațiul nostru pentru evenimentul tău special. Suntem aici să facem experiența ta de neuitat.
          </p>
          
          {/* Connection Status Indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">Conectat la baza de date</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Detalii rezervare</CardTitle>
                <CardDescription>
                  Te rugăm să completezi toate informațiile necesare pentru a ne ajuta să ne pregătim pentru vizita ta.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Nume complet *
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder="Introdu numele tău complet"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Adresa de email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder="email@exemplu.ro"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Număr de telefon
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+40 123 456 789"
                    />
                  </div>

                  {/* Reservation Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Ce dorești să rezervi? *
                    </label>
                    <Select 
                      value={formData.reservationType}
                      onValueChange={(value) => handleInputChange('reservationType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selectează tipul rezervării" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="table">Rezervare masă</SelectItem>
                        <SelectItem value="flowers">Comandă aranjament floral</SelectItem>
                        <SelectItem value="community-event">Pachet evenimente comunitare</SelectItem>
                        <SelectItem value="corporate-event">Pachet team building corporativ</SelectItem>
                        <SelectItem value="photo-session">Sesiune foto instant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Data preferată *
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Ora preferată *
                      </label>
                      <Select 
                        value={formData.time}
                        onValueChange={(value) => handleInputChange('time', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selectează ora" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7:00">07:00</SelectItem>
                          <SelectItem value="8:00">08:00</SelectItem>
                          <SelectItem value="9:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                          <SelectItem value="11:00">11:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="13:00">13:00</SelectItem>
                          <SelectItem value="14:00">14:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="16:00">16:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="19:00">19:00</SelectItem>
                          <SelectItem value="20:00">20:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Party Size (conditional) */}
                  {(formData.reservationType === 'table' || 
                    formData.reservationType === 'community-event' || 
                    formData.reservationType === 'corporate-event') && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Numărul de persoane
                      </label>
                      <Select 
                        value={formData.partySize}
                        onValueChange={(value) => handleInputChange('partySize', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selectează numărul de persoane" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 persoană</SelectItem>
                          <SelectItem value="2">2 persoane</SelectItem>
                          <SelectItem value="3-4">3-4 persoane</SelectItem>
                          <SelectItem value="5-10">5-10 persoane</SelectItem>
                          <SelectItem value="11-20">11-20 persoane</SelectItem>
                          <SelectItem value="21-40">21-40 persoane</SelectItem>
                          <SelectItem value="40+">40+ persoane</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Special Requests */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Cerințe speciale sau observații
                    </label>
                    <Textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="Restricții alimentare, nevoi de accesibilitate sau cerințe speciale..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Se procesează...' : 'Trimite rezervarea'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Reservation Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coffee className="h-5 w-5" />
                  <span>Rezervări mese</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Rezervă o masă pentru a lua masa, a studia sau pentru întâlniri casual.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Fără taxă de rezervare</li>
                  <li>• Limită de 2 ore în orele de vârf</li>
                  <li>• Perfect pentru 1-6 persoane</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Flower className="h-5 w-5" />
                  <span>Rezervări flori</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comandă în avans aranjamente florale personalizate pentru ridicare.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Preaviz de 48 ore preferat</li>
                  <li>• Aranjamente personalizate disponibile</li>
                  <li>• Opțiuni de flori de sezon</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Spațiu evenimente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Închiriază spațiul nostru pentru evenimente private și întâlniri.
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Pachet comunitar: Până la 20 persoane</li>
                  <li>• Pachet corporativ: Până la 40 persoane</li>
                  <li>• Coordonare completă evenimente disponibilă</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informații de contact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Telefon:</strong> +40 264 123 456</p>
                  <p><strong>Email:</strong> salut@cutie.ro</p>
                  <p><strong>Program:</strong></p>
                  <p className="text-xs text-muted-foreground">
                    Lun-Vin: 07:00 - 20:00<br />
                    Sâm-Dum: 08:00 - 21:00
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
