import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Users, Calendar, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase.from('services').select('*');
      if (error) {
        console.error('❌ Failed to fetch services:', error);
      } else {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const categorized = {
    photo: services.filter(s => s.type === 'photo'),
    eventSpace: services.filter(s => s.type === 'event-space'),
    teamBuilding: services.filter(s => s.type === 'team-building')
  };

  const renderServiceCard = (service) => (
    <Card key={service.id} className="h-full">
      <CardHeader>
        <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
        <CardDescription className="mb-2">{service.description}</CardDescription>
        <div className="bg-primary/10 rounded-lg p-4">
          <div className="text-2xl font-bold text-primary">{service.price} RON</div>
        </div>
      </CardHeader>
      <CardContent>
        <Button className="w-full" asChild>
          <Link to="/reservations">Rezervă</Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Serviciile noastre</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dincolo de cafea și flori, oferim servicii unice pentru a face momentele tale speciale și mai memorabile.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Se încarcă serviciile...</p>
        ) : (
          <>
            {/* Photo Session */}
            {categorized.photo.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center space-x-3 mb-6">
                  <Camera className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">Serviciu foto instant</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {categorized.photo.map(renderServiceCard)}
                </div>
              </section>
            )}

            {/* Event Rentals */}
            {categorized.eventSpace.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">Evenimente și spațiu</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {categorized.eventSpace.map(renderServiceCard)}
                </div>
              </section>
            )}

            {/* Team Building */}
            {categorized.teamBuilding.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center space-x-3 mb-6">
                  <Star className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold">Team Building</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {categorized.teamBuilding.map(renderServiceCard)}
                </div>
              </section>
            )}
          </>
        )}

        {/* Additional Services */}
        <section className="bg-muted/30 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Servicii suplimentare</h3>
            <p className="text-muted-foreground">
              Putem personaliza serviciile noastre pentru a răspunde nevoilor tale specifice
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Planificare evenimente</h4>
              <p className="text-sm text-muted-foreground">
                Servicii complete de coordonare și planificare evenimente disponibile
              </p>
            </div>
            <div className="text-center">
              <Camera className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Fotografie</h4>
              <p className="text-sm text-muted-foreground">
                Fotografie profesională pentru evenimente pentru a surprinde momentele tale speciale
              </p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Catering personalizat</h4>
              <p className="text-sm text-muted-foreground">
                Opțiuni personalizate de mâncare și băuturi pentru evenimentul tău specific
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contactează-ne pentru oferte personalizate</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
