import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Users, Calendar, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const instantPhotoService = {
    title: "Serviciu foto instant",
    description: "Surprinde momentele tale speciale cu serviciul nostru profesional de fotografie instant. Perfect pentru evenimente, întâlniri sau pur și simplu pentru amintiri!",
    price: "60 RON per sesiune",
    features: [
      "Echipament profesional pentru fotografie instant",
      "Accesorii tematice disponibile",
      "Multiple fotografii per sesiune",
      "Perfect pentru rețelele sociale",
      "Ideal pentru ocazii speciale"
    ],
    exampleImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop"
  };

  const eventPackages = [
    {
      title: "Pachet evenimente comunitare",
      description: "Perfect pentru întâlniri mici, workshop-uri și celebrări intime",
      price: "600 RON pentru 4 ore",
      capacity: "Până la 20 persoane",
      features: [
        "Folosirea privată a zonei principale de locuri",
        "Serviciu de cafea și ceai inclus",
        "Echipament AV de bază disponibil",
        "Centru de masă cu flori inclus",
        "Suport pentru coordonarea evenimentului",
        "Aranjamente flexibile de setup"
      ],
      ideal: "Petreceri de ziua de naștere, cluburi de lectură, workshop-uri mici, întâlniri de echipă"
    },
    {
      title: "Pachet team building corporativ",
      description: "Pachet complet pentru team building și evenimente corporative",
      price: "1200 RON pentru 6 ore",
      capacity: "Până la 40 persoane",
      features: [
        "Închirierea completă a spațiului cafenelei",
        "Catering cu cafea, ceai și patiserie",
        "Setup AV complet cu proiector",
        "Coordonarea activităților de team building",
        "Fotografie profesională pentru eveniment",
        "Aranjamente florale personalizate",
        "Manager dedicat pentru eveniment",
        "Opțiuni flexibile de catering"
      ],
      ideal: "Retrageri corporative, team building, sesiuni de training, celebrări de companie"
    }
  ];

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

        {/* Instant Photo Service */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Camera className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">{instantPhotoService.title}</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {instantPhotoService.description}
              </p>
              <div className="bg-primary/10 rounded-lg p-6 mb-6">
                <div className="text-2xl font-bold text-primary mb-2">
                  {instantPhotoService.price}
                </div>
                <p className="text-sm text-muted-foreground">
                  Include echipament profesional și accesorii
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                {instantPhotoService.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg">
                <Link to="/reservations">Rezervă sesiune foto</Link>
              </Button>
            </div>
            <div className="order-first lg:order-last">
              <img 
                src={instantPhotoService.exampleImage}
                alt="Exemplu serviciu foto instant"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Event Packages */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Închiriere spațiu evenimente</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transformă cafeneaua noastră în spațiul perfect pentru evenimentul tău. Oferim două pachete complete concepute pentru diferite dimensiuni de grup și nevoi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {eventPackages.map((pkg, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{pkg.title}</CardTitle>
                      <CardDescription className="text-sm mb-4">
                        {pkg.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                    <div className="text-sm text-muted-foreground">{pkg.capacity}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Star className="h-4 w-4 text-primary mr-2" />
                        Ce este inclus:
                      </h4>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <Check className="h-3 w-3 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Perfect pentru:</h4>
                      <p className="text-sm text-muted-foreground">{pkg.ideal}</p>
                    </div>
                    <Button className="w-full" asChild>
                      <Link to="/reservations">Rezervă acest pachet</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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
